using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace bakery_website_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for bakery's 'Explore More' section (in-memory).
    /// </summary>
    public class ExploreMoreController : ControllerBase
    {
        /// <summary>
        /// Gets the 'Explore More' story for the bakery.
        /// </summary>
        /// <returns>Story and image for the Explore More section.</returns>
        [HttpGet]
        public IActionResult GetExploreMore()
        {
            try
            {
                var exploreMore = new List<object>
                {
                    new {
                        Id          = 1,
                        title       = "Discover Our Bakery's Story",
                        description = "Welcome to our bakery, where every morning begins with the comforting aroma of bread fresh from the oven. We open our doors with a smile, ready to share warm pastries, crisp baguettes, and indulgent cakes made with care. Our shelves are filled with flavors that change with the seasons, each recipe crafted to brighten your day. Whether you’re here for a quick coffee, a sweet treat, or a loaf to take home, you’ll always find a friendly face and something freshly baked. Step inside and let the warmth of our bakery become part of your day.",
                        image       = "/images/bakery.webp"
                    }
                };

                return Ok(exploreMore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the 'Explore More' story: {ex.Message}");
            }
        }
    }
}
