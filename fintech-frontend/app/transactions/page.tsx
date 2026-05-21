"use client";

import { useState }
  from "react";

import { useQuery }
  from "@tanstack/react-query";

import Card
  from "@/components/ui/Card";

import Badge
  from "@/components/ui/Badge";

import EmptyState
  from "@/components/ui/EmptyState";

import {
  getTransactions,
} from "@/services/transactionService";

export default function
TransactionsPage() {
  const [type, setType] =
    useState("");

  const [status, setStatus] =
    useState("");

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "transactions",
      type,
      status,
    ],

    queryFn: () =>
      getTransactions(
        type,
        status
      ),
  });

  if (isLoading) {
    return (
      <div>
        Loading transactions...
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>
      </div>

      <Card>
        <div className="flex gap-4">
          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded
            "
          >
            <option value="">
              All Types
            </option>

            <option value="0">
              Disbursement
            </option>

            <option value="1">
              Payment
            </option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded
            "
          >
            <option value="">
              All Status
            </option>

            <option value="0">
              Pending
            </option>

            <option value="1">
              Completed
            </option>

            <option value="2">
              Failed
            </option>
          </select>
        </div>
      </Card>

      {!data?.length && (
        <EmptyState
          title="No transactions found"
        />
      )}

      <div className="grid gap-4">
        {data?.map(
          (transaction: any) => (
            <Card
              key={
                transaction.id
              }
            >
              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <h2 className="font-bold">
                    $
                    {
                      transaction.amount
                    }
                  </h2>

                  <p>
                    {
                      transaction.type
                    }
                  </p>
                </div>

                <Badge
                  status={
                    transaction.status
                  }
                />
              </div>
            </Card>
          )
        )}
      </div>
    </main>
  );
}