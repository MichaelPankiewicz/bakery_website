using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuHighlightsController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public MenuHighlightsController(BakeryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenuHighlights()
        {
            try
            {
                var highlights = await _context.MenuHighlights
                    .Include(h => h.Ingredients)
                    .Include(h => h.Products)
                    .Include(h => h.Partners)
                    .ToListAsync();

                return Ok(highlights);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving menu highlights.", details = ex.Message });
            }
        }
    }
}
