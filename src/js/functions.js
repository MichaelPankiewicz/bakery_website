// src/js/functions.js
// Algemene helpers - gebruikt door crud.js en andere modules

// Kies API base:
// 1) Als pagina expliciet window.__API_BASE__ heeft (crud.html zet deze) -> gebruik die
// 2) Anders bij dev (localhost) -> http://localhost:5144/api (pas aan als jouw dotnet op andere poort luistert)
// 3) In productie -> relative '/api'
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const API_BASE = (isBrowser && window.__API_BASE__) || (isLocalhost ? 'http://localhost:5144/api' : '/api');

function joinUrl(base, endpoint) {
  const b = String(base || '').replace(/\/+$/, '');
  const e = String(endpoint || '').replace(/^\/+/, '');
  return e ? `${b}/${e}` : b;
}

export function getApiUrl(endpoint) {
  return joinUrl(API_BASE, endpoint);
}

export async function fetchJson(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Fetch error ${res.status} ${res.statusText} -> ${url}${body ? ' :: ' + body : ''}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// DOM helpers (gekopieerd uit je eerdere utils)
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
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validateField(field) {
  if (!field.value.trim()) { field.classList.add('invalid'); return false; }
  if (field.type === 'email' && !validateEmail(field.value.trim())) { field.classList.add('invalid'); return false; }
  field.classList.remove('invalid');
  return true;
}
export function showNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'custom-notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 10);
  setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 2500);
}
