using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BakeryItemsController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public BakeryItemsController(BakeryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBakeryItems()
        {
            try
            {
                var bakeryItems = await _context.BakeryItems.ToListAsync();

                if (bakeryItems == null || !bakeryItems.Any())
                    return NotFound("No bakery items found in the database.");

                return Ok(bakeryItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving bakery items: {ex.Message}");
            }
        }
    }
}
