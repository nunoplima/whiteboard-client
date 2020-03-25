import React from "react";
import { withRouter } from "react-router-dom";


const requireAuth = (ComposedComponent) => (
    // withRouter so the component can access history object
    withRouter((props) => {       
        if (!Object.keys(props.user).length) {
            props.history.push("/login");
            // something has to be returned, otherwise ComposedComponent will be returned albeit the history push
            return null
        }

        return <ComposedComponent {...props} />
    })
);

export default requireAuth;
