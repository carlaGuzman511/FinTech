using FinTech.API.Enum;

namespace FinTech.API.DTOs.Loans
{
    public class LoanResponseDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public int TermMonths { get; set; }

        public decimal InterestRate { get; set; }

        public LoanType LoanType { get; set; }

        public LoanStatus Status { get; set; }

        public decimal MonthlyPayment { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
