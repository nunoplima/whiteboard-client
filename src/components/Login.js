import React from "react";
import FacebookLogin from "react-facebook-login";
import dotenv from "dotenv";
import { getToken } from "../util/getTokenHelper";
dotenv.config();

const Login = () => {
    const handleFacebookLogin = () => {

    };

    const responseFacebook = async (response) => {
        const { accessToken, id, name } = response;
        console.log(accessToken, id, name);
        const { user, token } = getToken(accessToken, id, name);
    };

    return (
        <>
            <FacebookLogin
                appId={process.env.REACT_APP_FB_ID}
                autoLoad={true}
                fields="name"
                onClick={handleFacebookLogin}
                callback={responseFacebook}
            />
        </>
    );
};

export default Login;
