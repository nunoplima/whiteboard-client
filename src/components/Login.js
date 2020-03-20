import React from "react";
import FacebookLogin from "react-facebook-login";
import dotenv from "dotenv";
dotenv.config();

const Login = ({ onResponseFacebook }) => {
    const handleFacebookLogin = () => {
        console.log("Facebook button clicked");
    };

    return (
        <>
            <FacebookLogin
                appId={process.env.REACT_APP_FB_ID}
                autoLoad={true}
                fields="name"
                onClick={handleFacebookLogin}
                callback={onResponseFacebook}
            />
        </>
    );
};

export default Login;
