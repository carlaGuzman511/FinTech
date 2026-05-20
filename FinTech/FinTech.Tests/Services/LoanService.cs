using FinTech.API.DTOs.Loans;
using FinTech.API.Models;
using FinTech.API.Repositories.Interfaces;
using FinTech.API.Services;
using FinTech.API.Services.Exceptions;
using FluentAssertions;
using Moq;

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
                .WithMessage("*minimum*");
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
