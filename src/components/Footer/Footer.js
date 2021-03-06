import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footerContainer">
            <p> 
                Made with 
                <span>
                    <FontAwesomeIcon icon={faHeart} className="heartIcn"/>
                </span>
                in Lisbon
                <span className="hashtags">
                    #staysafe #stayhome | <Link id="privacyPolicyLink" to="/privacy-policy">Privacy Policy</Link>
                </span>
                |
                <span>
                    <a href="https://www.instagram.com/boxdin.pt" className="socialIcnContainer" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} id="instaIcn" className="socialIcn" />
                    </a>
                    <a href="https://www.facebook.com/BoxdIn-115214513462537" className="socialIcnContainer" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} id="facebookIcn" className="socialIcn"/>
                    </a>
                </span>
            </p>
        </div>
    )
};

export default Footer;