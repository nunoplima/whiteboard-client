import React, { useState } from "react";

const Button = ({ userId, results, wodId, onResultSubmit }) => {
    const [result, setResult] = useState("");
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onResultSubmit(wodId, result);
    };

    const handleOnChange = (e) => {
        setResult(e.target.value);
    };

    const userResult = () => (
        results.find(result => result.user_id === userId)
    );
    
    return (
        <form onSubmit={handleOnSubmit}>
            <input onChange={handleOnChange} 
                type="number"
                step={"any"}
                min="1"
                value={result} 
                placeholder={"Sumit your result"}>
            </input>
            <input type="submit" value={userResult() ? "EDIT" : "SUBMIT"}></input>
        </form>
    )
};

export default Button;