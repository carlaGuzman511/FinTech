using FinTech.API.DTOs.Transactions;
using FinTech.API.Enum;
using Microsoft.AspNetCore.Mvc;

namespace FinTech.API.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionResponseDto> CreateTransactionAsync(
            CreateTransactionDto request);

        Task<List<TransactionResponseDto>> GetTransactionsAsync(TransactionType? type, TransactionStatus? status);

        Task<TransactionResponseDto?> GetByIdAsync(Guid id);
    }
}
