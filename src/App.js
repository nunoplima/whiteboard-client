import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { getUser, getToken } from "./util/tokenHelper";
import { getWodsAndResults, submitResult } from "./util/wodsAndResultsHelper";
import Login from "./components/Login";
import Board from "./components/Board";
import { TOMORROW, YESTERDAY } from "./constants/constants";


class App extends React.Component {
    state = {
        user: {},
        token: "",
        wods: [],
        currentIndex: 0,
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // get workouts
                const [{ user, token }, { wods }] = await Promise.all([getUser(storedToken), getWodsAndResults(storedToken)]);
                this.setState({ user, token, wods, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

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

    handleResultSubmit = async (result) => {
        console.log(result);
        const { token } = this.state;
        await submitResult(result, token);
    };

    render() {
        const { user, wods, currentIndex, isLoading } = this.state;
        console.log(user);
        return (
            <div className="App container">
               
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
                                    onResultSubmit={this.handleResultSubmit} />
                                } />
                        
                        </Switch>
                    )
                }

            </div>
        );
    }
};

export default withRouter(App);
