// navigation.js
// Handles hamburger menu toggle and unique menu popup

document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // Hamburger menu toggle
    // ===========================
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
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                headerScroll.classList.add('scrolled');
            } else {
                headerScroll.classList.remove('scrolled');
            }
        });
    }

    // ===========================
    // Unique menu popup logic in the navbar
    // ===========================
    const uniqueMenuBtn = document.getElementById('menu-link');
    const uniquePopupOverlay = document.getElementById('uniqueMenu-popup-overlay');
    if (!uniqueMenuBtn || !uniquePopupOverlay) return;

    uniqueMenuBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        uniquePopupOverlay.classList.remove('hidden');

        // Carousel state
        let currentIndex = 0;
        let menuItems = [];

        // Create popup HTML container
        uniquePopupOverlay.innerHTML = `
            <div class="uniqueMenu-popup-card" role="dialog" aria-modal="true" aria-labelledby="uniqueMenu-popup-title" tabindex="-1">
                <button class="uniqueMenu-popup-close-btn" aria-label="Close popup">&times;</button>
                <h2 id="uniqueMenu-popup-title" class="uniqueMenu-popup-title"></h2>
                <img src="" alt="" class="uniqueMenu-popup-image" style="max-width: 100%; height: auto; margin: 1rem 0;">
                <p class="uniqueMenu-popup-description"></p>
                <p class="uniqueMenu-popup-price" style="font-weight: bold; margin: 0.5rem 0;"></p>
                <button class="uniqueMenu-popup-expand-btn">Show Details</button>
                <ul class="uniqueMenu-popup-expand-list" aria-expanded="false"></ul>
                <div class="uniqueMenu-carousel-controls" style="margin-top: 1rem;">
                <button class="uniqueMenu-prev-btn">&larr; Prev</button>
                <button class="uniqueMenu-next-btn">Next &rarr;</button>
                </div>
            </div>
        `;

        const popupCard = uniquePopupOverlay.querySelector('.uniqueMenu-popup-card');
        const closeBtn = popupCard.querySelector('.uniqueMenu-popup-close-btn');
        const titleEl = popupCard.querySelector('.uniqueMenu-popup-title');
        const imageEl = popupCard.querySelector('.uniqueMenu-popup-image');
        const descEl = popupCard.querySelector('.uniqueMenu-popup-description');
        const priceEl = popupCard.querySelector('.uniqueMenu-popup-price');
        const expandBtn = popupCard.querySelector('.uniqueMenu-popup-expand-btn');
        const expandList = popupCard.querySelector('.uniqueMenu-popup-expand-list');
        const prevBtn = popupCard.querySelector('.uniqueMenu-prev-btn');
        const nextBtn = popupCard.querySelector('.uniqueMenu-next-btn');

        closeBtn.addEventListener('click', () => {
            uniquePopupOverlay.classList.add('hidden');
            uniquePopupOverlay.innerHTML = '';
        });

        // Fetch menu items array

        const baseUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';

        const url = process.env.NODE_ENV === 'development'
            ? `${baseUrl}/topMenu`
            : `${baseUrl}/api/topMenu`;
            
        try {

            const response = await fetch(url);
            menuItems = await response.json();

            if (!menuItems.length) {
                titleEl.textContent = 'No menu data available.';
                expandBtn.style.display = 'none';
                descEl.textContent = '';
                imageEl.style.display = 'none';
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }
        } catch (error) {
            titleEl.textContent = 'Failed to load menu data.';
            expandBtn.style.display = 'none';
            descEl.textContent = '';
            imageEl.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        function showItem(index) {
            const item = menuItems[index];
            titleEl.textContent = item.title || '';
            descEl.textContent = item.description || '';
            priceEl.textContent = item.price ? `Price: ${item.price}` : '';
            imageEl.src = item.image || '';
            imageEl.alt = item.title || 'Menu image';

            if (item.details && Array.isArray(item.details) && item.details.length) {
                expandBtn.style.display = 'inline-block';
                expandList.innerHTML = item.details.map(i => `<li>${i}</li>`).join('');
                expandList.classList.remove('visible');
                expandBtn.textContent = 'Show Details';
                expandList.setAttribute('aria-expanded', 'false');
            } else {
                expandBtn.style.display = 'none';
                expandList.innerHTML = '';
            }
        }

        // Initialize first item
        showItem(currentIndex);

        // Toggle details
        expandBtn.addEventListener('click', () => {
            const isVisible = expandList.classList.toggle('visible');
            expandBtn.textContent = isVisible ? 'Hide Details' : 'Show Details';
            expandList.setAttribute('aria-expanded', isVisible);
        });

        // Carousel navigation
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            showItem(currentIndex);
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % menuItems.length;
            showItem(currentIndex);
        });
    });
});