using FinTech.API.DTOs.Loans;
using FinTech.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinTech.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoansController : ControllerBase
    {
        private readonly ILoanService _service;

        public LoansController(ILoanService service)
        {
            _service = service;
        }

        [HttpPost("simulate")]
        public async Task<IActionResult> Simulate(
            SimulateLoanRequestDto request)
        {
            var result = await _service.SimulateLoanAsync(request);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            CreateLoanRequestDto request)
        {

            var result =
                await _service.CreateLoanAsync(request);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetLoansAsync());

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var loan = await _service.GetLoanByIdAsync(id);

            if (loan == null)
            {
                return NotFound();
            }

            return Ok(loan);
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> Approve(Guid id)
        {
            await _service.ApproveLoanAsync(id);

            return NoContent();
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> Reject(Guid id)
        {
            await _service.RejectLoanAsync(id);

            return NoContent();
        }
    }
}
