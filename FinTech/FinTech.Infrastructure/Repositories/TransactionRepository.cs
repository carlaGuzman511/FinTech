using FinTech.Infrastructure.Data;
using FinTech.Domain.Enum;
using FinTech.Domain.Models;
using FinTech.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinTech.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Transaction>> GetFilteredAsync(TransactionType? type, TransactionStatus? status)
        {
            var query = _context.Transactions.AsQueryable();

            if (type.HasValue)
            {
                query = query.Where(x => x.Type == type);
            }

            if (status.HasValue)
            {
                query = query.Where(x => x.Status == status);
            }

            return await query.ToListAsync();
        }

        public async Task<Transaction?> GetByIdAsync(Guid id)
        {
            return await _context.Transactions
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Transaction?> GetByIdempotencyKeyAsync(string idempotencyKey)
        {
            return await _context.Transactions
                .FirstOrDefaultAsync(x =>
                    x.IdempotencyKey == idempotencyKey);
        }
    }
}
