import { api } from "@/lib/api";

export const simulateLoan = async (data: any) => {
  const response = await api.post(
    "/loans/simulate",
    data
  );

  return response.data;
};

export const createLoan = async (data: any) => {
  const response = await api.post(
    "/loans",
    data
  );

  return response.data;
};

export const getLoans = async () => {
  const response = await api.get("/loans");

  return response.data;
};

export const getLoanById = async (id: string) => {
  const response = await api.get(`/loans/${id}`);

  return response.data;
};