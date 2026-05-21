"use client";

import { useState } from "react";

import Link from "next/link";

import {
  useTransactions,
} from "@/hooks/useTransactions";

import Card from
  "@/components/ui/Card";

import EmptyState from
  "@/components/ui/EmptyState";

import {
  TransactionType,
  TransactionTypeLabel,
  TransactionStatus,
  TransactionStatusLabel,
} from "@/types/transaction";

export default function TransactionsPage() {
  const [type, setType] =
    useState("");

  const [status, setStatus] =
    useState("");

  const {
    data,
    isLoading,
  } = useTransactions({
    type:
      type !== ""
        ? Number(type)
        : undefined,

    status:
      status !== ""
        ? Number(status)
        : undefined,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="space-y-6">
      <div
        className="
          flex
          justify-between
          items-center
        "
      >
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <Link
          href="/transactions/new"
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          New Transaction
        </Link>
      </div>

      <Card>
        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
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
              Payment
            </option>

            <option value="1">
              Disbursement
            </option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
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
              key={transaction.id}
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
                      TransactionTypeLabel[
                        transaction.type as TransactionType
                      ]
                    }
                  </p>

                  <p>
                    {
                      TransactionStatusLabel[
                        transaction.status as TransactionStatus
                      ]
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    Loan:
                    {" "}
                    {
                      transaction.loanId
                    }
                  </p>
                </div>

                <Link
                  href={`/transactions/${transaction.id}`}
                  className="underline"
                >
                  Detail
                </Link>
              </div>
            </Card>
          )
        )}
      </div>
    </main>
  );
}