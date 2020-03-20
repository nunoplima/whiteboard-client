import React from "react";
import requireAuth from "../hoc/requiresAuth";

const Board = (props) => {
    return (
        <h1>private route {props.user.username}</h1>
    )
};

export default requireAuth(Board);