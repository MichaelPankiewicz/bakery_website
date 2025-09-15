using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor informatie over het ontstaan en het verhaal van de bakkerij.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AboutExploreController : ControllerBase
    {
        /// <summary>
        /// Haalt het verhaal van de bakkerij op.
        /// </summary>
        /// <returns>Lijst met informatie over het ontstaan van de bakkerij.</returns>
        [HttpGet]
        private readonly AboutExploreService _service;

        public AboutExploreController(AboutExploreService service)
        {
            _service = service;
        }

        public IActionResult GetAboutExplore()
        {
            try
            {
                var aboutExplore = _service.GetAll();
                return Ok(aboutExplore);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de informatie over de bakkerij. Probeer het later opnieuw." });
            }
        }
    }
}
