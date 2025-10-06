import { fetchJson, createElementWithClass, clearElement, toggleClass } from './functions.js';

export function setupBakeryItems() {
  const menuButton = document.querySelector('.open-menu-btn');
  const menuContainer = document.querySelector('.dynamic-menu');

  if (!menuButton || !menuContainer) return;

  let isVisible = false;

  async function fetchBakeryItems(container) {
    clearElement(container);

    // Sluitknop
    const closeBtn = createElementWithClass('button', 'close-menu-btn');
    closeBtn.textContent = '\u2715'; // kruisje
    closeBtn.addEventListener('click', () => {
      toggleClass(container, 'hidden');
    });
    container.appendChild(closeBtn);

    // Fallback loading message
    const fallback = createElementWithClass('p', 'fallback-msg');
    fallback.textContent = 'Loading menu...';
    container.appendChild(fallback);

    try {
      const items = await fetchJson('bakeryItems');
      fallback.remove();

      if (!Array.isArray(items) || items.length === 0) {
        const msg = createElementWithClass('p', 'fallback-msg');
        msg.textContent = 'No menu items available at the moment. Please check back later.';
        container.appendChild(msg);
        return;
      }

      const shuffled = items.sort(() => 0.5 - Math.random());
      const animations = ['floatIn', 'slideInLeft', 'slideInRight', 'scaleIn'];

      shuffled.forEach((item, index) => {
        const card = createElementWithClass('div', 'dynamic-card');

        // Animatie instellen
        const animationName = animations[Math.floor(Math.random() * animations.length)];
        card.style.animationName = animationName;
        card.style.animationDelay = `${index * 100}ms`;

        // Afbeelding
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        card.appendChild(img);

        // Naam
        const h4 = document.createElement('h4');
        h4.textContent = item.name;
        card.appendChild(h4);

        // Beschrijving
        const p = document.createElement('p');
        p.textContent = item.description;
        card.appendChild(p);

        container.appendChild(card);
      });

    } catch {
      fallback.textContent = 'Failed to load menu. Please try again later.';
    }
  }

  menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleClass(menuContainer, 'hidden');
    isVisible = !isVisible;

    if (isVisible) {
      fetchBakeryItems(menuContainer);
    }
  });
}
