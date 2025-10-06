using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutExploreController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public AboutExploreController(BakeryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets the 'About Explore' story for the bakery from the database.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAboutExplore()
        {
            try
            {
                var aboutExplore = await _context.AboutExploreDto.ToListAsync();

                if (aboutExplore == null || !aboutExplore.Any())
                    return NotFound("No About Explore data found in the database.");

                return Ok(aboutExplore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving About Explore info: {ex.Message}");
            }
        }
    }
}
