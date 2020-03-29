import React from "react";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import dotenv from "dotenv";
dotenv.config();

const Login = ({ onResponseFacebook }) => {
  
    return (
        <div id="loginContainer" className="tableContainer">

            <div className="loginTextDiv">
                <h1>
                    Your coaches, shared whiteboard, minimal equipment, your home.
                </h1>

                <hr />

                <div className="loginSubTitle">
                    <p>Wods</p>
                    <p>Videos</p>
                    <p>Tips</p>
                </div>
            </div>

            <FacebookLogin
                appId={process.env.REACT_APP_FB_ID}
                // autoLoad
                fields="name"
                callback={onResponseFacebook}
                cssClass="loginBtn loginBtn-facebook"
                isMobile={false}
                // disableMobileRedirect={true}
            />
        </div>
    );
};

export default Login;
