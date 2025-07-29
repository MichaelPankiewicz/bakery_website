// CSS
import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';
// JS
import './js/main.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.open-menu-btn');
  const menuContainer = document.getElementById('dynamic-menu-section');
  let isVisible = false;

  if (!menuButton || !menuContainer) return;

  menuButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!isVisible) {
      fetchMenuItems(menuContainer);
      menuContainer.classList.remove('hidden');
      isVisible = true;
    } else {
      menuContainer.classList.add('hidden');
      isVisible = false;
    }
  });
});

function fetchMenuItems(container) {
  container.innerHTML = '';

  fetch('http://localhost:3000/bakeryItems')
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('dynamic-card');
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML = '<p style="color:red;">Failed to load menu.</p>';
    });
}
