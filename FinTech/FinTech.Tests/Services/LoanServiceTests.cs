using FinTech.Domain.DTOs.Loans;
using FinTech.Domain.Models;
using FinTech.Application.Services;
using FinTech.Application.Exceptions;
using FluentAssertions;
using Moq;
using FinTech.Application.Interfaces;

namespace FinTech.Tests.Services
{
    public class LoanServiceTests
    {
        private readonly Mock<ILoanRepository> _loanRepositoryMock;
        private readonly Mock<ITransactionRepository> _transactionRepositoryMock;
        private readonly LoanService _loanService;

        public LoanServiceTests()
        {
            _loanRepositoryMock = new Mock<ILoanRepository>();
            _transactionRepositoryMock = new Mock<ITransactionRepository>();

            _loanService = new LoanService(
                _loanRepositoryMock.Object,
                _transactionRepositoryMock.Object);
        }

        [Fact]
        public async Task ShouldRejectInvalidTerm()
        {
            var repository = new Mock<ILoanRepository>();

            var transactionRepository = new Mock<ITransactionRepository>();

            var service = new LoanService(
                    repository.Object,
                    transactionRepository.Object);

            var request = new SimulateLoanRequestDto
                {
                    Amount = 10000,
                    TermMonths = 2,
                    AnnualInterestRate = 0.24m
                };

            await Assert.ThrowsAsync<BusinessException>(
                () => service.SimulateLoanAsync(request));
        }

        [Fact]
        public async Task CreateLoan_ShouldThrowException_WhenAmountIsTooLow()
        {
            // Arrange
            var request = new CreateLoanRequestDto
            {
                Amount = 100,
                TermMonths = 12,
                AnnualInterestRate = 0.24m,
                UserId = "user-123"
            };

            // Act
            Func<Task> act = async () =>
                await _loanService.CreateLoanAsync(request);

            // Assert
            await act.Should()
                .ThrowAsync<BusinessException>()
                .WithMessage("Loan amount must be between 500 and 50000.");
        }

        [Fact]
        public async Task CreateLoan_ShouldCreateLoanSuccessfully()
        {
            // Arrange
            var request = new CreateLoanRequestDto
            {
                Amount = 10000,
                TermMonths = 12,
                AnnualInterestRate = 0.24m,
                UserId = "user-123",
                MonthlyIncome = 5000
            };

            _loanRepositoryMock
                .Setup(x => x.CountActiveLoansAsync(It.IsAny<string>()))
                .ReturnsAsync(0);

            _loanRepositoryMock
                .Setup(x => x.GetTotalMonthlyPaymentsAsync(It.IsAny<string>()))
                .ReturnsAsync(0);

            // Act
            var result = await _loanService.CreateLoanAsync(request);

            // Assert
            result.Should().NotBeNull();

            _loanRepositoryMock.Verify(
                x => x.AddAsync(It.IsAny<Loan>()),
                Times.Once);
        }
    }
}
