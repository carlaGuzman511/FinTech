using FinTech.Domain.DTOs.Loans;
using FinTech.Domain.Enum;
using FinTech.Domain.Models;
using FinTech.Application.Interfaces;
using FinTech.Application.Exceptions;
using FinTech.Domain.Services.Interfaces;

namespace FinTech.Application.Services
{
    public class LoanService : ILoanService
    {
        private readonly ILoanRepository _loanRepository;

        private readonly ITransactionRepository _transactionRepository;

        public LoanService(
            ILoanRepository loanRepository,
            ITransactionRepository transactionRepository)
        {
            _loanRepository = loanRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<List<PaymentScheduleDto>> GetScheduleAsync(Guid loanId)
        {
            var loan = await _loanRepository.GetByIdAsync(loanId);

            if (loan == null)
            {
                throw new BusinessException(
                    "Loan not found.");
            }

            return loan.PaymentSchedules
                .OrderBy(x => x.PaymentNumber)
                .Select(x => new PaymentScheduleDto
                {
                    PaymentNumber = x.PaymentNumber,
                    DueDate = x.DueDate,
                    TotalPayment = x.TotalPayment,
                    Principal = x.Principal,
                    Interest = x.Interest,
                    RemainingBalance = x.RemainingBalance
                })
                .ToList();
        }

        public async Task<LoanSimulationResponseDto> SimulateLoanAsync(
            SimulateLoanRequestDto request)
        {
            ValidateLoan(request.Amount, request.TermMonths);

            var monthlyPayment =
                FinancialCalculator.CalculateFixedMonthlyPayment(
                    request.Amount,
                    request.AnnualInterestRate,
                    request.TermMonths);

            var schedule =
                FinancialCalculator.GenerateFixedSchedule(
                    request.Amount,
                    request.AnnualInterestRate,
                    request.TermMonths,
                    DateTime.UtcNow);

            return new LoanSimulationResponseDto
            {
                MonthlyPayment = monthlyPayment,
                AnnualEffectiveRate = request.AnnualInterestRate,
                MonthlyEffectiveRate =
                    FinancialCalculator.CalculateMonthlyEffectiveRate(
                        request.AnnualInterestRate),
                Schedule = schedule
            };
        }

        public async Task<LoanResponseDto> CreateLoanAsync(
            CreateLoanRequestDto request)
        {
            ValidateLoan(request.Amount, request.TermMonths);

            var activeLoans =
                await _loanRepository.CountActiveLoansAsync(
                    request.UserId);

            if (activeLoans >= 3)
            {
                throw new BusinessException(
                    "User cannot have more than 3 active loans.");
            }

            var monthlyPayment =
                FinancialCalculator.CalculateFixedMonthlyPayment(
                    request.Amount,
                    request.AnnualInterestRate,
                    request.TermMonths);

            var totalMonthlyPayments =
                await _loanRepository.GetTotalMonthlyPaymentsAsync(
                    request.UserId);

            var projectedDebt =
                totalMonthlyPayments + monthlyPayment;

            if (projectedDebt > request.MonthlyIncome * 0.4m)
            {
                throw new BusinessException(
                    "Monthly payments exceed 40% of income.");
            }

            var loan = new Loan
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                Amount = request.Amount,
                TermMonths = request.TermMonths,
                InterestRate = request.AnnualInterestRate,
                LoanType = request.LoanType,
                Status =
                    request.Amount < 10000 && activeLoans < 2
                        ? LoanStatus.Approved
                        : LoanStatus.Pending,
                MonthlyPayment = monthlyPayment,
                MonthlyIncome = request.MonthlyIncome,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var schedule =
                FinancialCalculator.GenerateFixedSchedule(
                    request.Amount,
                    request.AnnualInterestRate,
                    request.TermMonths,
                    DateTime.UtcNow);

            loan.PaymentSchedules =
                schedule.Select(x => new PaymentSchedule
                {
                    Id = Guid.NewGuid(),
                    LoanId = loan.Id,
                    PaymentNumber = x.PaymentNumber,
                    DueDate = x.DueDate,
                    TotalPayment = x.TotalPayment,
                    Principal = x.Principal,
                    Interest = x.Interest,
                    RemainingBalance = x.RemainingBalance,
                    Status = PaymentStatus.Pending
                }).ToList();

            await _loanRepository.AddAsync(loan);

            return MapToDto(loan);
        }

        public async Task<List<LoanResponseDto>> GetLoansAsync(string? userId)
        {
            var loans = await _loanRepository.GetFilteredAsync(userId);

            return loans.Select(MapToDto).ToList();
        }
        public async Task<LoanResponseDto?> GetLoanByIdAsync(Guid id)
        {
            var loan = await _loanRepository.GetByIdAsync(id);

            return loan == null ? null : MapToDto(loan);
        }

        public async Task ApproveLoanAsync(Guid id)
        {
            var loan = await _loanRepository.GetByIdAsync(id);

            if (loan == null)
            {
                throw new BusinessException("Loan not found.");
            }

            loan.Status = LoanStatus.Approved;

            loan.UpdatedAt = DateTime.UtcNow;

            await _loanRepository.UpdateAsync(loan);

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                IdempotencyKey = Guid.NewGuid().ToString(),
                Type = TransactionType.Disbursement,
                Amount = loan.Amount,
                Status = TransactionStatus.Completed,
                LoanId = loan.Id,
                Description = "Loan disbursement",
                CreatedAt = DateTime.UtcNow
            };

            await _transactionRepository.AddAsync(transaction);
        }

        public async Task RejectLoanAsync(Guid id)
        {
            var loan = await _loanRepository.GetByIdAsync(id);

            if (loan == null)
            {
                throw new BusinessException("Loan not found.");
            }

            loan.Status = LoanStatus.Rejected;

            loan.UpdatedAt = DateTime.UtcNow;

            await _loanRepository.UpdateAsync(loan);
        }

        private static void ValidateLoan(
            decimal amount,
            int termMonths)
        {
            if (amount < 500 || amount > 50000)
            {
                throw new BusinessException(
                    "Loan amount must be between 500 and 50000.");
            }

            if (termMonths < 6 || termMonths > 60)
            {
                throw new BusinessException(
                    "Loan term must be between 6 and 60 months.");
            }
        }

        private static LoanResponseDto MapToDto(Loan loan)
        {
            return new LoanResponseDto
            {
                Id = loan.Id,
                UserId = loan.UserId,
                Amount = loan.Amount,
                TermMonths = loan.TermMonths,
                InterestRate = loan.InterestRate,
                LoanType = loan.LoanType,
                Status = loan.Status,
                MonthlyPayment = loan.MonthlyPayment,
                CreatedAt = loan.CreatedAt
            };
        }
    }
}
