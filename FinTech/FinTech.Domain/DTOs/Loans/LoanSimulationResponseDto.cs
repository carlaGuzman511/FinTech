namespace FinTech.Domain.DTOs.Loans
{
    public class LoanSimulationResponseDto
    {
        public decimal MonthlyPayment { get; set; }

        public decimal AnnualEffectiveRate { get; set; }

        public decimal MonthlyEffectiveRate { get; set; }

        public List<PaymentScheduleDto> Schedule { get; set; }
            = new();
    }
}
