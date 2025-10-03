// src/js/crud.js
import { fetchJson, getApiUrl } from './functions.js';

function createCardElement(p) {
  const el = document.createElement('article');
  el.className = 'crud-card';

  // Image
  const img = document.createElement('img');
  img.src = `/images/${p.imageName ?? ''}`;
  img.alt = p.name ?? '';
  el.appendChild(img);

  // Title
  const h3 = document.createElement('h3');
  h3.className = 'crud-card-title';
  h3.textContent = p.name ?? '';
  el.appendChild(h3);

  // Description
  const desc = document.createElement('p');
  desc.className = 'crud-card-desc';
  desc.textContent = p.description ?? '';
  el.appendChild(desc);

  // Price
  const price = document.createElement('p');
  price.className = 'crud-card-price';
  price.textContent = p.price != null ? p.price : '';
  el.appendChild(price);

  // Actions container
  const actions = document.createElement('div');
  actions.className = 'crud-actions';

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Bewerk';
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Verwijder';
  actions.appendChild(deleteBtn);

  el.appendChild(actions);

  return el;
}

// small helper that surfaces server errors
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

// Helper om field te krijgen
function getField(form, name) {
  return form.querySelector(`[data-field="${name}"]`);
}

export function setupCrud() {
  const page = document.querySelector('.crud-page');
  if (!page) return;

  const form = page.querySelector('.crud-form');

  const inputId = getField(form, 'id');
  const inputName = getField(form, 'name');
  const inputDescription = getField(form, 'description');
  const inputPrice = getField(form, 'price');
  const inputImage = getField(form, 'image');
  const inputTags = getField(form, 'tags');
  const cancelBtn = page.querySelector('.crud-cancel');
  const productsContainer = page.querySelector('#crud-products');

  async function loadProducts() {
    productsContainer.textContent = 'Laden...';
    try {
      const products = await fetchJson('Products');
      productsContainer.textContent = '';

      if (!Array.isArray(products) || products.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'Geen producten gevonden.';
        productsContainer.appendChild(msg);
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
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error';
      errorMsg.textContent = `Error loading products: ${err.message}`;
      productsContainer.textContent = '';
      productsContainer.appendChild(errorMsg);
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
