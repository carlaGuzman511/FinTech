using FinTech.Domain.Models;

namespace FinTech.Application.Interfaces
{
    public interface ILoanRepository
    {
        Task<Loan?> GetByIdAsync(Guid id);

        Task<List<Loan>> GetByUserIdAsync(string userId);

        Task AddAsync(Loan loan);

        Task UpdateAsync(Loan loan);

        Task<int> CountActiveLoansAsync(string userId);

        Task<decimal> GetTotalMonthlyPaymentsAsync(string userId);

        Task<List<Loan>> GetFilteredAsync(string? userId);
    }
}

