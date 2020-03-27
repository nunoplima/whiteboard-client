import React, { useState } from "react";
import { ADD, EDIT } from "../../constants/constants";
import "./ResultForm.css";

const ResultForm = ({ userId, results, wodId, onResultSubmit }) => {
    const [result, setResult] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const method = userResult() ? EDIT : ADD;
        onResultSubmit(wodId, result, method);
        setResult("");
    };

    const handleOnChange = (e) => {
        setResult(e.target.value);
    };

    const userResult = () => (
        results.find(result => result.user_id === userId)
    );

    // https://stackoverflow.com/a/9039885/3973320
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const handleFocus = () => {
        if (!iOS) {
            window.scrollTo(0, document.body.scrollHeight); 
        }
    };
    
    const handleBlur = () => {
        if (!iOS) {
            window.scrollTo(0, 0); 
        }
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <input className="result"
                autoFocus
                onFocus={handleFocus} 
                onBlur={handleBlur} 
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

export default ResultForm;