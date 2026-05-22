"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getLoanById,
} from "@/services/loanService";

export function useLoan(
  id?: string
) {
  return useQuery({
    queryKey: ["loan", id],

    queryFn: () =>
      getLoanById(id!),

    enabled: !!id,
  });
}