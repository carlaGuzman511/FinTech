using FinTech.Domain.Enum;

namespace FinTech.Domain.Models
{
    public class Loan
    {
        public Guid Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public int TermMonths { get; set; }

        public decimal InterestRate { get; set; }

        public LoanType LoanType { get; set; }

        public LoanStatus Status { get; set; }

        public decimal MonthlyPayment { get; set; }

        public decimal MonthlyIncome { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<PaymentSchedule> PaymentSchedules { get; set; }
            = new List<PaymentSchedule>();
    }
}
