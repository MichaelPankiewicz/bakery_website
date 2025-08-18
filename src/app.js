import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/popup.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';
import './js/global.js';
import './js/navigation.js';
import './js/popup.js';
import './js/animation.js';
import './js/form.js';
import './js/menu-cards.js';

// Feedback Raymon verwerkt: herbruikbare baseUrl/url functie
function getApiUrl(endpoint) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : '';
    return process.env.NODE_ENV === 'development'
        ? `${baseUrl}/${endpoint}`
        : `${baseUrl}/api/${endpoint}`;
}

// Feedback Raymon verwerkt: losse functie buiten DOMContentLoaded
async function fetchMenuItems(container) {
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

    try {
        const url = getApiUrl('bakeryItems');
        const res = await fetch(url);
        const items = await res.json();

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
    } catch {
        fallback.textContent = 'Failed to load menu. Please try again later.';
    }
}

// Feedback Raymon verwerkt: één DOMContentLoaded listener, querySelector gebruikt
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.open-menu-btn');
    const menuContainer = document.querySelector('.dynamic-menu'); // class-selector gebruikt

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
});

/* Feedback Raymon verwerkt: herbruikbare functies, async/await, één listener, querySelector, losse functies buiten listener */