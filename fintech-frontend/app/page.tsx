import Link from "next/link";

import Card from "@/components/ui/Card";

export default function Page() {
  return (
    <main className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Loan management system
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        <Link href="/loans/simulate">
          <Card>
            <h2 className="text-xl font-bold">
              Loan Simulator
            </h2>

            <p className="text-gray-500">
              Simulate and request loans
            </p>
          </Card>
        </Link>

        <Link href="/loans">
          <Card>
            <h2 className="text-xl font-bold">
              Loans
            </h2>

            <p className="text-gray-500">
              View all loans
            </p>
          </Card>
        </Link>

        <Link href="/transactions">
          <Card>
            <h2 className="text-xl font-bold">
              Transactions
            </h2>

            <p className="text-gray-500">
              View transactions
            </p>
          </Card>
        </Link>
      </div>
    </main>
  );
}