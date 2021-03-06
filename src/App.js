import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { getUser, getToken } from "./util/tokenHelper";
import { getWodsAndResults, getLeaderboard } from "./util/wodsAndResultsHelper";
import io from "socket.io-client";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Board from "./components/Board/Board";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import VideoModal from "./components/VideoModal/VideoModal";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Loading from "./components/Loading/Loading";
import Error404 from "./components/Error404/Error404";
import { TOMORROW, YESTERDAY, ADD } from "./constants/constants";
import dotenv from "dotenv";
dotenv.config();

class App extends React.Component {
    state = {
        leaderboard: [],
        user: {},
        token: "",
        wods: [],
        currentIndex: 0,
        socket: {},
        isModalVisible: false,
        isDescriptionVisible: true,        
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // add event listeneres to socket (if a new result has been submitted or edited)
                const socket = io(process.env.REACT_APP_API_URL);
                socket.on("add to results", payload => this.updateResultsAndLeaderboardInState(payload));
                socket.on("edit results", payload => this.updateResultsAndLeaderboardInState(payload));
                // get leaderboard, user, token and workouts
                const [{ leaderboard }, { user, token }, { wods }] = await Promise.all([getLeaderboard(), getUser(storedToken), getWodsAndResults(storedToken)]);
                if (wods.length) {
                    return this.setState({ leaderboard, user, token, wods, socket, isLoading: false });
                }
            } 
            const { leaderboard } = await getLeaderboard();
            this.setState({ leaderboard, isLoading: false });
        });
    }

    updateResultsAndLeaderboardInState = ({ wodId, results, leaderboard }) => {
        this.setState((prevState) => {
            const updatedWods = prevState.wods.map(wod => {
                if (wod.id === wodId) {
                    return { ...wod, results }
                    
                }
                return wod;
            });

            return { ...prevState, leaderboard, wods: updatedWods, isLoading: false };
        });
    };

    handleResponseFacebook = (response) => {
        this.setState({ isLoading: true }, async () => {
            const { accessToken, id, name } = response;
            const { user, token, error } = await getToken(accessToken, id, name);
            if (!error) {
                localStorage.setItem("token", token);
                // get workouts
                const { wods } = await getWodsAndResults(token);
                // add event listeneres to socket (if a new result is submitted or edited)
                const socket = io(process.env.REACT_APP_API_URL);
                socket.on("add to results", payload => this.updateResultsAndLeaderboardInState(payload));
                socket.on("edit results", payload => this.updateResultsAndLeaderboardInState(payload));
                if (wods.length) {
                    return this.setState({ user, token, wods, socket, isLoading: false }, 
                        () => this.props.history.push("/"));
                } 
            } 
            this.setState({ isLoading: false });
        });
    };

    handleLogout = () => {
        this.setState({ isLoading: true }, () => {
            localStorage.removeItem("token");
            this.setState({
                user: {},
                token: "",
                wods: [],
                currentIndex: 0,
                socket: {},
                isModalVisible: false,
                isLoading: false,
            }, () => this.props.history.push("/"));
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

    handleResultSubmit = (wodId, result, method) => {
        const { user, socket } = this.state;
        const event = method === ADD ? "add result" : "edit result";
        this.setState({ isLoading: true }, () => socket.emit(event, { result, wod_id: wodId, user_id: user.id }));
    };

    handleModalVisibility = bool => this.setState({ isModalVisible: bool });
    
    handleDescriptionVisibility = bool => this.setState({ isDescriptionVisible: bool });

    render() {
        const { 
            leaderboard, 
            user, 
            wods, 
            currentIndex, 
            isModalVisible, 
            isKeyboardVisible, 
            isDescriptionVisible, 
            isLoading 
        } = this.state;

        return (
            <div className="App fadeIn">
                
                <Navbar user={user} onLogout={this.handleLogout} />
               
                {isLoading ? (
                        <Loading />
                    ) : (
                        <Switch> 

                            <Redirect exact from="/" to="/board" />

                            <Route exact path="/login" 
                                render={() => <Login user={user} onResponseFacebook={this.handleResponseFacebook}/> } />
                            
                            <Route exact 
                                path="/board" 
                                render={() => <Board 
                                    user={user} 
                                    wods={wods} 
                                    currentIndex={currentIndex} 
                                    onDateChange={this.handleDateChange}
                                    onResultSubmit={this.handleResultSubmit} 
                                    setModalVisibility={this.handleModalVisibility}
                                    isKeyboardVisible={isKeyboardVisible} 
                                    setDescriptionVisibility={this.handleDescriptionVisibility}
                                    isDescriptionVisible={isDescriptionVisible} />
                                } />
                            
                            <Route exact 
                                path="/leaderboard" 
                                render={() => <Leaderboard userId={user.id} leaderboard={leaderboard} />}
                                />

                            <Route exact path="/privacy-policy" component={PrivacyPolicy} />

                            <Route component={Error404} />
                        
                        </Switch>
                    )
                }

                <Footer />

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