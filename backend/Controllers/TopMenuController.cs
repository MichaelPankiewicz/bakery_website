using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace bakery_website_backend.Controllers
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
            try
            {
                var topMenu = new List<bakery_website_backend.Models.TopMenuItem>
                {
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 1,
                        Title = "Classic Croissant",
                        Description = "Buttery, flaky French croissant baked fresh every morning.",
                        Price = 3.50f,
                        Image = "/images/product1.webp",
                        Details = new List<string> {
                            "Made with real butter",
                            "Crispy outside, soft inside",
                            "Perfect with coffee"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 2,
                        Title = "Sourdough Bread",
                        Description = "Handcrafted sourdough with a crunchy crust and tangy flavor.",
                        Price = 5.00f,
                        Image = "/images/product2.webp",
                        Details = new List<string> {
                            "Slow fermented",
                            "No preservatives",
                            "Ideal for sandwiches"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 3,
                        Title = "Chocolate Muffin",
                        Description = "Rich chocolate muffin loaded with chocolate chips.",
                        Price = 2.75f,
                        Image = "/images/product3.webp",
                        Details = new List<string> {
                            "Made with Belgian chocolate",
                            "Moist and soft texture",
                            "Great for dessert"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 4,
                        Title = "Blueberry Bagel",
                        Description = "Chewy bagel packed with fresh blueberries.",
                        Price = 3.00f,
                        Image = "/images/product4.webp",
                        Details = new List<string> {
                            "Baked daily",
                            "Topped with sugar glaze",
                            "Pairs well with cream cheese"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 5,
                        Title = "Almond Danish",
                        Description = "Flaky Danish pastry topped with almond glaze and sliced almonds.",
                        Price = 4.00f,
                        Image = "/images/product5.webp",
                        Details = new List<string> {
                            "Sweet and nutty",
                            "Perfect breakfast treat",
                            "Made fresh daily"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 6,
                        Title = "Banana Bread",
                        Description = "Moist banana bread with walnuts and cinnamon.",
                        Price = 3.25f,
                        Image = "/images/product6.webp",
                        Details = new List<string> {
                            "Contains real bananas",
                            "Gluten-free option available",
                            "Great with butter"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 7,
                        Title = "Cinnamon Roll",
                        Description = "Soft, gooey cinnamon roll with cream cheese frosting.",
                        Price = 3.75f,
                        Image = "/images/product7.webp",
                        Details = new List<string> {
                            "Made with cinnamon swirl",
                            "Drizzled with frosting",
                            "Baked fresh every day"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 8,
                        Title = "Lemon Tart",
                        Description = "Tangy lemon tart with buttery crust and fresh whipped cream.",
                        Price = 4.50f,
                        Image = "/images/product8.webp",
                        Details = new List<string> {
                            "Zesty and refreshing",
                            "Made with fresh lemons",
                            "Perfect dessert choice"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 9,
                        Title = "Pumpkin Spice Muffin",
                        Description = "Seasonal muffin with pumpkin spice and pecans.",
                        Price = 3.50f,
                        Image = "/images/product9.webp",
                        Details = new List<string> {
                            "Perfect for fall",
                            "Topped with pecans",
                            "Moist and flavorful"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 10,
                        Title = "Raspberry Scone",
                        Description = "Flaky scone bursting with fresh raspberries.",
                        Price = 3.25f,
                        Image = "/images/product10.webp",
                        Details = new List<string> {
                            "Buttery and crumbly",
                            "Made fresh daily",
                            "Great with tea"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 11,
                        Title = "Spinach Feta Croissant",
                        Description = "Savory croissant stuffed with spinach and feta cheese.",
                        Price = 4.25f,
                        Image = "/images/product11.webp",
                        Details = new List<string> {
                            "Perfect savory snack",
                            "Flaky and cheesy",
                            "Freshly baked"
                        }
                    },
                    new bakery_website_backend.Models.TopMenuItem {
                        Id = 12,
                        Title = "Vanilla Cupcake",
                        Description = "Classic vanilla cupcake with buttercream frosting.",
                        Price = 2.50f,
                        Image = "/images/product12.webp",
                        Details = new List<string> {
                            "Light and fluffy",
                            "Topped with sprinkles",
                            "Ideal for celebrations"
                        }
                    }
                };

                return Ok(topMenu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {
                    error = "Er is een fout opgetreden bij het ophalen van het menu.",
                    details = ex.Message
                });
            }
        }
    }
}
