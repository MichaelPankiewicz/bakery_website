using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BakeryAPI.Controllers
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
            var bakeryItems = new List<object>
            {
                new {
                    id = 1,
                    name = "Rustic Baguette",
                    description = "Crispy on the outside, soft on the inside.",
                    image = "https://plus.unsplash.com/premium_photo-1668772632888-906d12e932c4?q=80&w=687"
                },
                new {
                    id = 2,
                    name = "Chocolate Croissant",
                    description = "Flaky pastry with rich chocolate filling.",
                    image = "https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?q=80&w=764"
                },
                new {
                    id = 3,
                    name = "Cinnamon Roll",
                    description = "Sweet, gooey, and loaded with cinnamon.",
                    image = "https://images.unsplash.com/photo-1694632288834-17d86b340745?q=80&w=687"
                },
                new {
                    id = 4,
                    name = "Sourdough Loaf",
                    description = "Fermented to perfection, great for sandwiches.",
                    image = "https://images.unsplash.com/photo-1664339030082-f93aa0cf00a7?q=80&w=1444"
                },
                new {
                    id = 5,
                    name = "Blueberry Muffin",
                    description = "Soft muffin with juicy blueberries.",
                    image = "https://plus.unsplash.com/premium_photo-1711684804216-4ad043c102d3?q=80&w=688"
                }
            };

            return Ok(bakeryItems);
        }
    }
}
