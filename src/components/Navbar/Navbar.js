import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-white.png";
import "./Navbar.css";

const Navbar = ({ user, onLogout, history }) => {
    
    const isActive = (path) => history.location.pathname === path ? "isActive" : null;
    
    return (
        <div className="navbarContainer">
            <img className={"logo"} src={Logo} alt={"Logo"} onClick={() => history.push("/")} />
            <ul className="navbarLinks">
                <li>
                    <Link className={`navbarLink ${isActive("/leaderboard")}`} to="/leaderboard">
                        Leaderboard
                    </Link>
                </li>
                
                {Object.keys(user).length ? 
                    <li><Link className={`navbarLink ${isActive("/board")}`} to="/board">Wods</Link></li> 
                    : null}

                {Object.keys(user).length ? 
                    <li onClick={() => onLogout()}>Logout</li> 
                    : null}

                {!Object.keys(user).length ? (
                    <li className={`navbarLink ${isActive("/login")} ${isActive("/")}`} 
                        onClick={() => history.push("/login")}>
                            Login
                    </li> 
                    ) : null}
            </ul>
        </div>
    )
};

export default withRouter(Navbar);