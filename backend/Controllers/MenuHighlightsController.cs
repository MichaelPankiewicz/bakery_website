using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace bakery_website_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for menu highlights (in-memory).
    /// </summary>
    public class MenuHighlightsController : ControllerBase
    {
        /// <summary>
        /// Gets menu highlights for the bakery.
        /// </summary>
        /// <returns>List of menu highlights.</returns>
        [HttpGet]
        public IActionResult GetMenuHighlights()
        {
            var menuHighlights = new List<object>
            {
                // Ingredients highlight
                new {
                    Id          = 1,
                    title       = "Fresh, Local Ingredients:",
                    description = "We use only the freshest ingredients from nearby farms to ensure top flavor and quality in every bite.",
                    image       = "/images/ingridients.webp",
                    type        = "ingredients",
                    ingredients = new [] {
                        new { name = "Organic Flour",    description = "Locally milled, full of nutrients." },
                        new { name = "Raw Honey",         description = "From local apiaries, antioxidant-rich." },
                        new { name = "Free-Range Eggs",   description = "Collected daily, cage-free." },
                        new { name = "Seasonal Fruits",   description = "Naturally ripened, high in flavor." }
                    }
                },

                // Products highlight
                new {
                    Id          = 2,
                    title       = "Artisan Craftsmanship:",
                    description = "Each product is handmade using traditional methods passed down through generations.",
                    image       = "/images/craftsmanship.webp",
                    type        = "products",
                    products    = new [] {
                        "/images/product1.webp", "/images/product2.webp", "/images/product3.webp",
                        "/images/product4.webp", "/images/product5.webp", "/images/product6.webp",
                        "/images/product7.webp", "/images/product8.webp", "/images/product9.webp",
                        "/images/product10.webp", "/images/product11.webp", "/images/product12.webp",
                        "/images/product13.webp", "/images/product14.webp", "/images/product15.webp",
                        "/images/product16.webp"
                    }
                },

                // Atmosphere highlight
                new {
                    Id          = 3,
                    title       = "Inviting Atmosphere:",
                    description = "Our cozy café space is designed for relaxation, conversation, and delicious moments.",
                    image       = "/images/atmosphere.webp",
                    type        = "gallery",
                    products    = new [] {
                        "/images/interior1.webp", "/images/interior2.webp", "/images/interior3.webp", "/images/interior4.webp"
                    }
                },

                // Community highlight
                new {
                    id          = 4,
                    title       = "Community–Oriented:",
                    description = "We support local events and organizations that bring our neighborhood together.",
                    image       = "/images/community.webp",
                    type        = "community",
                    partners    = new [] {
                        new { name = "Local Farmers Market",   link = "https://farmersmarket.com" },
                        new { name = "Downtown Art Walk",      link = "https://downtownartwalk.org" },
                        new { name = "Food For All Charity",   link = "https://foodforall.org" }
                    }
                }
            };

                try
                {
                    return Ok(menuHighlights);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"An error occurred while retrieving menu highlights: {ex.Message}");
                }
        }
    }
}
