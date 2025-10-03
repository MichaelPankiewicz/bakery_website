// src/js/crud.js
import { fetchJson, getApiUrl } from './functions.js';

function createCardElement(p) {
  const el = document.createElement('article');
  el.className = 'crud-card';
  el.innerHTML = `
    <img src="/images/${p.imageName ?? ''}" alt="${p.name ?? ''}">
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
    let serverMsg = '';
    if (body && typeof body === 'object') {
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

  return body;
}

// 🔹 Helper om DRY te maken
function getField(form, name) {
  return form.querySelector(`[data-field="${name}"]`);
}

export function setupCrud() {
  const page = document.querySelector('.crud-page');
  if (!page) return;

  const form = page.querySelector('.crud-form');

  // gebruik helperfunctie i.p.v. losse variabelen
  const inputId = getField(form, 'id');
  const inputName = getField(form, 'name');
  const inputDescription = getField(form, 'description');
  const inputPrice = getField(form, 'price');
  const inputImage = getField(form, 'image');
  const inputTags = getField(form, 'tags'); // optional
  const cancelBtn = page.querySelector('.crud-cancel');
  const productsContainer = page.querySelector('#crud-products');

  async function loadProducts() {
    productsContainer.textContent = 'Laden...';
    try {
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

        // edit knop
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
      alert(`Opslaan mislukt — ${err.message}`);
    }
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    inputId.value = '';
    cancelBtn.style.display = 'none';
  });

  loadProducts();
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setupCrud());
} else {
  setupCrud();
}
