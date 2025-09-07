// src/js/crud.js
import { fetchJson, getApiUrl } from './functions.js';

function createCardElement(p) {
  const el = document.createElement('article');
  el.className = 'crud-card';
  el.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3 class="crud-card-title">${p.name}</h3>
    <p class="crud-card-desc">${p.description}</p>
    <p class="crud-card-price">${p.price != null ? p.price : ''}</p>
    <div class="crud-actions">
      <button type="button" class="edit-btn">Bewerk</button>
      <button type="button" class="delete-btn">Verwijder</button>
    </div>
  `;

  // Attach handlers later by caller
  return el;
}

export function setupCrud() {
  const page = document.querySelector('.crud-page');
  if (!page) {
    // niet op deze pagina => niets doen
    return;
  }

  const form = page.querySelector('.crud-form');
  const inputId = form.querySelector('[data-field="id"]');
  const inputName = form.querySelector('[data-field="name"]');
  const inputDescription = form.querySelector('[data-field="description"]');
  const inputPrice = form.querySelector('[data-field="price"]');
  const inputImage = form.querySelector('[data-field="image"]');
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
            await fetch(getApiUrl(`Products/${p.id}`), { method: 'DELETE' });
            await loadProducts();
          } catch (err) {
            console.error('Delete failed:', err);
            alert('Verwijderen mislukt. Kijk console.');
          }
        });

        // edit knop: vul form
        card.querySelector('.edit-btn').addEventListener('click', () => {
          inputId.value = p.id ?? '';
          inputName.value = p.name ?? '';
          inputDescription.value = p.description ?? '';
          inputPrice.value = p.price ?? '';
          inputImage.value = p.image ?? '';
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

    try {
      if (id) {
        await fetch(getApiUrl(`Products/${id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(getApiUrl('Products'), {
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
      alert('Opslaan mislukt — zie console.');
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

// Auto-init wanneer file als module geladen wordt (bv via <script type="module" src="/src/js/crud.js">)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setupCrud());
} else {
  setupCrud();
}
