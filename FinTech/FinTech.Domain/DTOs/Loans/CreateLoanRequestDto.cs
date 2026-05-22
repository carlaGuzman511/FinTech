using FinTech.Domain.Enum;

namespace FinTech.Domain.DTOs.Loans
{
    public class CreateLoanRequestDto
    {
        public string UserId { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public int TermMonths { get; set; }

        public decimal AnnualInterestRate { get; set; }

        public LoanType LoanType { get; set; }

        public decimal MonthlyIncome { get; set; }
    }
}
