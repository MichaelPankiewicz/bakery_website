using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
      /// <summary>
      /// API-controller voor het ophalen van het topmenu.
      /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TopMenuController : ControllerBase
    {
            /// <summary>
            /// Haalt het topmenu op.
            /// </summary>
            /// <returns>Lijst met topmenu-items.</returns>
        [HttpGet]
        private readonly TopMenuItemService _service;

        public TopMenuController(TopMenuItemService service)
        {
            _service = service;
        }

        public IActionResult GetTopMenu()
        {
            try
            {
                var topMenu = _service.GetAll();
                return Ok(topMenu);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van het topmenu. Probeer het later opnieuw." });
            }
        }
    }
}
