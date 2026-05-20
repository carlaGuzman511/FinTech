using FinTech.API.Data;
using FinTech.API.Repositories.Implementations;
using FinTech.API.Repositories.Interfaces;
using FinTech.API.Services.Interfaces;
using FinTech.API.Services;
using Microsoft.EntityFrameworkCore;
using FinTech.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ILoanRepository, LoanRepository>();

builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

builder.Services.AddScoped<ILoanService, LoanService>();

builder.Services.AddScoped<ITransactionService, TransactionService>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

using (var scope = app.Services.CreateScope())
{
    var db =
        scope.ServiceProvider
            .GetRequiredService<ApplicationDbContext>();

    db.Database.Migrate();

    await DataSeeder.SeedAsync(db);
}

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

builder.Services.AddSwaggerGen();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
