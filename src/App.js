import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";

class App extends React.Component {
    state = {
        isLoading: false,
    } 

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch> 
    
                        <Route path="/" component={Login} />
                        
                        {/* <Route path="/board" component={Board} /> */}
                    
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
