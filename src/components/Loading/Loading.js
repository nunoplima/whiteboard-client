import React from "react";
import spinner from "../../assets/images/spinner.svg";
import "./Loading.css";

const Loading = () => (
    <div className="spinnerCointainer">
        <h1>Loading...</h1>
        <img id="spinner" src={spinner} alt="Loading spinner"></img>
    </div>
);

export default Loading;
