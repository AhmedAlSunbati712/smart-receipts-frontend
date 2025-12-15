import axios from "axios";
import { SERVER_URL } from "../utils/constants";

export const getPresignedUrl = async (data: {
    fileName: string,
    contentType: string,
}) => {
    try {
        const auth_token = "auth_token"; // should replace this with the auth token after logging in. need
                                        // to figure out where im storing that token after logging in and then 
                                        // retrieving it here
        const response = await axios.post(`${SERVER_URL}/image/presigned`, 
            data,
            {
                headers: {
                    "Authorization" : `Bearer ${auth_token}`,
                },
            }
        );
        const {uploadUrl, key} = response.data;
        return {uploadUrl, key};
    } catch (error) {
        console.error(error);
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
        const auth_token = "auth_token"; // should replace this with the auth token after logging in. need
        // to figure out where im storing that token after logging in and then 
        // retrieving it here
        const response = await axios.post(`${SERVER_URL}/image/signed`,
            { key },
            {
                headers: {
                    "Authorization": `Bearer ${auth_token}`,
                }
            }
        );
        const {signedUrl} = response.data;
        return signedUrl;

    } catch (error) {
        console.error(error);
    }
}