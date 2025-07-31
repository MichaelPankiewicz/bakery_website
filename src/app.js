import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';
import './js/main.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.open-menu-btn');
  const menuContainer = document.querySelector('#dynamic-menu-section');

  if (!menuButton || !menuContainer) return;

  let isVisible = false;

  menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    menuContainer.classList.toggle('hidden');
    isVisible = !isVisible;

    if (isVisible) {
      fetchMenuItems(menuContainer);
    }
  });
});

function fetchMenuItems(container) {
  container.innerHTML = '';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-menu-btn';
  closeBtn.innerHTML = '✕';
  closeBtn.addEventListener('click', () => {
    container.classList.add('hidden');
  });
  container.appendChild(closeBtn);

  fetch('http://localhost:3000/bakeryItems')
    .then((res) => res.json())
    .then((items) => {
      if (!Array.isArray(items) || items.length === 0) {
        const fallback = document.createElement('p');
        fallback.className = 'fallback-msg';
        fallback.textContent = 'No menu items available at the moment. Please check back later.';
        container.appendChild(fallback);
        return;
      }

      const shuffled = items.sort(() => 0.5 - Math.random());
      const animations = ['floatIn', 'slideInLeft', 'slideInRight', 'scaleIn'];

      shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('dynamic-card');

        // Random animatie
        const animationName = animations[Math.floor(Math.random() * animations.length)];
        card.style.animationName = animationName;
        card.style.animationDelay = `${index * 100}ms`;

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(() => {
      const fallback = document.createElement('p');
      fallback.className = 'fallback-msg';
      fallback.textContent = 'Failed to load menu. Please try again later.';
      container.appendChild(fallback);
    });
}
