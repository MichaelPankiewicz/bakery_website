using Microsoft.AspNetCore.Mvc;

namespace BakeryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private static List<ContactMessage> _messages = new List<ContactMessage>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_messages);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();
            return Ok(msg);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ContactMessage message)
        {
            message.Id = _messages.Count > 0 ? _messages.Max(m => m.Id) + 1 : 1;
            _messages.Add(message);
            return CreatedAtAction(nameof(GetById), new { id = message.Id }, message);
        }

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
