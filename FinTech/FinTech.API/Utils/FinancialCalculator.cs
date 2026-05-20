using FinTech.API.DTOs.Loans;

namespace FinTech.API.Utils
{
    public static class FinancialCalculator
    {
        public static decimal CalculateMonthlyEffectiveRate(decimal annualRate)
        {
            var tea = (double)annualRate;

            var tem = Math.Pow(1 + tea, 1.0 / 12.0) - 1;

            return (decimal)tem;
        }

        public static decimal CalculateFixedMonthlyPayment(
            decimal amount,
            decimal annualRate,
            int termMonths)
        {
            var tem = CalculateMonthlyEffectiveRate(annualRate);

            var numerator =
                tem * (decimal)Math.Pow((double)(1 + tem), termMonths);

            var denominator =
                (decimal)Math.Pow((double)(1 + tem), termMonths) - 1;

            var payment = amount * (numerator / denominator);

            return Math.Round(payment, 2);
        }

        public static List<PaymentScheduleDto> GenerateFixedSchedule(
            decimal amount,
            decimal annualRate,
            int termMonths,
            DateTime firstPaymentDate)
        {
            var schedule = new List<PaymentScheduleDto>();

            var tem = CalculateMonthlyEffectiveRate(annualRate);

            var monthlyPayment =
                CalculateFixedMonthlyPayment(
                    amount,
                    annualRate,
                    termMonths);

            decimal remainingBalance = amount;

            for (int i = 1; i <= termMonths; i++)
            {
                var interest =
                    Math.Round(remainingBalance * tem, 2);

                var principal =
                    Math.Round(monthlyPayment - interest, 2);

                remainingBalance =
                    Math.Round(remainingBalance - principal, 2);

                if (remainingBalance < 0)
                {
                    remainingBalance = 0;
                }

                schedule.Add(new PaymentScheduleDto
                {
                    PaymentNumber = i,
                    DueDate = firstPaymentDate.AddMonths(i),
                    TotalPayment = monthlyPayment,
                    Principal = principal,
                    Interest = interest,
                    RemainingBalance = remainingBalance
                });
            }

            return schedule;
        }
    }
}
