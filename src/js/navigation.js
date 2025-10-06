// navigation.js
// Handles hamburger menu toggle and unique menu popup
import { fetchJson } from './functions.js';

export function setupNavigation() {
    // ===========================
    // Hamburger menu toggle logic
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
    const uniqueMenuBtn = document.querySelector('#menu-link');
    const uniquePopupOverlay = document.querySelector('#uniqueMenu-popup-overlay');
    if (!uniqueMenuBtn || !uniquePopupOverlay) return;

    uniqueMenuBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        uniquePopupOverlay.innerHTML = ''; // clear previous content
        uniquePopupOverlay.classList.remove('hidden');

        // Create popup card
        const popupCard = document.createElement('div');
        popupCard.className = 'uniqueMenu-popup-card';
        popupCard.setAttribute('role', 'dialog');
        popupCard.setAttribute('aria-modal', 'true');
        popupCard.setAttribute('tabindex', '-1');

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'uniqueMenu-popup-close-btn';
        closeBtn.setAttribute('aria-label', 'Close popup');
        closeBtn.textContent = '×';
        popupCard.appendChild(closeBtn);

        // Title
        const titleEl = document.createElement('h2');
        titleEl.className = 'uniqueMenu-popup-title';
        popupCard.appendChild(titleEl);

        // Image
        const imageEl = document.createElement('img');
        imageEl.className = 'uniqueMenu-popup-image';
        imageEl.style.maxWidth = '100%';
        imageEl.style.height = 'auto';
        imageEl.style.margin = '1rem 0';
        popupCard.appendChild(imageEl);

        // Description
        const descEl = document.createElement('p');
        descEl.className = 'uniqueMenu-popup-description';
        popupCard.appendChild(descEl);

        // Price
        const priceEl = document.createElement('p');
        priceEl.className = 'uniqueMenu-popup-price';
        priceEl.style.fontWeight = 'bold';
        priceEl.style.margin = '0.5rem 0';
        popupCard.appendChild(priceEl);

        // Expand button
        const expandBtn = document.createElement('button');
        expandBtn.className = 'uniqueMenu-popup-expand-btn';
        expandBtn.textContent = 'Show Details';
        popupCard.appendChild(expandBtn);

        // Expand list
        const expandList = document.createElement('ul');
        expandList.className = 'uniqueMenu-popup-expand-list';
        expandList.setAttribute('aria-expanded', 'false');
        popupCard.appendChild(expandList);

        // Carousel controls
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'uniqueMenu-carousel-controls';
        carouselDiv.style.marginTop = '1rem';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'uniqueMenu-prev-btn';
        prevBtn.textContent = '← Prev';
        const nextBtn = document.createElement('button');
        nextBtn.className = 'uniqueMenu-next-btn';
        nextBtn.textContent = 'Next →';

        carouselDiv.appendChild(prevBtn);
        carouselDiv.appendChild(nextBtn);
        popupCard.appendChild(carouselDiv);

        uniquePopupOverlay.appendChild(popupCard);

        // Close handler
        closeBtn.addEventListener('click', () => {
            uniquePopupOverlay.classList.add('hidden');
            uniquePopupOverlay.innerHTML = '';
        });

        let menuItems = [];
        let currentIndex = 0;

        try {
            menuItems = await fetchJson('Products');
            if (!menuItems.length) {
                titleEl.textContent = 'No menu data available.';
                expandBtn.style.display = 'none';
                descEl.textContent = '';
                imageEl.style.display = 'none';
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }
        } catch (err) {
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
            titleEl.textContent = item.name || '';
            descEl.textContent = item.description || '';
            priceEl.textContent = item.price ? `Price:€ ${item.price}` : '';
            imageEl.src = item.imageName ? `/images/${item.imageName}` : '';
            imageEl.alt = item.name || 'Menu image';
            imageEl.style.display = item.imageName ? 'block' : 'none';

            // Details
            if (item.details && item.details.trim() !== '') {
                expandBtn.style.display = 'inline-block';
                expandList.textContent = ''; // clear previous

                const detailsArray = item.details.split(';').map(d => d.trim()).filter(d => d !== '');
                detailsArray.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    expandList.appendChild(li);
                });

                expandList.classList.remove('visible');
                expandBtn.textContent = 'Show Details';
                expandList.setAttribute('aria-expanded', 'false');
            } else {
                expandBtn.style.display = 'none';
                expandList.textContent = '';
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
}
