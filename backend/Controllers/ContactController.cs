using Microsoft.AspNetCore.Mvc;

namespace BakeryApi.Controllers
{
    /// <summary>
    /// API-controller voor het beheren van contactberichten.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private static List<ContactMessage> _messages = new List<ContactMessage>();

        /// <summary>
        /// Haalt alle contactberichten op.
        /// </summary>
        /// <returns>Lijst met contactberichten.</returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_messages);
        }

        /// <summary>
        /// Haalt een specifiek contactbericht op basis van ID.
        /// </summary>
        /// <param name="id">Het ID van het contactbericht.</param>
        /// <returns>Het contactbericht of NotFound.</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();
            return Ok(msg);
        }

        /// <summary>
        /// Voegt een nieuw contactbericht toe.
        /// </summary>
        /// <param name="message">Het contactbericht om toe te voegen.</param>
        /// <returns>Het aangemaakte contactbericht.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] ContactMessage message)
        {
            message.Id = _messages.Count > 0 ? _messages.Max(m => m.Id) + 1 : 1;
            _messages.Add(message);
            return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
        }

        /// <summary>
        /// Wijzigt een bestaand contactbericht.
        /// </summary>
        /// <param name="id">Het ID van het te wijzigen bericht.</param>
        /// <param name="updatedMessage">De nieuwe gegevens van het bericht.</param>
        /// <returns>Het gewijzigde bericht of NotFound.</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ContactMessage updatedMessage)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();

            msg.Name = updatedMessage.Name;
            msg.Email = updatedMessage.Email;
            msg.Message = updatedMessage.Message;

            return Ok(msg);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();

            _messages.Remove(msg);
            return NoContent();
        }
    }

    public class ContactMessage
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
    }
}
