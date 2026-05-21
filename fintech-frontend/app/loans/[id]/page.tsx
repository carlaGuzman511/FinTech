"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

import PaymentScheduleTable from "@/components/loans/PaymentScheduleTable";

import { getLoanById, getLoanSchedule } from "@/services/loanService";

import { LoanStatusLabel, LoanTypeLabel } from "@/types/loan";
import { LoanStatus, LoanType } from "@/types/loan";
import { useLoanActions } from "@/hooks/useLoanActions";

export default function LoanDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["loan", id],
    queryFn: () => getLoanById(id),
    enabled: !!id,
  });

  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError
  } = useQuery({
    queryKey: ["loan-schedule", id],
    queryFn: () =>
      getLoanSchedule(id),
    enabled: !!id,
  });
  
  const {
    approveMutation,
    rejectMutation,
  } = useLoanActions(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return (
      <EmptyState
        title="Loan not found"
      />
    );
  }

  return (
    <main className="space-y-6">
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Loan #{data.id}
            </h1>

            <p className="text-gray-500">
              User: {data.userId}
            </p>
            
            <p className="text-gray-500">
              Status:
              {" "}
              {
                LoanStatusLabel[
                  data.status as LoanStatus
                ] ??
                data.status
              }
            </p>

            <p className="text-gray-500">
              Loan Type:
              {" "}
              {
                LoanTypeLabel[
                  data.loanType as LoanType
                ] ??
                data.loanType
              }
            </p>

            <p className="text-gray-500">
              Term Months: {data.termMonths}
            </p>
            
            <p className="text-gray-500">
              Amount: {data.amount}
            </p>
            
            <p className="text-gray-500">
              Created at: {data.createdAt}
            </p>
          </div>

          <Badge status={data.status} />
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500">Amount</p>
            <h2 className="text-xl font-bold">
              ${data.amount}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Term</p>
            <h2 className="text-xl font-bold">
              {data.termMonths} months
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Interest Rate</p>
            <h2 className="text-xl font-bold">
              {data.interestRate}
            </h2>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Payment Schedule
        </h2>

        {scheduleLoading ? (
          <p>Loading schedule...</p>
        ) : schedule?.length ? (
          <PaymentScheduleTable
            schedule={schedule}
          />
        ) : (
          <EmptyState
            title="No payment schedule available"
          />
        )}
      </Card>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => approveMutation.mutate()}
          disabled={approveMutation.isPending}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve
        </button>

        <button
          onClick={() => rejectMutation.mutate()}
          disabled={rejectMutation.isPending}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
      
    </main>
  );
}