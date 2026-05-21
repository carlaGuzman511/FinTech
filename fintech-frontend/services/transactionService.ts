import { api } from "@/lib/api";

export async function getTransactions(filters?: {
    type?: number;
    status?: number;
  }) {
  
  const response = await api.get(
    `/transactions`,
    {
      params: filters,
    }
  );

  return response.data;
}

export async function getTransactionById(
  id: string
) {
  const response = await api.get(
    `/transactions/${id}`
  );

  return response.data;
}

export async function createTransaction(
  data: any
) {
  const response = await api.post(
    `/transactions`,
    data
  );

  return response.data;
}