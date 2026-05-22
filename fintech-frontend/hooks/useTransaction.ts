"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getTransactionById,
} from "@/services/transactionService";

export function useTransaction(
  id?: string
) {
  return useQuery({
    queryKey: ["transaction", id],

    queryFn: () =>
      getTransactionById(id!),

    enabled: !!id,
  });
}