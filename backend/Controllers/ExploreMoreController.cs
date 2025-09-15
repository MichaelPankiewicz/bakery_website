using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor het ophalen van extra informatie over de bakkerij.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ExploreMoreController : ControllerBase
    {
        /// <summary>
        /// Haalt extra informatie op over de bakkerij.
        /// </summary>
        /// <returns>Lijst met extra informatie.</returns>
        [HttpGet]
        private readonly ExploreMoreService _service;

        public ExploreMoreController(ExploreMoreService service)
        {
            _service = service;
        }

        public IActionResult GetExploreMore()
        {
            try
            {
                var exploreMore = _service.GetAll();
                return Ok(exploreMore);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van extra informatie. Probeer het later opnieuw." });
            }
        }
    }
}
