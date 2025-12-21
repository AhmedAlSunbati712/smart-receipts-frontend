import { SERVER_URL } from "@/utils/constants";
import { RECEIPT_KEY } from "./receipt";
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";
const ANALYTICS_KEY = "analytics";

export const getSpendingOverTime = () => {
    return (useQuery({
        queryKey: [RECEIPT_KEY, ANALYTICS_KEY, "TIME"],
        queryFn: async () => {
            try {
                const spendingOverTime = await axios.get(`${SERVER_URL}/analytics/spending`);
                return spendingOverTime.data;
            } catch(error) {
                console.error(error);
            }
        }   
    }));
}

export const getSpendingByVendor = () => {
    return (useQuery({
        queryKey: [RECEIPT_KEY, ANALYTICS_KEY, "VENDOR"],
        queryFn: async () => {
            try {
                const spendingByVendor = await axios.get(`${SERVER_URL}/analytics/vendor`);
                return spendingByVendor.data;
            } catch(error) {
                console.error(error);
            }
        }   
    }));
}

export const getSpendingByCategory = () => {
    return (useQuery({
        queryKey: [RECEIPT_KEY, ANALYTICS_KEY, "CATEGORY"],
        queryFn: async () => {
            try {
                const spendingByCategory = await axios.get(`${SERVER_URL}/analytics/category`);
                return spendingByCategory.data;
            } catch(error) {
                console.error(error);
            }
        }   
    }));
}