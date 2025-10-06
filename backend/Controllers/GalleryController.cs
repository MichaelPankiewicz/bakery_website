using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for bakery gallery images (in-memory).
    /// </summary>
    public class GalleryController : ControllerBase
    {
        /// <summary>
        /// Gets all gallery images.
        /// </summary>
        /// <returns>List of gallery images with IDs.</returns>
        private static readonly List<GalleryItem> GalleryItems = new List<GalleryItem>
        {
            // Product images
            new GalleryItem { Id = 1,  Image = "/images/product1.webp" },
            new GalleryItem { Id = 2,  Image = "/images/product2.webp" },
            new GalleryItem { Id = 3,  Image = "/images/product3.webp" },
            new GalleryItem { Id = 4,  Image = "/images/product4.webp" },
            new GalleryItem { Id = 5,  Image = "/images/product5.webp" },
            new GalleryItem { Id = 6,  Image = "/images/product6.webp" },
            new GalleryItem { Id = 7,  Image = "/images/product7.webp" },
            new GalleryItem { Id = 8,  Image = "/images/product8.webp" },
            new GalleryItem { Id = 9,  Image = "/images/product9.webp" },
            new GalleryItem { Id = 10, Image = "/images/product10.webp" },
            new GalleryItem { Id = 11, Image = "/images/product11.webp" },
            new GalleryItem { Id = 12, Image = "/images/product12.webp" },
            new GalleryItem { Id = 13, Image = "/images/product13.webp" },
            new GalleryItem { Id = 14, Image = "/images/product14.webp" },
            new GalleryItem { Id = 15, Image = "/images/product15.webp" },
            new GalleryItem { Id = 16, Image = "/images/product16.webp" },

            // Meal cards
            new GalleryItem { Id = 17, Image = "/images/mealcard1.webp" },
            new GalleryItem { Id = 18, Image = "/images/mealcard2.webp" },
            new GalleryItem { Id = 19, Image = "/images/mealcard3.webp" },
            new GalleryItem { Id = 20, Image = "/images/mealcard4.webp" },

            // Interior images
            new GalleryItem { Id = 21, Image = "/images/interior1.webp" },
            new GalleryItem { Id = 22, Image = "/images/interior2.webp" },
            new GalleryItem { Id = 23, Image = "/images/interior3.webp" },
            new GalleryItem { Id = 24, Image = "/images/interior4.webp" },

            // Branding & other
            new GalleryItem { Id = 25, Image = "/images/logo.webp" },
            new GalleryItem { Id = 26, Image = "/images/hero.webp" },
            new GalleryItem { Id = 27, Image = "/images/ingridients.webp" },
            new GalleryItem { Id = 28, Image = "/images/craftsmanship.webp" },
            new GalleryItem { Id = 29, Image = "/images/community.webp" },
            new GalleryItem { Id = 30, Image = "/images/chef.webp" },
            new GalleryItem { Id = 31, Image = "/images/bakery.webp" },
            new GalleryItem { Id = 32, Image = "/images/atmosphere.webp" },
            new GalleryItem { Id = 33, Image = "/images/aboutusbakery.webp" }
        };

        [HttpGet]
        public IActionResult GetGallery()
        {
            try
            {
                return Ok(GalleryItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de galerij-afbeeldingen.", details = ex.Message });
            }
        }
    }
}
