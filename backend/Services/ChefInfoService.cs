using System.Collections.Generic;
using BakeryAPI.Models;

namespace BakeryAPI.Services
{
    public class ChefInfoService
    {
        private readonly List<ChefInfo> _items = new List<ChefInfo>
        {
            new ChefInfo {
                Id = 1,
                Title = "Chef Henry Hane",
                Description = "Chef Henry Hane is the heart and soul of our kitchen, bringing over 25 years of culinary mastery to every dish he creates. Trained in some of the world’s most prestigious culinary schools, Henry has honed his skills in both traditional and contemporary baking techniques. His passion for using locally sourced, fresh ingredients shines through in every pastry, bread, and dessert crafted under his watchful eye. Beyond his technical expertise, Henry is a true artist, blending flavors and textures to create unforgettable culinary experiences that delight all the senses. When he's not in the kitchen, Henry mentors young chefs and shares his knowledge through workshops and community events, inspiring the next generation to pursue excellence and creativity in the culinary arts.",
                Image = "/images/chef.webp"
            }
        };
        public IEnumerable<ChefInfo> GetAll() => _items;
    }
}
