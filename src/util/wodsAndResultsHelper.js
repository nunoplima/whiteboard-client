import dotenv from "dotenv";
dotenv.config();

const getWodsAndResults = async (token) => {
    try {
        const options = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/wods`, options);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);
    }
};

const getLeaderboard = async () => {
    try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/leaderboard`);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);
    }
}

export { getWodsAndResults, getLeaderboard };