using FinTech.API.Models;

namespace FinTech.API.Repositories.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction?> GetByIdAsync(Guid id);

        Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey);

        Task<List<Transaction>> GetAllAsync();

        Task AddAsync(Transaction transaction);
    }
}
