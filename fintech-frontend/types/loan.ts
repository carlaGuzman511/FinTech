export interface PaymentSchedule {
  paymentNumber: number;
  dueDate: string;
  totalPayment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface LoanSimulationResponse {
  monthlyPayment: number;
  annualEffectiveRate: number;
  monthlyEffectiveRate: number;
  schedule: PaymentSchedule[];
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  monthlyPayment: number;
  status: string;
  createdAt: string;
}