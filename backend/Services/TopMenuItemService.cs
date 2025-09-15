using System.Collections.Generic;
using BakeryAPI.Models;

namespace BakeryAPI.Services
{
    public class TopMenuItemService
    {
        private readonly List<TopMenuItem> _items = new List<TopMenuItem>
        {
            new TopMenuItem { Title = "Classic Croissant", Description = "Buttery, flaky French croissant baked fresh every morning.", Price = "$3.50", Image = "/images/product1.webp", Details = new List<string> { "Made with real butter", "Crispy outside, soft inside", "Perfect with coffee" } },
            new TopMenuItem { Title = "Sourdough Bread", Description = "Handcrafted sourdough with a crunchy crust and tangy flavor.", Price = "$5.00", Image = "/images/product2.webp", Details = new List<string> { "Slow fermented", "No preservatives", "Ideal for sandwiches" } },
            new TopMenuItem { Title = "Chocolate Muffin", Description = "Rich chocolate muffin loaded with chocolate chips.", Price = "$2.75", Image = "/images/product3.webp", Details = new List<string> { "Made with Belgian chocolate", "Moist and soft texture", "Great for dessert" } },
            new TopMenuItem { Title = "Blueberry Bagel", Description = "Chewy bagel packed with fresh blueberries.", Price = "$3.00", Image = "/images/product4.webp", Details = new List<string> { "Baked daily", "Topped with sugar glaze", "Pairs well with cream cheese" } },
            new TopMenuItem { Title = "Almond Danish", Description = "Flaky Danish pastry topped with almond glaze and sliced almonds.", Price = "$4.00", Image = "/images/product5.webp", Details = new List<string> { "Sweet and nutty", "Perfect breakfast treat", "Made fresh daily" } },
            new TopMenuItem { Title = "Banana Bread", Description = "Moist banana bread with walnuts and cinnamon.", Price = "$3.25", Image = "/images/product6.webp", Details = new List<string> { "Contains real bananas", "Gluten-free option available", "Great with butter" } },
            new TopMenuItem { Title = "Cinnamon Roll", Description = "Soft, gooey cinnamon roll with cream cheese frosting.", Price = "$3.75", Image = "/images/product7.webp", Details = new List<string> { "Made with cinnamon swirl", "Drizzled with frosting", "Baked fresh every day" } },
            new TopMenuItem { Title = "Lemon Tart", Description = "Tangy lemon tart with buttery crust and fresh whipped cream.", Price = "$4.50", Image = "/images/product8.webp", Details = new List<string> { "Zesty and refreshing", "Made with fresh lemons", "Perfect dessert choice" } },
            new TopMenuItem { Title = "Pumpkin Spice Muffin", Description = "Seasonal muffin with pumpkin spice and pecans.", Price = "$3.50", Image = "/images/product9.webp", Details = new List<string> { "Perfect for fall", "Topped with pecans", "Moist and flavorful" } },
            new TopMenuItem { Title = "Raspberry Scone", Description = "Flaky scone bursting with fresh raspberries.", Price = "$3.25", Image = "/images/product10.webp", Details = new List<string> { "Buttery and crumbly", "Made fresh daily", "Great with tea" } },
            new TopMenuItem { Title = "Spinach Feta Croissant", Description = "Savory croissant stuffed with spinach and feta cheese.", Price = "$4.25", Image = "/images/product11.webp", Details = new List<string> { "Perfect savory snack", "Flaky and cheesy", "Freshly baked" } },
            new TopMenuItem { Title = "Vanilla Cupcake", Description = "Classic vanilla cupcake with buttercream frosting.", Price = "$2.50", Image = "/images/product12.webp", Details = new List<string> { "Light and fluffy", "Topped with sprinkles", "Ideal for celebrations" } }
        };
        public IEnumerable<TopMenuItem> GetAll() => _items;
    }
}
