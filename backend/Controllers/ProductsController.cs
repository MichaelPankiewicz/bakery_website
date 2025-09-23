using YourNamespace.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace bakery_website_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Controller for managing bakery products (in-memory).
    /// </summary>
    public class ProductsController : ControllerBase
    {
        // In-memory product list
        private static List<Product> Products = new List<Product>
        {
            new Product
            {
                Id          = 1,
                Name        = "Sourdough Bread",
                Image       = "https://images.unsplash.com/photo-1566698629409-787a68fc5724?q=80&w=1470&auto=format&fit=crop",
                Price       = 5.50M,
                Description = "A crusty artisan sourdough loaf with a tangy flavor and soft, airy interior.",
                Tags        = new List<string>
                {
                    "bread",
                    "artisan",
                    "savory",
                    "vegan",
                    "special!"
                }
            },
            new Product
            {
                Id          = 2,
                Name        = "Classic Butter Croissant",
                Image       = "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1470&auto=format&fit=crop",
                Price       = 3.25M,
                Description = "Flaky, buttery croissant made with traditional French techniques.",
                Tags        = new List<string>
                {
                    "pastry",
                    "buttery",
                    "breakfast"
                }
            },
        };

        /// <summary>
        /// Gets all products.
        /// </summary>
        /// <returns>List of all products.</returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(Products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving products: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets a product by its ID.
        /// </summary>
        /// <param name="id">Product ID.</param>
        /// <returns>The product if found, otherwise NotFound.</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var product = Products.FirstOrDefault(p => p.Id == id);
                if (product == null)
                {
                    return NotFound($"Product with ID {id} not found.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the product: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new product.
        /// </summary>
        /// <param name="newProduct">Product to add.</param>
        /// <returns>The created product.</returns>
        [HttpPost]
        public IActionResult Create([FromBody] Product newProduct)
        {
            try
            {
                newProduct.Id = Products.Max(p => p.Id) + 1; // Auto-generate a unique ID
                Products.Add(newProduct);
                return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the product: {ex.Message}");
            }
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product updatedProduct)
        {
            try
            {
                var product = Products.FirstOrDefault(p => p.Id == id);
                if (product == null)
                {
                    return NotFound($"Product with ID {id} not found.");
                }

                product.Image = updatedProduct.Image;
                product.Name = updatedProduct.Name;
                product.Price = updatedProduct.Price;
                product.Description = updatedProduct.Description;
                product.Tags = updatedProduct.Tags;

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the product: {ex.Message}");
            }
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var product = Products.FirstOrDefault(p => p.Id == id);
                if (product == null)
                {
                    return NotFound($"Product with ID {id} not found.");
                }

                Products.Remove(product);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the product: {ex.Message}");
            }
        }
    }
}
