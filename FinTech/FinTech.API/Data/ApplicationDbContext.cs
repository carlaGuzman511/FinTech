using FinTech.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FinTech.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Loan> Loans => Set<Loan>();

        public DbSet<PaymentSchedule> PaymentSchedules => Set<PaymentSchedule>();

        public DbSet<Transaction> Transactions => Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.IdempotencyKey)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
