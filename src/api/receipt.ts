import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { SERVER_URL } from '../utils/constants';
import type { GetReceipt, CreateReceipt, UpdateReceipt } from '../types/receipt';
import axios from "axios";
import { format } from "date-fns";

export const RECEIPT_KEY = 'receipts';

export const getReceipts = (queryParams: GetReceipt) => {
    return useQuery({
      queryKey: [RECEIPT_KEY, queryParams],
      queryFn: async () => {
        try {
          const params = new URLSearchParams(
            Object.entries(queryParams).reduce((acc, [key, value]) => {
              if (value !== undefined && value !== null) {
                acc[key] = String(value);
              }
              return acc;
            }, {} as Record<string, string>)
          );
  
          const response = await axios.get(
            `${SERVER_URL}/receipt?${params.toString()}`
          );
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    });
  };

export const createReceipt = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (receiptData: CreateReceipt) => {
          receiptData.date = format(receiptData.date, "yyyy-MM-dd")
          const response = await axios.post(`${SERVER_URL}/receipt`, receiptData);
          return response.data;
        },
        onError: (error) => {
            console.error(error);
            throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [RECEIPT_KEY]});
            if (onSuccess) onSuccess();
        }
    })
}

export const updateReceipt = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ receiptId, data }: { receiptId: string; data: UpdateReceipt }) => {
          if (data.date) {
            data.date = format(data.date, "yyyy-MM-dd");
          } 
          const response = await axios.put(`${SERVER_URL}/receipt/${receiptId}`, data);
          return response.data;
        },
        onError: (error) => {
            console.error(error);
            throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [RECEIPT_KEY]});
            if (onSuccess) onSuccess();
        }
    })
}

export const deleteReceipt = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (receiptId: string) => {
            const response = await axios.delete(`${SERVER_URL}/receipt/${receiptId}`);
            return response.data;
        },
        onError: (error) => {
            console.error(error);
            throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [RECEIPT_KEY]});
            if (onSuccess) onSuccess();
        }
    })
}