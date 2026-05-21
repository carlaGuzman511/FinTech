using FinTech.API.Data;
using FinTech.API.Enum;
using FinTech.API.Models;
using FinTech.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinTech.API.Repositories.Implementations
{
    public class LoanRepository : ILoanRepository
    {
        private readonly ApplicationDbContext _context;

        public LoanRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Loan loan)
        {
            await _context.Loans.AddAsync(loan);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Loan>> GetFilteredAsync(string? userId)
        {
            var query = _context.Loans.AsQueryable();

            if (!string.IsNullOrWhiteSpace(userId))
            {
                query = query.Where(x => x.UserId == userId);
            }

            return await query
                .Include(x => x.PaymentSchedules)
                .ToListAsync();
        }

        public async Task<Loan?> GetByIdAsync(Guid id)
        {
            return await _context.Loans
                .Include(x => x.PaymentSchedules)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Loan>> GetByUserIdAsync(string userId)
        {
            return await _context.Loans
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task UpdateAsync(Loan loan)
        {
            _context.Loans.Update(loan);
            await _context.SaveChangesAsync();
        }

        public async Task<int> CountActiveLoansAsync(string userId)
        {
            return await _context.Loans
                .CountAsync(x =>
                    x.UserId == userId &&
                    x.Status == LoanStatus.Active);
        }

        public async Task<decimal> GetTotalMonthlyPaymentsAsync(string userId)
        {
            return await _context.Loans
                .Where(x =>
                    x.UserId == userId &&
                    x.Status == LoanStatus.Active)
                .SumAsync(x => x.MonthlyPayment);
        }
    }
}
