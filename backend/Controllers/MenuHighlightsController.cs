using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor het ophalen van menu-highlights.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class MenuHighlightsController : ControllerBase
    {
        /// <summary>
        /// Haalt een lijst met menu-highlights op.
        /// </summary>
        /// <returns>Lijst met menu-highlights.</returns>
        [HttpGet]
        private readonly MenuHighlightService _service;

        public MenuHighlightsController(MenuHighlightService service)
        {
            _service = service;
        }

        public IActionResult GetMenuHighlights()
        {
            try
            {
                var menuHighlights = _service.GetAll();
                return Ok(menuHighlights);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de menu-highlights. Probeer het later opnieuw." });
            }
        }
    }
}
