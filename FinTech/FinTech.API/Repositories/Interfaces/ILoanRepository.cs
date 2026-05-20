using FinTech.API.Models;

namespace FinTech.API.Repositories.Interfaces
{
    public interface ILoanRepository
    {
        Task<Loan?> GetByIdAsync(Guid id);

        Task<List<Loan>> GetAllAsync();

        Task<List<Loan>> GetByUserIdAsync(string userId);

        Task AddAsync(Loan loan);

        Task UpdateAsync(Loan loan);

        Task<int> CountActiveLoansAsync(string userId);

        Task<decimal> GetTotalMonthlyPaymentsAsync(string userId);
    }
}
