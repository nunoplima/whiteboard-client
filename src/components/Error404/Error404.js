import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
    return (
        <div className="errorContainer">
            <h1>404</h1>
            <h2>Sorry, page not found :(</h2>
            <Link id="goBackLink" to="/board">Go back</Link>
        </div>
    );
};

export default Error404;
