"use client";

import { useEffect, useState } from "react";
import { getLoans } from "@/services/loanService";

export default function LoansPage() {
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    getLoans().then(setLoans);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Loans
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>

              <td>{loan.amount}</td>

              <td>{loan.termMonths}</td>

              <td>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}