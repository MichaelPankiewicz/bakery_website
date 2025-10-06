using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExploreMoreController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public ExploreMoreController(BakeryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExploreMore()
        {
            try
            {
                var exploreMore = await _context.ExploreMore.ToListAsync();

                if (exploreMore == null || !exploreMore.Any())
                    return NotFound("No Explore More data found in the database.");

                return Ok(exploreMore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the 'Explore More' story: {ex.Message}");
            }
        }
    }
}
