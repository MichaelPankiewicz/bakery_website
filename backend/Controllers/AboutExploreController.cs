using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BakeryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutExploreController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAboutExplore()
        {
            var aboutExplore = new List<object>
            {
                new {
                    title = "Our Story: From Dream to Delight",
                    description = "Our bakery’s journey began long before the first loaf ever left our ovens. In a small, cozy kitchen, a grandmother’s hands worked magic with nothing but flour, water, and heart. She taught that baking was not just a skill, but a way to share love. Years later, carrying those same values, our founder opened the doors to this bakery with one goal: to create a space where the warmth of home could be felt in every bite. We choose the finest local ingredients, often sourced from farmers we know by name. Every croissant is layered by hand, every cake is frosted with care, and every loaf is given time to rise naturally. Whether you stop by for your morning coffee or linger over a fresh tart in the afternoon, you’re part of the story we’re still baking.",
                    image = "/images/aboutusbakery.webp"
                }
            };

            return Ok(aboutExplore);
        }
    }
}
