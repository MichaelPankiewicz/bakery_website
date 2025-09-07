import { fetchJson, getApiUrl, showNotification, validateEmail, validateField } from './functions.js';

export function setupContactCRUD() {
    const form = document.querySelector('#contact-crud-form');
    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const messageInput = document.querySelector('#contact-message');
    const list = document.querySelector('#contact-list');

    async function loadMessages() {
        try {
            const messages = await fetchJson('Contact');
            list.innerHTML = messages.map(msg => `
                <div class="contact-item" data-id="${msg.id}">
                    <span><strong>${msg.name}</strong> (${msg.email}): ${msg.message}</span>
                    <span>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </span>
                </div>
            `).join('');

            attachItemButtons();
        } catch (err) {
            console.error(err);
            list.innerHTML = '<p>Failed to load messages.</p>';
        }
    }

    function attachItemButtons() {
        const deleteButtons = list.querySelectorAll('.delete-btn');
        const editButtons = list.querySelectorAll('.edit-btn');

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.closest('.contact-item').dataset.id;
                try {
                    await fetch(getApiUrl(`Contact/${id}`), { method: 'DELETE' });
                    showNotification('Message deleted!');
                    loadMessages();
                } catch (err) {
                    console.error(err);
                    showNotification('Failed to delete message.');
                }
            });
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.contact-item');
                nameInput.value = item.querySelector('strong').textContent;
                emailInput.value = item.querySelector('span').textContent.match(/\((.*)\)/)[1];
                messageInput.value = item.querySelector('span').textContent.split(': ')[1];
                form.dataset.editId = item.dataset.id;
            });
        });
    }

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const validName = validateField(nameInput);
        const validEmail = validateField(emailInput);
        const validMessage = validateField(messageInput);

        if (!(validName && validEmail && validMessage)) return;

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        const editId = form.dataset.editId;
        try {
            if (editId) {
                await fetch(getApiUrl(`Contact/${editId}`), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                delete form.dataset.editId;
                showNotification('Message updated!');
            } else {
                await fetch(getApiUrl('Contact'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                showNotification('Message added!');
            }
            form.reset();
            loadMessages();
        } catch (err) {
            console.error(err);
            showNotification('Failed to save message.');
        }
    });

    loadMessages();
}
