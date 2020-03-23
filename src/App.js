import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { getUser, getToken } from "./util/tokenHelper";
import { getWodsAndResults } from "./util/wodsAndResultsHelper";
import io from "socket.io-client";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Board from "./components/Board/Board";
import VideoModal from "./components/VideoModal/VideoModal";
import { TOMORROW, YESTERDAY, ADD } from "./constants/constants";
import dotenv from "dotenv";
dotenv.config();

class App extends React.Component {
    state = {
        user: {},
        token: "",
        wods: [],
        currentIndex: 0,
        socket: {},
        isModalVisible: false,
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // add event listeneres to socket (if a new result has been submitted or edited)
                const socket = io(process.env.REACT_APP_API_URL);
                socket.on("add to results", payload => this.addResultToState(payload));
                socket.on("edit results", payload => this.updateResultInState(payload));
                // get user, token and workouts
                const [{ user, token }, { wods }] = await Promise.all([getUser(storedToken), getWodsAndResults(storedToken)]);
                this.setState({ user, token, wods, socket, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

    addResultToState = ({ wodId, result }) => {
        this.setState((prevState) => {
            const updatedWods = prevState.wods.map(wod => {
                if (wod.id === wodId) {
                    const updatedResults = [...wod.results, result];
                    return { ...wod, results: updatedResults };
                }
                return wod;
            });

            return { ...prevState, wods: updatedWods };
        });        
    };

    updateResultInState = ({ wodId, userId, result}) => {
        this.setState((prevState) => {
            const updatedWods = prevState.wods.map(wod => {
                if (wod.id === wodId) {
                    const updatedResults = wod.results.map(element => {
                        if (element.user_id === userId) return result;
                        return element;
                    })
                    return { ...wod, results: updatedResults }
                }
                return wod;
            });

            return { ...prevState, wods: updatedWods };
        });
    };

    handleResponseFacebook = (response) => {
        this.setState({ isLoading: true }, async () => {
            const { accessToken, id, name } = response;
            const { user, token, error } = await getToken(accessToken, id, name);
            localStorage.setItem("token", token);
            // get workouts
            const { wods } = await getWodsAndResults(token);
            this.setState({ user, token, wods, isLoading: false }, 
                () => this.props.history.push("/"));
        });
    };

    handleDateChange = (day) => {
        this.setState({ isLoading: true }, () => {
            if (day === TOMORROW) {
                this.setState((prevState) => ({ ...prevState, currentIndex: prevState.currentIndex - 1, isLoading: false }));    
            } else if (day === YESTERDAY) {
                this.setState((prevState) => ({ ...prevState, currentIndex: prevState.currentIndex + 1, isLoading: false }));    
            }
        })
    };

    handleResultSubmit = async (wodId, result, method) => {
        const { user, socket } = this.state;
        const event = method === ADD ? "add result" : "edit result";
        socket.emit(event, { result, wod_id: wodId, user_id: user.id });
    };

    handleModalVisibility = bool => this.setState({ isModalVisible: bool });
    
    render() {
        const { user, wods, currentIndex, isModalVisible, isLoading } = this.state;
        console.log(wods);
        return (
            <div>
                
                <Navbar user={user}/>
               
                {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Switch> 

                            <Redirect exact from="/" to="/board" />

                            <Route exact path="/login" render={() => <Login onResponseFacebook={this.handleResponseFacebook}/> } />
                            
                            <Route path="/board" 
                                render={() => <Board 
                                    user={user} 
                                    wods={wods} 
                                    currentIndex={currentIndex} 
                                    onDateChange={this.handleDateChange}
                                    onResultSubmit={this.handleResultSubmit} 
                                    setModalVisibility={this.handleModalVisibility} />
                                } />
                        
                        </Switch>
                    )
                }

                {isModalVisible && (
                    <VideoModal
                        isModalVisible={isModalVisible}
                        setModalVisibility={this.handleModalVisibility}
                        videoUrl={wods[currentIndex].video_url}
                    />
                )}

            </div>
        );
    }
};

export default withRouter(App);
