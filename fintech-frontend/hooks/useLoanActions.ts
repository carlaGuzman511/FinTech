import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveLoan, rejectLoan } from "@/services/loanService";
import toast from "react-hot-toast";

export function useLoanActions(loanId: string) {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: () => approveLoan(loanId),
    onSuccess: () => {
      toast.success("Loan approved");

      queryClient.invalidateQueries({
        queryKey: ["loan", loanId],
      });
    },
    onError: () => {
      toast.error("Error approving loan");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectLoan(loanId),
    onSuccess: () => {
      toast.success("Loan rejected");

      queryClient.invalidateQueries({
        queryKey: ["loan", loanId],
      });
    },
    onError: () => {
      toast.error("Error rejecting loan");
    },
  });

  return {
    approveMutation,
    rejectMutation,
  };
}