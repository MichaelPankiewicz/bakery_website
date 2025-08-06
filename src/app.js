import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';
import './js/main.js';

document.addEventListener('DOMContentLoaded', () => {
  // Toggle dynamic menu section visibility and fetch menu items
  const menuButton = document.querySelector('.open-menu-btn');
  const menuContainer = document.querySelector('#dynamic-menu-section');

  if (menuButton && menuContainer) {
    let isVisible = false;

    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      menuContainer.classList.toggle('hidden');
      isVisible = !isVisible;

      if (isVisible) {
        fetchMenuItems(menuContainer);
      }
    });
  }

  // Hamburger menu toggle
  const burger = document.querySelector('#burger-toggle');
  const nav = document.querySelector('header nav');
  const headerScroll = document.querySelector('header');

  if (burger && nav && headerScroll) {
    const toggleMenu = () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      headerScroll.classList.toggle('mobile-nav-open');
    };

    burger.addEventListener('click', toggleMenu);

    burger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Scroll-triggered header background
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        headerScroll.classList.add('scrolled');
      } else {
        headerScroll.classList.remove('scrolled');
      }
    });
  }
});


// STARTUP ANIMATION
window.addEventListener('load', () => {
  const overlay = document.getElementById('startup-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 3500); // matches animation delay + fade out
  }
});



function fetchMenuItems(container) {
  container.innerHTML = '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-menu-btn';
  closeBtn.innerHTML = '✕';
  closeBtn.addEventListener('click', () => {
    container.classList.add('hidden');
  });
  container.appendChild(closeBtn);

  const fallback = document.createElement('p');
  fallback.className = 'fallback-msg';
  fallback.textContent = 'Loading menu...';
  container.appendChild(fallback);

  fetch('http://localhost:3000/bakeryItems')
    .then((res) => res.json())
    .then((items) => {
      fallback.remove();

      if (!Array.isArray(items) || items.length === 0) {
        const msg = document.createElement('p');
        msg.className = 'fallback-msg';
        msg.textContent = 'No menu items available at the moment. Please check back later.';
        container.appendChild(msg);
        return;
      }

      const shuffled = items.sort(() => 0.5 - Math.random());
      const animations = ['floatIn', 'slideInLeft', 'slideInRight', 'scaleIn'];

      shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('dynamic-card');

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
      fallback.textContent = 'Failed to load menu. Please try again later.';
    });
}
