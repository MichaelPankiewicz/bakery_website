import { getApiUrl, showNotification } from './functions.js';

export function setupContactCRUD() {
    const container = document.querySelector('#contact-list');

    async function loadContacts() {
        try {
            const res = await fetch(getApiUrl('Contact'));
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            container.innerHTML = data.map(msg => `
                <div class="contact-crud-item" data-id="${msg.id}">
                    <p><strong>${msg.name}</strong> (${msg.email})</p>
                    <p>${msg.message}</p>
                    <div class="contact-crud-actions">
                        <button class="edit-contact">Edit</button>
                        <button class="delete-contact">Delete</button>
                    </div>
                </div>
            `).join('');

            attachEvents();
        } catch (err) {
            console.error(err);
            container.innerHTML = `<p class="contact-crud-error">Error loading contacts.</p>`;
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
                const name = prompt('Edit name:', item.querySelector('strong').innerText);
                const email = prompt('Edit email:', item.querySelector('p').innerText.match(/\((.*?)\)/)[1]);
                const message = prompt('Edit message:', item.querySelectorAll('p')[1].innerText);

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
