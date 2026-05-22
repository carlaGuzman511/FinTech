using FinTech.API.Controllers;
using FinTech.Domain.Services.Interfaces;
using FinTech.Domain.DTOs.Loans;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace FinTech.Tests.Controllers
{
    public class LoansControllerTests
    {
        private readonly Mock<ILoanService> _loanServiceMock;

        private readonly LoansController _controller;

        public LoansControllerTests()
        {
            _loanServiceMock = new Mock<ILoanService>();

            _controller =
                new LoansController(_loanServiceMock.Object);
        }

        [Fact]
        public async Task Simulate_ShouldReturnOk()
        {
            // Arrange
            var response = new LoanSimulationResponseDto
            {
                MonthlyPayment = 1000
            };

            _loanServiceMock
                .Setup(x =>
                    x.SimulateLoanAsync(
                        It.IsAny<SimulateLoanRequestDto>()))
                .ReturnsAsync(response);

            // Act
            var result =
                await _controller.Simulate(
                    new SimulateLoanRequestDto());

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }
    }
}
