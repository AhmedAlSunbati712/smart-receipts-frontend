import axios from "axios";
import { SERVER_URL } from "../utils/constants";

export const getPresignedUrl = async (data: {
    fileName: string,
    contentType: string,
}) => {
    try {
        const response = await axios.post(`${SERVER_URL}/image/presigned`, data);
        const {uploadUrl, key} = response.data;
        return {uploadUrl, key};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const uploadToS3 = async (uploadUrl: string, file: File, contentType: string) => {
    try {
        await axios.put(uploadUrl, file, {
            headers: {
                "Content-Type": contentType,
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const getViewUrl = async (key: string) => {
    try {
        const response = await axios.post(`${SERVER_URL}/image/signed`,{ key });
        const {signedUrl} = response.data;
        return signedUrl;

    } catch (error) {
        console.error(error);
    }
}