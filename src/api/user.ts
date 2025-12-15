import type { UserSignUp, UserLogIn } from "../types/user";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

export const signup = async (data: UserSignUp) => {
    try {
        const res = await axios.post(`${SERVER_URL}/user/signup`, {...data});
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const login = async (data: UserLogIn) => {
    try {
        const res = await axios.post(`${SERVER_URL}/user/login`, {...data});
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


