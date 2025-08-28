using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BakeryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetGallery()
        {
            var gallery = new List<object>
            {
                new { id = 1, image = "/images/product1.webp" },
                new { id = 2, image = "/images/product2.webp" },
                new { id = 3, image = "/images/product3.webp" },
                new { id = 4, image = "/images/product4.webp" },
                new { id = 5, image = "/images/product5.webp" },
                new { id = 6, image = "/images/product6.webp" },
                new { id = 7, image = "/images/product7.webp" },
                new { id = 8, image = "/images/product8.webp" },
                new { id = 9, image = "/images/product9.webp" },
                new { id = 10, image = "/images/product10.webp" },
                new { id = 11, image = "/images/product11.webp" },
                new { id = 12, image = "/images/product12.webp" },
                new { id = 13, image = "/images/product13.webp" },
                new { id = 14, image = "/images/product14.webp" },
                new { id = 15, image = "/images/product15.webp" },
                new { id = 16, image = "/images/product16.webp" },
                new { id = 17, image = "/images/mealcard1.webp" },
                new { id = 18, image = "/images/mealcard2.webp" },
                new { id = 19, image = "/images/mealcard3.webp" },
                new { id = 20, image = "/images/mealcard4.webp" },
                new { id = 21, image = "/images/interior1.webp" },
                new { id = 22, image = "/images/interior2.webp" },
                new { id = 23, image = "/images/interior3.webp" },
                new { id = 24, image = "/images/interior4.webp" },
                new { id = 25, image = "/images/logo.webp" },
                new { id = 26, image = "/images/hero.webp" },
                new { id = 27, image = "/images/ingridients.webp" },
                new { id = 29, image = "/images/craftsmanship.webp" },
                new { id = 30, image = "/images/community.webp" },
                new { id = 31, image = "/images/chef.webp" },
                new { id = 32, image = "/images/bakery.webp" },
                new { id = 33, image = "/images/atmosphere.webp" },
                new { id = 34, image = "/images/aboutusbakery.webp" }
            };

            return Ok(gallery);
        }
    }
}
