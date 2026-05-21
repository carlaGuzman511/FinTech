"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

import {
  getTransactionById,
} from "@/services/transactionService";

import {
  TransactionType,
  TransactionTypeLabel,
  TransactionStatus,
  TransactionStatusLabel,
} from "@/types/transaction";

export default function TransactionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } =
    useQuery({
      queryKey: ["transaction", id],
      queryFn: () =>
        getTransactionById(id),
      enabled: !!id,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return (
      <EmptyState title="Transaction not found" />
    );
  }

  return (
    <main className="space-y-6">
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">
              Transaction #{data.id}
            </h1>

            <p className="text-gray-500">
              Loan: {data.loanId}
            </p>

            <p className="text-gray-500">
              Description: {data.description}
            </p>

            <p className="text-gray-500">
              Created: {data.createdAt}
            </p>
          </div>

          <div className="flex gap-2">
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500">
              Amount
            </p>
            <h2 className="text-xl font-bold">
              ${data.amount}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Type
            </p>
            <h2 className="text-xl font-bold">
              {
                TransactionTypeLabel[
                  data.type as TransactionType
                ]
              }
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Status
            </p>
            <h2 className="text-xl font-bold">
              {
                TransactionStatusLabel[
                  data.status as TransactionStatus
                ]
              }
            </h2>
          </div>
        </div>
      </Card>

    </main>
  );
}