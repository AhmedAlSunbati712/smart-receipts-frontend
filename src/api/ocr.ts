import axios from "axios";
import { SERVER_URL } from "@/utils/constants";


export const processReceipt = async (data: {imageUrl: string}) => {
    try {
        const response = await axios.post(`${SERVER_URL}/gpt/extract`, data);
        const response_data = response.data; // takes form {status: "success", jobId}
        return response_data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}