using FinTech.API.DTOs.Transactions;
using FinTech.API.Enum;
using FinTech.API.Models;
using FinTech.API.Repositories.Interfaces;
using FinTech.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinTech.API.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;

        public TransactionService(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<TransactionResponseDto> CreateTransactionAsync(CreateTransactionDto request)
        {
            var existing = await _repository.GetByIdempotencyKeyAsync(request.IdempotencyKey);

            if (existing != null)
            {
                return MapToDto(existing);
            }

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                IdempotencyKey = request.IdempotencyKey,
                Type = request.Type,
                Amount = request.Amount,
                Status = TransactionStatus.Completed,
                LoanId = request.LoanId,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(transaction);

            return MapToDto(transaction);
        }

        public async Task<List<TransactionResponseDto>>GetTransactionsAsync(TransactionType? type, TransactionStatus? status)
        {
            var transactions = await _repository.GetFilteredAsync(type, status);

            return transactions
                .Select(MapToDto)
                .ToList();
        }

        public async Task<TransactionResponseDto?> GetByIdAsync(Guid id)
        {
            var transaction = await _repository.GetByIdAsync(id);

            return transaction == null
                ? null
                : MapToDto(transaction);
        }

        private static TransactionResponseDto MapToDto(Transaction transaction)
        {
            return new TransactionResponseDto
            {
                Id = transaction.Id,
                IdempotencyKey = transaction.IdempotencyKey,
                Type = transaction.Type,
                Amount = transaction.Amount,
                Status = transaction.Status,
                LoanId = transaction.LoanId,
                Description = transaction.Description,
                CreatedAt = transaction.CreatedAt
            };
        }
    }
}
