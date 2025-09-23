using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BakeryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for chef information (in-memory).
    /// </summary>
    public class ChefController : ControllerBase
    {
        /// <summary>
        /// Gets chef information.
        /// </summary>
        /// <returns>Chef details and image.</returns>
        [HttpGet]
        public IActionResult GetChef()
        {
            var chef = new List<object>
            {
                new {
                    id = 1,
                    title = "Chef Henry Hane",
                    description = "Chef Henry Hane is the heart and soul of our kitchen, bringing over 25 years of culinary mastery to every dish he creates. Trained in some of the world’s most prestigious culinary schools, Henry has honed his skills in both traditional and contemporary baking techniques. His passion for using locally sourced, fresh ingredients shines through in every pastry, bread, and dessert crafted under his watchful eye. Beyond his technical expertise, Henry is a true artist, blending flavors and textures to create unforgettable culinary experiences that delight all the senses. When he's not in the kitchen, Henry mentors young chefs and shares his knowledge through workshops and community events, inspiring the next generation to pursue excellence and creativity in the culinary arts.",
                    image = "/images/chef.webp"
                }
            };

            return Ok(chef);
        }
    }
}
