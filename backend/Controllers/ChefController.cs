using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChefController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public ChefController(BakeryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetChef()
        {
            try
            {
                var chefs = await _context.Chef.ToListAsync();

                if (chefs == null || !chefs.Any())
                    return NotFound("No chef data found in the database.");

                return Ok(chefs);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving chef info: {ex.Message}");
            }
        }
    }
}
