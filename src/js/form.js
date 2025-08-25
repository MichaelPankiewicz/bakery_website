// form.js
// Handles contact form validation and submission

import { validateEmail, validateField } from './functions.js';

export function setupForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const messageInput = document.querySelector('#contact-message');

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let valid = true;

        [nameInput, emailInput, messageInput].forEach(input => {
            if (!validateField(input)) valid = false;
        });

        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('invalid');
            valid = false;
        }

        if (valid) {
            // Submit logic here (AJAX or show notification)
        }
    });
}
