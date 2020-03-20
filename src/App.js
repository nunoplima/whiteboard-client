import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { getUser, getToken } from "./util/getTokenHelper";
import Login from "./components/Login";
import Board from "./components/Board";
import requireAuth from "./hoc/requiresAuth";

class App extends React.Component {
    state = {
        user: {},
        token: "",
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            const token = localStorage.getItem("token");
            if (token) {
                getUser(token)
                    .then(response => this.setState({ ...response, isLoading: false }));
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
            this.setState({ user, token, isLoading: false }, 
                () => this.props.history.replace("/"));
        });
    };

    render() {
        const { user, isLoading } = this.state;

        return (
            <div className="App">
               
                {isLoading ? (
                        <h1>Loading Component...</h1>
                    ) : (
                        <Switch> 

                            <Redirect exact from="/" to="/board" />

                            <Route exact path="/login" render={() => <Login onResponseFacebook={this.handleResponseFacebook}/> } />
                            
                            <Route path="/board" render={() => <Board user={user} />} />
                        
                        </Switch>
                    )
                }

            </div>
        );
    }
};

export default withRouter(App);
