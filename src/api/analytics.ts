import { SERVER_URL } from "@/utils/constants";
import { RECEIPT_KEY } from "./receipt";
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";
import { format } from "date-fns";

const ANALYTICS_KEY = "analytics";


export const getAnalytics = (startDate: string) => {
    return (useQuery({
        queryKey: [ANALYTICS_KEY, startDate],
        queryFn: async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/analytics?startDate=${startDate}`);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }));
}

export  const getCategoryAnalytics = (startDate: Date, endDate:  Date) => {
    return (useQuery({
        queryKey: ["CATEGORY", startDate, endDate],
        queryFn: async () => {
            try {
                const startDateStr = format(startDate, "yyyy-MM-dd");
                const endDatestr = format(endDate, "yyyy-MM-dd");
                const response = await axios.get(`${SERVER_URL}/analytics/category?startDate=${startDateStr}&endDate=${endDatestr}`);
                return response.data;
                
            } catch(error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!startDate && !!endDate
    }))
}