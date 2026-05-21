"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
        "
      >
        <h1 className="font-bold text-xl">
          FinTech
        </h1>

        <div className="flex gap-6">
          <Link href="/">
            Dashboard
          </Link>

          <Link href="/loans">
            Loans
          </Link>

          <Link href="/loans/simulate">
            Simulator
          </Link>

          <Link href="/transactions">
            Transactions
          </Link>
        </div>
      </div>
    </nav>
  );
}