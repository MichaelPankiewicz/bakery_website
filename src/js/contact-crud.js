// src/js/contact-crud.js
import { getApiUrl, showNotification } from './functions.js';

export function setupContactCRUD() {
  const container = document.querySelector('#contact-list');

  async function loadContacts() {
    try {
      const res = await fetch(getApiUrl('Contact'));
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      container.textContent = ''; // clear previous

      if (!Array.isArray(data) || data.length === 0) {
        const msg = document.createElement('p');
        msg.className = 'contact-crud-error';
        msg.textContent = 'No contacts found.';
        container.appendChild(msg);
        return;
      }

      data.forEach(msg => {
        const item = document.createElement('div');
        item.className = 'contact-crud-item';
        item.dataset.id = msg.id;

        // Name + email
        const pNameEmail = document.createElement('p');
        const strongName = document.createElement('strong');
        strongName.textContent = msg.name;
        pNameEmail.appendChild(strongName);
        pNameEmail.append(` (${msg.email})`);
        item.appendChild(pNameEmail);

        // Message
        const pMessage = document.createElement('p');

        // Optioneel: split message op ";" als separator en zet elk in aparte regel
        if (msg.message.includes(';')) {
          msg.message.split(';').forEach((line, idx) => {
            const span = document.createElement('span');
            span.textContent = line.trim();
            pMessage.appendChild(span);
            if (idx < msg.message.split(';').length - 1) {
              pMessage.appendChild(document.createElement('br'));
            }
          });
        } else {
          pMessage.textContent = msg.message;
        }
        item.appendChild(pMessage);

        // Action buttons
        const actions = document.createElement('div');
        actions.className = 'contact-crud-actions';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'edit-contact';
        editBtn.textContent = 'Edit';
        actions.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-contact';
        deleteBtn.textContent = 'Delete';
        actions.appendChild(deleteBtn);

        item.appendChild(actions);
        container.appendChild(item);
      });

      attachEvents();
    } catch (err) {
      console.error(err);
      container.textContent = '';
      const errMsg = document.createElement('p');
      errMsg.className = 'contact-crud-error';
      errMsg.textContent = 'Error loading contacts.';
      container.appendChild(errMsg);
    }
  }

  function attachEvents() {
    container.querySelectorAll('.delete-contact').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.closest('.contact-crud-item').dataset.id;
        try {
          await fetch(getApiUrl(`Contact/${id}`), { method: 'DELETE' });
          showNotification('Message deleted');
          loadContacts();
        } catch {
          showNotification('Failed to delete message');
        }
      });
    });

    container.querySelectorAll('.edit-contact').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const item = e.target.closest('.contact-crud-item');
        const id = item.dataset.id;
        const name = prompt('Edit name:', item.querySelector('strong').textContent);
        const emailMatch = item.querySelector('p').textContent.match(/\((.*?)\)/);
        const email = emailMatch ? emailMatch[1] : '';
        const message = prompt('Edit message:', item.querySelectorAll('p')[1].textContent);

        if (!name || !email || !message) {
          showNotification('All fields required');
          return;
        }

        try {
          await fetch(getApiUrl(`Contact/${id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, email, message })
          });
          showNotification('Message updated');
          loadContacts();
        } catch {
          showNotification('Failed to update message');
        }
      });
    });
  }

  document.addEventListener('contactUpdated', loadContacts);
  loadContacts();
}
