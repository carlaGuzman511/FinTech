using FinTech.API.DTOs.Transactions;
using FinTech.API.Models;
using FinTech.API.Repositories.Interfaces;
using FinTech.API.Services;
using FluentAssertions;
using Moq;

namespace FinTech.Tests.Services
{
    public class TransactionServiceTests
    {
        private readonly Mock<ITransactionRepository> _transactionRepositoryMock;

        private readonly TransactionService _transactionService;

        public TransactionServiceTests()
        {
            _transactionRepositoryMock =
                new Mock<ITransactionRepository>();

            _transactionService =
                new TransactionService(
                    _transactionRepositoryMock.Object);
        }

        [Fact]
        public async Task CreateTransaction_ShouldReturnExistingTransaction_WhenIdempotencyKeyExists()
        {
            // Arrange
            var existingTransaction = new Transaction
            {
                Id = Guid.NewGuid(),
                IdempotencyKey = "abc123",
                Amount = 500
            };

            _transactionRepositoryMock
                .Setup(x =>
                    x.GetByIdempotencyKeyAsync("abc123"))
                .ReturnsAsync(existingTransaction);

            var request = new CreateTransactionDto
            {
                IdempotencyKey = "abc123",
                Amount = 500
            };

            // Act
            var result =
                await _transactionService
                    .CreateTransactionAsync(request);

            // Assert
            result.Id.Should().Be(existingTransaction.Id);

            _transactionRepositoryMock.Verify(
                x => x.AddAsync(It.IsAny<Transaction>()),
                Times.Never);
        }
    }
}
