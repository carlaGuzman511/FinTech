"use client";

import { useState }
  from "react";

import Link from "next/link";

import { useLoans }
  from "@/hooks/useLoans";

import Badge
  from "@/components/ui/Badge";

import Card
  from "@/components/ui/Card";

import EmptyState
  from "@/components/ui/EmptyState";

export default function LoansPage() {
  const [userId, setUserId] =
    useState("");

  const {
    data,
    isLoading,
  } = useLoans(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Loans
        </h1>
      </div>

      <Card>
        <input
          placeholder="Filter by userId"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          className="
            border
            p-2
            rounded
            w-full
          "
        />
      </Card>

      {!data?.length && (
        <EmptyState
          title="No loans found"
        />
      )}

      <div className="grid gap-4">
        {data?.map((loan: any) => (
          <Card key={loan.id}>
            <div
              className="
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2 className="font-bold">
                  ${loan.amount}
                </h2>

                <p>
                  {loan.termMonths}
                  months
                </p>
              </div>

              <Badge
                status={loan.status}
              />

              <Link
                href={`/loans/${loan.id}`}
                className="underline"
              >
                Detail
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}