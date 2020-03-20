import dotenv from "dotenv";
dotenv.config();

const getUser = async (token) => {
    try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/facebook?token=${token}`);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);
    }
}

const getToken = async (accessToken, facebook_id, username) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                facebook_id, 
                username,
            })
        };
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/facebook?accesstoken=${accessToken}`, options);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);        
    }
};

export { getUser, getToken };