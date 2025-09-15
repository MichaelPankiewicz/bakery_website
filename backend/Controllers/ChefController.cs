using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor informatie over de chef.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ChefController : ControllerBase
    {
        /// <summary>
        /// Haalt informatie op over de chef van de bakkerij.
        /// </summary>
        /// <returns>Lijst met chef-informatie.</returns>
        [HttpGet]
        private readonly ChefInfoService _service;

        public ChefController(ChefInfoService service)
        {
            _service = service;
        }

        public IActionResult GetChef()
        {
            try
            {
                var chef = _service.GetAll();
                return Ok(chef);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de chef-informatie. Probeer het later opnieuw." });
            }
        }
    }
}
