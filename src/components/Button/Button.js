import React, { useState } from "react";
import { ADD, EDIT } from "../../constants/constants";
import "./Button.css";

const Button = ({ userId, results, wodId, onResultSubmit }) => {
    const [result, setResult] = useState("");
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const method = userResult() ? EDIT : ADD;
        onResultSubmit(wodId, result, method);
    };

    const handleOnChange = (e) => {
        setResult(e.target.value);
    };

    const userResult = () => (
        results.find(result => result.user_id === userId)
    );
    
    return (
        <form onSubmit={handleOnSubmit}>
            <input className="result"
                autoFocus
                onChange={handleOnChange} 
                type="number"
                step={"any"}
                min="1"
                value={result} 
                placeholder={userResult() ? "Edit your result" : "Sumit your result"}>
            </input>
            <input className="submit" type="submit" value={userResult() ? EDIT : ADD}></input>
        </form>
    )
};

export default Button;