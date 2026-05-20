using FinTech.API.DTOs.Loans;
using FinTech.API.Repositories.Interfaces;
using FinTech.API.Services;
using FinTech.API.Services.Exceptions;
using FinTech.API.Utils;
using FluentAssertions;
using Moq;

namespace FinTech.Tests.Utils
{
    public class FinancialCalculatorTests
    {
        [Fact]
        public void ShouldCalculateMonthlyPayment()
        {
            var payment =
                FinancialCalculator.CalculateFixedMonthlyPayment(
                    10000,
                    0.24m,
                    12);

            payment.Should().BeGreaterThan(0);
        }

        [Fact]
        public void ShouldGenerateSchedule()
        {
            var schedule =
                FinancialCalculator.GenerateFixedSchedule(
                    10000,
                    0.24m,
                    12,
                    DateTime.UtcNow);

            schedule.Count.Should().Be(12);
        }

        [Fact]
        public async Task ShouldRejectInvalidAmount()
        {
            var repository =
                new Mock<ILoanRepository>();

            var transactionRepository =
                new Mock<ITransactionRepository>();

            var service =
                new LoanService(
                    repository.Object,
                    transactionRepository.Object);

            var request =
                new SimulateLoanRequestDto
                {
                    Amount = 100,
                    TermMonths = 12,
                    AnnualInterestRate = 0.24m
                };

            await Assert.ThrowsAsync<BusinessException>(
                () => service.SimulateLoanAsync(request));
        }
    }
}