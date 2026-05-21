import { api } from "@/lib/api";

export const getLoans =
  async (userId?: string) => {
    const response =
      await api.get("/loans", {
        params: {
          userId,
        },
      });

    return response.data;
  };

export const getLoanById =
  async (id: string) => {
    const response =
      await api.get(`/loans/${id}`);

    return response.data;
  };

export const getLoanSchedule =
  async (id: string) => {
    const response = await api.get(
      `/loans/${id}/schedule`
    );

    return response.data;
  };

export const simulateLoan =
  async (data: any) => {
    const response =
      await api.post(
        "/loans/simulate",
        data
      );

    return response.data;
  };

export const createLoan =
  async (data: any) => {
    const response =
      await api.post(
        "/loans",
        data
      );

    return response.data;
  };

export const approveLoan =
  async (id: string) => {
    await api.patch(
      `/loans/${id}/approve`
    );
  };

export const rejectLoan =
  async (id: string) => {
    await api.patch(
      `/loans/${id}/reject`
    );
  };