import { useQuery }
  from "@tanstack/react-query";

import { getLoans }
  from "@/services/loanService";

export function useLoans(
  userId?: string
) {
  return useQuery({
    queryKey: ["loans", userId],

    queryFn: () =>
      getLoans(userId),
  });
}