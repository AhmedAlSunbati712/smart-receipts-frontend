import axios from "axios";
import { SERVER_URL } from "@/utils/constants";


export const extractInfo = async (rawText: string) => {
    try {
        const response = await axios.post(`${SERVER_URL}/gpt/extract`, {rawText});
        const receipt = response.data;
        return receipt;
    } catch (error) {
        console.error(error);
        throw error;
    }
}