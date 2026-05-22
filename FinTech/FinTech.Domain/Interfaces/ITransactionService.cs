using FinTech.Domain.DTOs.Transactions;
using FinTech.Domain.Enum;

namespace FinTech.Domain.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionResponseDto> CreateTransactionAsync(
            CreateTransactionDto request);

        Task<List<TransactionResponseDto>> GetTransactionsAsync(TransactionType? type, TransactionStatus? status);

        Task<TransactionResponseDto?> GetByIdAsync(Guid id);
    }
}
