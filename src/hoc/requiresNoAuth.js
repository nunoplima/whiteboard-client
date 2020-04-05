import React from "react";
import { withRouter } from "react-router-dom";


const requiresNoAuth = (ComposedComponent) => (
    // withRouter so the component can access history object
    withRouter((props) => {       
        if (Object.keys(props.user).length) {
            props.history.push("/board");
            // something has to be returned, otherwise ComposedComponent will be returned albeit the history push
            return null;
        } else {
            return <ComposedComponent {...props} />
        }
    })
);

export default requiresNoAuth;
