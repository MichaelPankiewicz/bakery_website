// Utility functions, no DOMContentLoaded needed
const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : '/api'; // Centralized base URL logic

// API helpers
export function getApiUrl(endpoint) {
    return `${baseUrl}/${endpoint}`;
}

export async function fetchJson(endpoint) {
    const url = getApiUrl(endpoint);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
    }
    return response.json();
}

// DOM helpers
export function createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

export function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

export function clearElement(element) {
    if (element) element.innerHTML = '';
}

// Form helpers
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateField(field) {
    if (!field.value.trim()) {
        field.classList.add('invalid');
        return false;
    }
    if (field.type === 'email' && !validateEmail(field.value.trim())) {
        field.classList.add('invalid');
        return false;
    }
    field.classList.remove('invalid');
    return true;
}

// Notification helper
export function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'custom-notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}
