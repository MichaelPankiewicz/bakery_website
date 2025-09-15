using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor het ophalen van bakkerijproducten.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BakeryItemsController : ControllerBase
    {
        private readonly BakeryItemService _service;

        /// <summary>
        /// Constructor met dependency injection voor BakeryItemService.
        /// </summary>
        public BakeryItemsController(BakeryItemService service)
        {
            _service = service;
        }

        /// <summary>
        /// Haalt een lijst met bakkerijproducten op.
        /// </summary>
        /// <returns>Lijst met bakkerijproducten.</returns>
        [HttpGet]
        public IActionResult GetBakeryItems()
        {
            try
            {
                var bakeryItems = _service.GetAll();
                return Ok(bakeryItems);
            }
            catch (Exception ex)
            {
                // Log eventueel ex.Message
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de bakkerijproducten. Probeer het later opnieuw." });
            }
        }
    }
}
