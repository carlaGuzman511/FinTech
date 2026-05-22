using FinTech.Domain.Enum;

namespace FinTech.Domain.DTOs.Loans
{
    public class SimulateLoanRequestDto
    {
        public decimal Amount { get; set; }

        public int TermMonths { get; set; }

        public decimal AnnualInterestRate { get; set; }

        public LoanType LoanType { get; set; }
    }
}
