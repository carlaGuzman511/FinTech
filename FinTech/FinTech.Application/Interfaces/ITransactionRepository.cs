using FinTech.Domain.Enum;
using FinTech.Domain.Models;

namespace FinTech.Application.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction?> GetByIdAsync(Guid id);

        Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey);

        Task AddAsync(Transaction transaction);

        Task<List<Transaction>> GetFilteredAsync(TransactionType? type, TransactionStatus? status);
    }
}
