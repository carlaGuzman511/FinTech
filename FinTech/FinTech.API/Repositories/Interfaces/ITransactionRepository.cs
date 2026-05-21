using FinTech.API.Enum;
using FinTech.API.Models;

namespace FinTech.API.Repositories.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction?> GetByIdAsync(Guid id);

        Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey);

        Task AddAsync(Transaction transaction);

        Task<List<Transaction>> GetFilteredAsync(TransactionType? type, TransactionStatus? status);
    }
}
