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

const submitResult = async (token, result) => {

};

export { getWodsAndResults, submitResult }