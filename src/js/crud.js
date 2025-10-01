// src/js/crud.js
import { fetchJson, getApiUrl } from './functions.js';

function createCardElement(p) {
  const el = document.createElement('article');
  el.className = 'crud-card';
  el.innerHTML = `
    <img src="${p.image ?? ''}" alt="${p.name ?? ''}">
    <h3 class="crud-card-title">${p.name ?? ''}</h3>
    <p class="crud-card-desc">${p.description ?? ''}</p>
    <p class="crud-card-price">${p.price != null ? p.price : ''}</p>
    <div class="crud-actions">
      <button type="button" class="edit-btn">Bewerk</button>
      <button type="button" class="delete-btn">Verwijder</button>
    </div>
  `;

  return el;
}

// small helper that surfaces server errors (reads response body and throws when !ok)
async function apiFetch(path, options = {}) {
  const url = getApiUrl(path);
  const res = await fetch(url, options);
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch (e) { body = text; }

  if (!res.ok) {
    // Try to build a helpful error message with server ProblemDetails or plain text
    let serverMsg = '';
    if (body && typeof body === 'object') {
      // ApiController typically returns ProblemDetails with "title" and "errors"
      serverMsg = body.title ? `${body.title} ${JSON.stringify(body.errors ?? body)}` : JSON.stringify(body);
    } else {
      serverMsg = body ?? res.statusText;
    }
    const err = new Error(`API ${res.status} ${res.statusText}: ${serverMsg}`);
    err.status = res.status;
    err.body = body;
    console.error('apiFetch error details:', { url, options, status: res.status, body });
    throw err;
  }

  // return parsed json or null if empty
  return body;
}

export function setupCrud() {
  const page = document.querySelector('.crud-page');
  if (!page) return;

  const form = page.querySelector('.crud-form');
  const inputId = form.querySelector('[data-field="id"]');
  const inputName = form.querySelector('[data-field="name"]');
  const inputDescription = form.querySelector('[data-field="description"]');
  const inputPrice = form.querySelector('[data-field="price"]');
  const inputImage = form.querySelector('[data-field="image"]');
  // optional tags field - include only if present in your form
  const inputTags = form.querySelector('[data-field="tags"]');
  const cancelBtn = page.querySelector('.crud-cancel');
  const productsContainer = page.querySelector('#crud-products');

  async function loadProducts() {
    productsContainer.textContent = 'Laden...';
    try {
      // use whatever fetchJson you already have — it's fine as long as it throws on non-ok
      const products = await fetchJson('Products');
      productsContainer.innerHTML = '';
      if (!Array.isArray(products) || products.length === 0) {
        productsContainer.innerHTML = '<p>Geen producten gevonden.</p>';
        return;
      }
      products.forEach(p => {
        const card = createCardElement(p);

        // delete knop
        card.querySelector('.delete-btn').addEventListener('click', async () => {
          if (!confirm('Weet je zeker dat je dit product wilt verwijderen?')) return;
          try {
            await apiFetch(`Products/${p.id}`, { method: 'DELETE' });
            await loadProducts();
          } catch (err) {
            console.error('Delete failed:', err);
            alert(`Verwijderen mislukt: ${err.message}`);
          }
        });

        // edit knop: vul form
        card.querySelector('.edit-btn').addEventListener('click', () => {
          inputId.value = p.id ?? '';
          inputName.value = p.name ?? '';
          inputDescription.value = p.description ?? '';
          inputPrice.value = p.price ?? '';
          inputImage.value = p.image ?? '';
          if (inputTags) inputTags.value = Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags ?? '');
          cancelBtn.style.display = 'inline-block';
          inputName.focus();
        });

        productsContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Load products failed:', err);
      productsContainer.innerHTML = `<p class="error">Error loading products: ${err.message}</p>`;
    }
  }

  // form submit (create/update)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = inputId.value.trim();
    const payload = {
      name: inputName.value.trim(),
      description: inputDescription.value.trim(),
      price: inputPrice.value === '' ? null : (isNaN(Number(inputPrice.value)) ? inputPrice.value : Number(inputPrice.value)),
      image: inputImage.value.trim()
    };

    // include tags only if the field exists
    if (inputTags) {
      payload.tags = inputTags.value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }

    try {
      if (id) {
        await apiFetch(`Products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await apiFetch('Products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      form.reset();
      inputId.value = '';
      cancelBtn.style.display = 'none';
      await loadProducts();
    } catch (err) {
      console.error('Save failed:', err);
      // show the server-provided message so the user can see validation errors
      alert(`Opslaan mislukt — ${err.message}`);
    }
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    inputId.value = '';
    cancelBtn.style.display = 'none';
  });

  // initial load
  loadProducts();
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setupCrud());
} else {
  setupCrud();
}
