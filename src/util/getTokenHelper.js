import dotenv from "dotenv";
dotenv.config();

const getToken = async (accessToken, id, name) => {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id, 
            name,
        })
    };
    const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/facebook?accesstoken=${accessToken}`, options);
    const response = await rawResponse.json();
    console.log(response);
};

export { getToken };