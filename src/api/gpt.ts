import axios from "axios";
import { SERVER_URL } from "@/utils/constants";

export const extractInfo = async (rawText: string) => {
    try {
        const response = await axios.post(`${SERVER_URL}/gpt/extract`, {rawText});
        const receipt = response.data;
        console.log(receipt);
        const [y, m, d] = receipt.date.split("-");
        console.log(y, m, d);
        receipt.date = new Date(y, m - 1, d);
        return receipt;
    } catch (error) {
        console.error(error);
        throw error;
    }
}