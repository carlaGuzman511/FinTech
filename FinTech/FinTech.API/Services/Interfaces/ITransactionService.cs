using FinTech.API.DTOs.Transactions;

namespace FinTech.API.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionResponseDto> CreateTransactionAsync(
            CreateTransactionDto request);

        Task<List<TransactionResponseDto>> GetTransactionsAsync();

        Task<TransactionResponseDto?> GetByIdAsync(Guid id);
    }
}
