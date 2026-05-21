export interface Transaction {
  id: string;
  idempotencyKey: string;
  type: TransactionType;
  amount: number;
  loanId: string;
  description: string;
  createdAt: string;
}

export enum TransactionType {
  PAYMENT = 0,
  DISBURSEMENT = 1,
}

export const TransactionTypeLabel: Record<
  TransactionType,
  string
> = {
  [TransactionType.PAYMENT]:
    "Payment",

  [TransactionType.DISBURSEMENT]:
    "Disbursement",
};

export enum TransactionStatus {
  PENDING = 0,
  COMPLETED = 1,
  FAILED = 2,
}

export const TransactionStatusLabel:
Record<TransactionStatus, string> = {
  [TransactionStatus.PENDING]:
    "Pending",

  [TransactionStatus.COMPLETED]:
    "Completed",

  [TransactionStatus.FAILED]:
    "Failed",
};