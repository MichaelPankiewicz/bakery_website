// form.js
// Form validation and submission logic

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function validateField(field) {
        if (!field.value.trim()) {
            field.classList.add('invalid');
            return false;
        } else {
            field.classList.remove('invalid');
            return true;
        }
    }
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
});
