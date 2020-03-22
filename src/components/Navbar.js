import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "./Navbar.css";

const Navbar = ({ user }) => {
    
    return (
        <div className={"navbarContainer"}>
            <img className={"logo"} src={Logo} alt={"Logo"} />
            <ul className={"navbarLinks"}>
                <li><Link className="navbarLink">Leaderboard</Link></li>
                {Object.keys(user).length ? <li>Logout</li> : null}
                <li>Contact</li>
            </ul>
        </div>
    )
};

export default Navbar;