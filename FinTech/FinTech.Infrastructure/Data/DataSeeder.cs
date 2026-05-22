using FinTech.Domain.Enum;
using FinTech.Domain.Models;

namespace FinTech.Infrastructure.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(
            ApplicationDbContext context)
        {
            if (context.Loans.Any())
            {
                return;
            }

            var loan = new Loan
            {
                Id = Guid.NewGuid(),
                UserId = "user-123",
                Amount = 5000,
                TermMonths = 12,
                InterestRate = 0.24m,
                LoanType = LoanType.Fixed,
                Status = LoanStatus.Active,
                MonthlyPayment = 472,
                MonthlyIncome = 3000,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Loans.Add(loan);

            await context.SaveChangesAsync();
        }
    }
}
