using System.Collections.Generic;
using BakeryAPI.Models;

namespace BakeryAPI.Services
{
    public class ExploreMoreService
    {
        private readonly List<ExploreMore> _items = new List<ExploreMore>
        {
            new ExploreMore {
                Id = 1,
                Title = "Discover Our Bakery's Story",
                Description = "Welcome to our bakery, where every morning begins with the comforting aroma of bread fresh from the oven. We open our doors with a smile, ready to share warm pastries, crisp baguettes, and indulgent cakes made with care. Our shelves are filled with flavors that change with the seasons, each recipe crafted to brighten your day. Whether you’re here for a quick coffee, a sweet treat, or a loaf to take home, you’ll always find a friendly face and something freshly baked. Step inside and let the warmth of our bakery become part of your day.",
                Image = "/images/bakery.webp"
            }
        };
        public IEnumerable<ExploreMore> GetAll() => _items;
    }
}
