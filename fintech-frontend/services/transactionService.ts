import { api } from "@/lib/api";

export const getTransactions = async () => {
  const response = await api.get("/transactions", {
    params: {},
    });
    
  return response.data;
}
