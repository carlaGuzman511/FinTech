"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getLoanSchedule,
} from "@/services/loanService";

export function useLoanSchedule(
  id?: string
) {
  return useQuery({
    queryKey: ["loan-schedule", id],

    queryFn: () =>
      getLoanSchedule(id!),

    enabled: !!id,
  });
}