"use client";

import { useQuery } from
  "@tanstack/react-query";

import {
  getTransactions,
} from "@/services/transactionService";

export function useTransactions(
  filters?: {
    type?: number;
    status?: number;
  }
) {
  return useQuery({
    queryKey: [
      "transactions",
      filters,
    ],

    queryFn: () =>
      getTransactions(filters),
  });
}