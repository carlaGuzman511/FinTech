import LoanSimulator from "@/components/LoanSimulator";

export default function SimulatePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Loan Simulator
      </h1>

      <LoanSimulator />
    </main>
  );
}