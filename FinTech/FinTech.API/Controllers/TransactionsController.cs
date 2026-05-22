using FinTech.Domain.Services.Interfaces;
using FinTech.Domain.DTOs.Transactions;
using FinTech.Domain.Enum;
using Microsoft.AspNetCore.Mvc;

namespace FinTech.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionsController(
            ITransactionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTransactionDto request)
        {
            var result = await _service.CreateTransactionAsync(request);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] TransactionType? type, [FromQuery] TransactionStatus? status)
        {
            return Ok(await _service.GetTransactionsAsync(type, status));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var transaction = await _service.GetByIdAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }
    }
}
