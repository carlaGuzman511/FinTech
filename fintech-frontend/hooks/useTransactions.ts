export function useTransactions(
  type?: string,
  status?: string
) {
  return useQuery({
    queryKey: [
      "transactions",
      type,
      status,
    ],

    queryFn: () =>
      getTransactions(type, status),
  });
}