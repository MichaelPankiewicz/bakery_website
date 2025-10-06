using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for bakery items (in-memory).
    /// </summary>
    public class BakeryItemsController : ControllerBase
    {
        /// <summary>
        /// Gets all bakery items.
        /// </summary>
        /// <returns>List of bakery items.</returns>
        [HttpGet]
        public IActionResult GetBakeryItems()
        {
            try
            {
                var bakeryItems = new List<BakeryItem>
                {
                    new BakeryItem { Id = 1, Name = "Rustic Baguette", Description = "Crispy on the outside, soft on the inside.", Image = "https://plus.unsplash.com/premium_photo-1668772632888-906d12e932c4?q=80&w=687" },
                    new BakeryItem { Id = 2, Name = "Chocolate Croissant", Description = "Flaky pastry with rich chocolate filling.", Image = "https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?q=80&w=764" },
                    new BakeryItem { Id = 3, Name = "Cinnamon Roll", Description = "Sweet, gooey, and loaded with cinnamon.", Image = "https://images.unsplash.com/photo-1694632288834-17d86b340745?q=80&w=687" },
                    new BakeryItem { Id = 4, Name = "Sourdough Loaf", Description = "Fermented to perfection, great for sandwiches.", Image = "https://images.unsplash.com/photo-1664339030082-f93aa0cf00a7?q=80&w=1444" },
                    new BakeryItem { Id = 5, Name = "Blueberry Muffin", Description = "Soft muffin with juicy blueberries.", Image = "https://plus.unsplash.com/premium_photo-1711684804216-4ad043c102d3?q=80&w=688" }
                };

                return Ok(bakeryItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving bakery items: {ex.Message}");
            }
        }
    }
}
