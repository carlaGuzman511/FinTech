using FinTech.API.DTOs.Loans;

namespace FinTech.API.Services.Interfaces
{
    public interface ILoanService
    {
        Task<LoanSimulationResponseDto> SimulateLoanAsync(
            SimulateLoanRequestDto request);

        Task<LoanResponseDto> CreateLoanAsync(
            CreateLoanRequestDto request);

        Task<List<LoanResponseDto>> GetLoansAsync(string? userId);

        Task<LoanResponseDto?> GetLoanByIdAsync(Guid id);

        Task ApproveLoanAsync(Guid id);

        Task RejectLoanAsync(Guid id);

        Task<List<PaymentScheduleDto>> GetScheduleAsync(Guid loanId);
    }
}
