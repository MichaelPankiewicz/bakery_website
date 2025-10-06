using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;
using System.Threading.Tasks;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public GalleryController(BakeryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetGallery()
        {
            try
            {
                var gallery = await _context.GalleryItems.ToListAsync();
                return Ok(gallery);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de galerij-afbeeldingen.", details = ex.Message });
            }
        }
    }
}
