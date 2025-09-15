using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BakeryAPI.Models;
using BakeryAPI.Services;

namespace BakeryAPI.Controllers
{
    /// <summary>
    /// API-controller voor het ophalen van galerijafbeeldingen.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        /// <summary>
        /// Haalt een lijst met galerijafbeeldingen op.
        /// </summary>
        /// <returns>Lijst met galerijafbeeldingen.</returns>
        [HttpGet]
        private readonly GalleryImageService _service;

        public GalleryController(GalleryImageService service)
        {
            _service = service;
        }

        public IActionResult GetGallery()
        {
            try
            {
                var gallery = _service.GetAll();
                return Ok(gallery);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Er is een fout opgetreden bij het ophalen van de galerij. Probeer het later opnieuw." });
            }
        }
    }
}
