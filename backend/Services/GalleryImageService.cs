using System.Collections.Generic;
using BakeryAPI.Models;

namespace BakeryAPI.Services
{
    public class GalleryImageService
    {
        private readonly List<GalleryImage> _items = new List<GalleryImage>
        {
            new GalleryImage { Id = 1, Image = "/images/product1.webp" },
            new GalleryImage { Id = 2, Image = "/images/product2.webp" },
            new GalleryImage { Id = 3, Image = "/images/product3.webp" },
            new GalleryImage { Id = 4, Image = "/images/product4.webp" },
            new GalleryImage { Id = 5, Image = "/images/product5.webp" },
            new GalleryImage { Id = 6, Image = "/images/product6.webp" },
            new GalleryImage { Id = 7, Image = "/images/product7.webp" },
            new GalleryImage { Id = 8, Image = "/images/product8.webp" },
            new GalleryImage { Id = 9, Image = "/images/product9.webp" },
            new GalleryImage { Id = 10, Image = "/images/product10.webp" },
            new GalleryImage { Id = 11, Image = "/images/product11.webp" },
            new GalleryImage { Id = 12, Image = "/images/product12.webp" },
            new GalleryImage { Id = 13, Image = "/images/product13.webp" },
            new GalleryImage { Id = 14, Image = "/images/product14.webp" },
            new GalleryImage { Id = 15, Image = "/images/product15.webp" },
            new GalleryImage { Id = 16, Image = "/images/product16.webp" },
            new GalleryImage { Id = 17, Image = "/images/mealcard1.webp" },
            new GalleryImage { Id = 18, Image = "/images/mealcard2.webp" },
            new GalleryImage { Id = 19, Image = "/images/mealcard3.webp" },
            new GalleryImage { Id = 20, Image = "/images/mealcard4.webp" },
            new GalleryImage { Id = 21, Image = "/images/interior1.webp" },
            new GalleryImage { Id = 22, Image = "/images/interior2.webp" },
            new GalleryImage { Id = 23, Image = "/images/interior3.webp" },
            new GalleryImage { Id = 24, Image = "/images/interior4.webp" },
            new GalleryImage { Id = 25, Image = "/images/logo.webp" },
            new GalleryImage { Id = 26, Image = "/images/hero.webp" },
            new GalleryImage { Id = 27, Image = "/images/ingridients.webp" },
            new GalleryImage { Id = 28, Image = "/images/craftsmanship.webp" },
            new GalleryImage { Id = 29, Image = "/images/community.webp" },
            new GalleryImage { Id = 30, Image = "/images/chef.webp" },
            new GalleryImage { Id = 31, Image = "/images/bakery.webp" },
            new GalleryImage { Id = 32, Image = "/images/atmosphere.webp" },
            new GalleryImage { Id = 33, Image = "/images/aboutusbakery.webp" }
        };
        public IEnumerable<GalleryImage> GetAll() => _items;
    }
}
