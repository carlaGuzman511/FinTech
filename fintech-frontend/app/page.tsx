import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        FinTech - Loan Management System
      </h1>

      <div className="space-x-4">
        <Link
          href="/loans/simulate"
          className="underline"
        >
          Loan Simulator
        </Link>

        <Link
          href="/loans"
          className="underline"
        >
          Loans
        </Link>

        <Link
          href="/transactions"
          className="underline"
        >
          Transactions
        </Link>
      </div>
    </main>
  );
}