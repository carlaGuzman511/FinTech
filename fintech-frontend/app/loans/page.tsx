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

  
import { LoanTypeLabel } from "@/types/loan";
import { LoanType } from "@/types/loan";

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
                <p>
                  {loan.userId}
                </p>

                <h2 className="font-bold">
                  ${loan.amount}
                </h2>

                <p>
                  {loan.termMonths}
                  months
                </p>
              </div>

              <Badge
                status={
                              LoanTypeLabel[
                                loan.loanType as LoanType
                              ] ??
                              loan.loanType
                            }
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