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
  status: LoanStatus;
  loanType: LoanType;
  monthlyPayment: number;
  paymentSchedules:
    PaymentSchedule[];
}

export enum LoanStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  ACTIVE = 3,
}

export enum LoanType {
  FIXED = 0,
  DECREASING = 1,
}

export const LoanStatusLabel: Record<LoanStatus, string> = {
  [LoanStatus.PENDING]: "Pending",
  [LoanStatus.APPROVED]: "Approved",
  [LoanStatus.REJECTED]: "Rejected",
  [LoanStatus.ACTIVE]: "Active",
};

export const LoanTypeLabel: Record<LoanType, string> = {
  [LoanType.FIXED]: "Fixed",
  [LoanType.DECREASING]: "Decreasing",
};