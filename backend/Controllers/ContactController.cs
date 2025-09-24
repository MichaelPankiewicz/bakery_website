using Microsoft.AspNetCore.Mvc;
using BakeryApi.Models;
using bakery_website_backend.Models;

namespace bakery_website_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
    private static List<ContactMessage> _messages = new List<ContactMessage>()
        {
            // Voorbeeld: nieuwe berichten kunnen hier als dummy worden toegevoegd
            // new ContactMessage {
            //     Id      = 1,
            //     Name    = "Julia Simmons",
            //     Email   = "julia@example.com",
            //     Message = "Ik wil graag een taart bestellen voor zaterdag."
            // }
        };

        /// <summary>
        /// Gets all contact messages.
        /// </summary>
        /// <returns>List of contact messages.</returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_messages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving contact messages: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets a contact message by ID.
        /// </summary>
        /// <param name="id">Message ID.</param>
        /// <returns>The message if found, otherwise NotFound.</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var msg = _messages.FirstOrDefault(m => m.Id == id);
                if (msg == null)
                {
                    return NotFound($"Contact message with ID {id} not found.");
                }
                return Ok(msg);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the contact message: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new contact message.
        /// </summary>
        /// <param name="message">Message to add.</param>
        /// <returns>The created message.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] ContactMessage message)
        {
            try
            {
                message.Id = _messages.Count > 0 ? _messages.Max(m => m.Id) + 1 : 1;
                _messages.Add(message);
                return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the contact message: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates a contact message by ID.
        /// </summary>
        /// <param name="id">Message ID.</param>
        /// <param name="updatedMessage">Updated message data.</param>
        /// <returns>The updated message if found, otherwise NotFound.</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ContactMessage updatedMessage)
        {
            try
            {
                var msg = _messages.FirstOrDefault(m => m.Id == id);
                if (msg == null) return NotFound($"Contact message with ID {id} not found.");

                msg.Name = updatedMessage.Name;
                msg.Email = updatedMessage.Email;
                msg.Message = updatedMessage.Message;

                return Ok(msg);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the contact message: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a contact message by ID.
        /// </summary>
        /// <param name="id">Message ID.</param>
        /// <returns>NoContent if deleted, otherwise NotFound.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var msg = _messages.FirstOrDefault(m => m.Id == id);
                if (msg == null) return NotFound($"Contact message with ID {id} not found.");

                _messages.Remove(msg);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the contact message: {ex.Message}");
            }
        }
    }

}
