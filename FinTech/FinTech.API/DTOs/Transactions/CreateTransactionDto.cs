using FinTech.API.Enum;

namespace FinTech.API.DTOs.Transactions
{
    public class CreateTransactionDto
    {
        public string IdempotencyKey { get; set; } = string.Empty;

        public TransactionType Type { get; set; }

        public decimal Amount { get; set; }

        public Guid? LoanId { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}
