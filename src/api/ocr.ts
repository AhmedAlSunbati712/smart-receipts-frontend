import axios from "axios";
import { SERVER_URL } from "@/utils/constants";


export const processReceipt = async (data: {imageUrl: string}) => {
    try {
        const response = await axios.post(`${SERVER_URL}/ocr`, data);
        const response_data = response.data; // takes form {status: "success", jobId}
        return response_data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getJobStatus = async (jobId: string) => {
    try {
        console.log(`${SERVER_URL}/ocr/${jobId}/status`);
        const response = await axios.get(`${SERVER_URL}/ocr/${jobId}/status`);
        console.log(response);
        const response_data = response.data;
        return response_data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getJobResult = async (jobId: string) => {
    try {
        const response = await axios.get(`${SERVER_URL}/ocr/${jobId}/result`);
        const response_data = response.data;
        return response_data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
