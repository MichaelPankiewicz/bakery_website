using System.Collections.Generic;
using BakeryAPI.Models;

namespace BakeryAPI.Services
{
    public class MenuHighlightService
    {
        private readonly List<MenuHighlight> _items = new List<MenuHighlight>
        {
            new MenuHighlight {
                Id = 1,
                Title = "Fresh, Local Ingredients:",
                Description = "We use only the freshest ingredients from nearby farms to ensure top flavor and quality in every bite.",
                Image = "/images/ingridients.webp",
                Type = "ingredients",
                Details = new List<object> {
                    new { name = "Organic Flour", description = "Locally milled, full of nutrients." },
                    new { name = "Raw Honey", description = "From local apiaries, antioxidant-rich." },
                    new { name = "Free-Range Eggs", description = "Collected daily, cage-free." },
                    new { name = "Seasonal Fruits", description = "Naturally ripened, high in flavor." }
                }
            },
            new MenuHighlight {
                Id = 2,
                Title = "Artisan Craftsmanship:",
                Description = "Each product is handmade using traditional methods passed down through generations.",
                Image = "/images/craftsmanship.webp",
                Type = "products",
                Details = new List<object> {
                    "/images/product1.webp","/images/product2.webp","/images/product3.webp",
                    "/images/product4.webp","/images/product5.webp","/images/product6.webp",
                    "/images/product7.webp","/images/product8.webp","/images/product9.webp",
                    "/images/product10.webp","/images/product11.webp","/images/product12.webp",
                    "/images/product13.webp","/images/product14.webp","/images/product15.webp",
                    "/images/product16.webp"
                }
            },
            new MenuHighlight {
                Id = 3,
                Title = "Inviting Atmosphere:",
                Description = "Our cozy café space is designed for relaxation, conversation, and delicious moments.",
                Image = "/images/atmosphere.webp",
                Type = "gallery",
                Details = new List<object> {
                    "/images/interior1.webp","/images/interior2.webp","/images/interior3.webp","/images/interior4.webp"
                }
            },
            new MenuHighlight {
                Id = 4,
                Title = "Community–Oriented:",
                Description = "We support local events and organizations that bring our neighborhood together.",
                Image = "/images/community.webp",
                Type = "community",
                Details = new List<object> {
                    new { name = "Local Farmers Market", link = "https://farmersmarket.com" },
                    new { name = "Downtown Art Walk", link = "https://downtownartwalk.org" },
                    new { name = "Food For All Charity", link = "https://foodforall.org" }
                }
            }
        };
        public IEnumerable<MenuHighlight> GetAll() => _items;
    }
}
