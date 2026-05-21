export interface PaymentSchedule {
  paymentNumber: number;
  dueDate: string;
  totalPayment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  status: string;
  monthlyPayment: number;
  paymentSchedules:
    PaymentSchedule[];
}