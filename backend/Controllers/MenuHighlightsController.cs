using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
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
            var menuHighlights = new List<MenuHighlightDto>
            {
                new MenuHighlightDto {
                    Id = 1,
                    Title = "Fresh, Local Ingredients:",
                    Description = "We use only the freshest ingredients from nearby farms to ensure top flavor and quality in every bite.",
                    Image = "/images/ingridients.webp",
                    Type = "ingredients",
                    Ingredients = new List<IngredientDto> {
                        new IngredientDto { Name = "Organic Flour", Description = "Locally milled, full of nutrients." },
                        new IngredientDto { Name = "Raw Honey", Description = "From local apiaries, antioxidant-rich." },
                        new IngredientDto { Name = "Free-Range Eggs", Description = "Collected daily, cage-free." },
                        new IngredientDto { Name = "Seasonal Fruits", Description = "Naturally ripened, high in flavor." }
                    }
                },
                new MenuHighlightDto {
                    Id = 2,
                    Title = "Artisan Craftsmanship:",
                    Description = "Each product is handmade using traditional methods passed down through generations.",
                    Image = "/images/craftsmanship.webp",
                    Type = "products",
                    Products = new List<string> {
                        "/images/product1.webp", "/images/product2.webp", "/images/product3.webp",
                        "/images/product4.webp", "/images/product5.webp", "/images/product6.webp",
                        "/images/product7.webp", "/images/product8.webp", "/images/product9.webp",
                        "/images/product10.webp", "/images/product11.webp", "/images/product12.webp",
                        "/images/product13.webp", "/images/product14.webp", "/images/product15.webp",
                        "/images/product16.webp"
                    }
                },
                new MenuHighlightDto {
                    Id = 3,
                    Title = "Inviting Atmosphere:",
                    Description = "Our cozy café space is designed for relaxation, conversation, and delicious moments.",
                    Image = "/images/atmosphere.webp",
                    Type = "gallery",
                    Products = new List<string> {
                        "/images/interior1.webp", "/images/interior2.webp", "/images/interior3.webp", "/images/interior4.webp"
                    }
                },
                new MenuHighlightDto {
                    Id = 4,
                    Title = "Community–Oriented:",
                    Description = "We support local events and organizations that bring our neighborhood together.",
                    Image = "/images/community.webp",
                    Type = "community",
                    Partners = new List<PartnerDto> {
                        new PartnerDto { Name = "Local Farmers Market", Link = "https://farmersmarket.com" },
                        new PartnerDto { Name = "Downtown Art Walk", Link = "https://downtownartwalk.org" },
                        new PartnerDto { Name = "Food For All Charity", Link = "https://foodforall.org" }
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
