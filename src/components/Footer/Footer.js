import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footerContainer font-awesome-icons-div">
            <p> Made with 
                <span>
                    <FontAwesomeIcon icon={faHeart} className="heartIcn"/>
                </span>
                in Lisbon
                <span className="hashtags">
                    #staysafe #stayhome
                </span>
            </p>
        </div>
    )
};

export default Footer;