using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BakeryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
      /// <summary>
      /// Controller for top menu items (in-memory).
      /// </summary>
      public class TopMenuController : ControllerBase
    {
        /// <summary>
        /// Gets top menu items for the bakery.
        /// </summary>
        /// <returns>List of top menu items.</returns>
        [HttpGet]
        public IActionResult GetTopMenu()
        {
            var topMenu = new List<object>
            {
                new { title = "Classic Croissant", description = "Buttery, flaky French croissant baked fresh every morning.", price="$3.50", image="/images/product1.webp",
                      details = new [] { "Made with real butter", "Crispy outside, soft inside", "Perfect with coffee" } },
                new { title = "Sourdough Bread", description = "Handcrafted sourdough with a crunchy crust and tangy flavor.", price="$5.00", image="/images/product2.webp",
                      details = new [] { "Slow fermented", "No preservatives", "Ideal for sandwiches" } },
                new { title = "Chocolate Muffin", description = "Rich chocolate muffin loaded with chocolate chips.", price="$2.75", image="/images/product3.webp",
                      details = new [] { "Made with Belgian chocolate", "Moist and soft texture", "Great for dessert" } },
                new { title = "Blueberry Bagel", description = "Chewy bagel packed with fresh blueberries.", price="$3.00", image="/images/product4.webp",
                      details = new [] { "Baked daily", "Topped with sugar glaze", "Pairs well with cream cheese" } },
                new { title = "Almond Danish", description = "Flaky Danish pastry topped with almond glaze and sliced almonds.", price="$4.00", image="/images/product5.webp",
                      details = new [] { "Sweet and nutty", "Perfect breakfast treat", "Made fresh daily" } },
                new { title = "Banana Bread", description = "Moist banana bread with walnuts and cinnamon.", price="$3.25", image="/images/product6.webp",
                      details = new [] { "Contains real bananas", "Gluten-free option available", "Great with butter" } },
                new { title = "Cinnamon Roll", description = "Soft, gooey cinnamon roll with cream cheese frosting.", price="$3.75", image="/images/product7.webp",
                      details = new [] { "Made with cinnamon swirl", "Drizzled with frosting", "Baked fresh every day" } },
                new { title = "Lemon Tart", description = "Tangy lemon tart with buttery crust and fresh whipped cream.", price="$4.50", image="/images/product8.webp",
                      details = new [] { "Zesty and refreshing", "Made with fresh lemons", "Perfect dessert choice" } },
                new { title = "Pumpkin Spice Muffin", description = "Seasonal muffin with pumpkin spice and pecans.", price="$3.50", image="/images/product9.webp",
                      details = new [] { "Perfect for fall", "Topped with pecans", "Moist and flavorful" } },
                new { title = "Raspberry Scone", description = "Flaky scone bursting with fresh raspberries.", price="$3.25", image="/images/product10.webp",
                      details = new [] { "Buttery and crumbly", "Made fresh daily", "Great with tea" } },
                new { title = "Spinach Feta Croissant", description = "Savory croissant stuffed with spinach and feta cheese.", price="$4.25", image="/images/product11.webp",
                      details = new [] { "Perfect savory snack", "Flaky and cheesy", "Freshly baked" } },
                new { title = "Vanilla Cupcake", description = "Classic vanilla cupcake with buttercream frosting.", price="$2.50", image="/images/product12.webp",
                      details = new [] { "Light and fluffy", "Topped with sprinkles", "Ideal for celebrations" } }
            };

            return Ok(topMenu);
        }
    }
}
