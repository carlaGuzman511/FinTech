import LoanSimulator
  from "@/components/loans/LoanSimulator";

export default function SimulatePage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Loan Simulator
        </h1>

        <p className="text-gray-500">
          Simulate loans and create requests
        </p>
      </div>

      <LoanSimulator />
    </main>
  );
}