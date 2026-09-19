
import axios from 'axios';



const API_BASE_URL = "http://localhost:8080/api/ai";

export const analyzeMessage = async(message) => {
    const response = await axios.post(`${API_BASE_URL}/analyze`, 
        {message,});

        return response.data;
}


