using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace BakeryWebsiteBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public ContactController(BakeryDbContext context)
        {
            _context = context;
        }

        // GET: api/Contact
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var messages = await _context.ContactMessages.ToListAsync();
                return Ok(messages);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving contact messages: {ex.Message}");
            }
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var msg = await _context.ContactMessages.FindAsync(id);
                if (msg == null)
                    return NotFound($"Contact message with ID {id} not found.");

                return Ok(msg);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the contact message: {ex.Message}");
            }
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactMessage message)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                _context.ContactMessages.Add(message);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the contact message: {ex.Message}");
            }
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ContactMessage updatedMessage)
        {
            try
            {
                var msg = await _context.ContactMessages.FindAsync(id);
                if (msg == null)
                    return NotFound($"Contact message with ID {id} not found.");

                msg.Name = updatedMessage.Name;
                msg.Email = updatedMessage.Email;
                msg.Message = updatedMessage.Message;

                await _context.SaveChangesAsync();
                return Ok(msg);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the contact message: {ex.Message}");
            }
        }

        // DELETE: api/Contact/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var msg = await _context.ContactMessages.FindAsync(id);
                if (msg == null)
                    return NotFound($"Contact message with ID {id} not found.");

                _context.ContactMessages.Remove(msg);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the contact message: {ex.Message}");
            }
        }
    }
}
