import React from "react";
import { ADD, EDIT } from "../../constants/constants";

const DoneForm = ({ userId, results, wodId, onResultSubmit }) => {
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const method = isWodDone("method") ? EDIT : ADD;
        const result = isWodDone("result") ? 0 : 1;
        onResultSubmit(wodId, result, method);
    };

    const isWodDone = (str) => {
        const result = (results.find(result => result.user_id === userId) || []).result;
        if ((str === "method" && result >= 0) || (str = "result" && result > 0) ) {
            return true;
        } 
        return false;
    };
    
    return (
        <form onSubmit={handleOnSubmit}>
            <input className="submit" type="submit" value={isWodDone() ? "NOT DONE" : "DONE"}></input>
        </form>
    )
};

export default DoneForm;