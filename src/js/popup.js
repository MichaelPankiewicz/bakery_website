import { fetchJson } from './functions.js';

export function setupPopups() {
    // ===========================
    // CONTACT US POPUP LOGIC
    // ===========================
    const contactBtn = document.querySelector('.contact');
    const contactOverlay = document.querySelector('#floating-menu-overlay');

    if (contactBtn && contactOverlay) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();

            contactOverlay.innerHTML = `
                <div class="popup-card contact-form-card">
                    <button class="popup-close-btn">&times;</button>
                    <h2 class="popup-title">Contact Us</h2>
                    <form id="contact-form" novalidate>
                        <label for="contact-name">Name</label>
                        <input type="text" id="contact-name" name="name" placeholder="Your name" required>

                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" name="email" placeholder="your@email.com" required>

                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="message" placeholder="Your message" required></textarea>

                        <button type="submit" class="popup-expand-btn">Send</button>
                    </form>
                </div>
            `;
            contactOverlay.classList.remove('hidden');

            // Close behavior
            const closeBtn = contactOverlay.querySelector('.popup-close-btn');
            closeBtn.addEventListener('click', () => {
                contactOverlay.classList.add('hidden');
                contactOverlay.innerHTML = '';
            });

            // Validation logic
            const form = document.querySelector('#contact-form');
            const nameInput = document.querySelector('#contact-name');
            const emailInput = document.querySelector('#contact-email');
            const messageInput = document.querySelector('#contact-message');

            function validateEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }

            function validateField(field) {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    return false;
                }
                if (field.type === 'email' && !validateEmail(field.value.trim())) {
                    field.classList.add('invalid');
                    return false;
                }
                field.classList.remove('invalid');
                return true;
            }

            [nameInput, emailInput, messageInput].forEach(input => {
                input.addEventListener('input', () => validateField(input));
            });

            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const validName = validateField(nameInput);
                const validEmail = validateField(emailInput);
                const validMessage = validateField(messageInput);

                if (validName && validEmail && validMessage) {
                    showNotification("Message sent!");
                    contactOverlay.classList.add('hidden');
                    contactOverlay.innerHTML = '';
                }
            });
        });
    }

    // ===========================
    // NOTIFICATION POPUP FUNCTION
    // ===========================
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.className = 'custom-notification';
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.classList.add('show');
        }, 10);

        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 2500);
    }

    // ===========================
    // GALLERY POPUP LOGIC WITH RANDOMIZATION
    // ===========================
    const galleryLink = document.querySelector('#gallery-link');
    const floatingMenuOverlay = document.querySelector('#floating-menu-overlay');
    const fullscreenOverlay = document.createElement('div');

    fullscreenOverlay.className = 'fullscreen-image-overlay hidden';
    fullscreenOverlay.innerHTML = `
        <div class="fullscreen-image-wrapper">
            <img src="" alt="Fullscreen view" />
            <button class="fullscreen-close-btn" aria-label="Close">&times;</button>
        </div>`;
    document.body.appendChild(fullscreenOverlay);

    const fullscreenImg = fullscreenOverlay.querySelector('img');
    const fullscreenCloseBtn = fullscreenOverlay.querySelector('.fullscreen-close-btn');

    // Fullscreen image close handlers
    fullscreenCloseBtn.addEventListener('click', () => {
        fullscreenOverlay.classList.add('hidden');
        fullscreenImg.src = '';
    });

    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) {
            fullscreenOverlay.classList.add('hidden');
            fullscreenImg.src = '';
        }
    });

    if (galleryLink) {
        galleryLink.addEventListener('click', async (e) => {
            e.preventDefault();

            floatingMenuOverlay.innerHTML = `
                <div class="popup-card">
                    <button class="popup-close-btn">&times;</button>
                    <p class="fallback-msg">Loading gallery...</p>
                </div>`;
            floatingMenuOverlay.classList.remove('hidden');

            try {
                const data = await fetchJson('gallery');

                if (!Array.isArray(data) || data.length === 0) {
                    floatingMenuOverlay.innerHTML = `
                        <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>No gallery images available.</p>
                        </div>`;
                    attachGalleryPopupCloseHandler(); // Add close for gallery popup
                    return;
                }

                // Randomize the image array
                const randomizedData = data.sort(() => Math.random() - 0.5);

                floatingMenuOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <h2 class="popup-title">Gallery</h2>
                        <div class="popup-gallery-container" style="
                            display: grid;
                            grid-template-columns: repeat(6, 1fr);
                            gap: 10px;">
                            ${randomizedData.map((item) => `
                                <div class="popup-gallery-item">
                                    <img src="${item.image}" alt="Gallery image" class="popup-gallery-image" />
                                </div>`).join('')}
                        </div>
                    </div>`;

                attachGalleryPopupCloseHandler(); // Ensure close button works
                const galleryContainer = document.querySelector('.popup-gallery-container');

                galleryContainer.addEventListener('click', (e) => {
                    const clickedImg = e.target.closest('.popup-gallery-image');
                    if (!clickedImg) return;

                    fullscreenImg.src = clickedImg.src;
                    fullscreenOverlay.classList.remove('hidden');
                });
            } catch (error) {
                console.error('Failed to load gallery:', error);
                floatingMenuOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load gallery. Please try again later.</p>
                    </div>`;
                attachGalleryPopupCloseHandler(); // Ensure close button works
            }
        });

        // Attach close handler for gallery popup
        function attachGalleryPopupCloseHandler() {
            const closeBtn = floatingMenuOverlay.querySelector('.popup-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    floatingMenuOverlay.classList.add('hidden');
                    floatingMenuOverlay.innerHTML = '';
                });
            }
        }
    }

    // ===========================
    // GENERIC FETCH-BASED POPUP FUNCTION
    // ===========================
    function setupFetchPopup({
        triggerId,
        endpoint,
        mapData,
        fallbackMessage = "No content available at the moment.",
        title = ""
    }) {
        const trigger = document.querySelector(`#${triggerId}`);
        if (!trigger || !floatingMenuOverlay) return;

        trigger.addEventListener('click', async (e) => {
            e.preventDefault();

            floatingMenuOverlay.innerHTML = `
                <div class="popup-card">
                    <button class="popup-close-btn">&times;</button>
                    <p class="fallback-msg">Loading...</p>
                </div>`;
            floatingMenuOverlay.classList.remove('hidden');

            try {
                const data = await fetchJson(endpoint);

                if (!Array.isArray(data) || data.length === 0) {
                    floatingMenuOverlay.innerHTML = `
                        <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>${fallbackMessage}</p>
                        </div>`;
                    attachCloseHandler();
                    return;
                }

                const contentHTML = mapData(data);
                floatingMenuOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        ${title ? `<h2 class="popup-title">${title}</h2>` : ''}
                        ${contentHTML}
                    </div>`;
                attachCloseHandler();
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error);
                floatingMenuOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load content. Please try again later.</p>
                    </div>`;
                attachCloseHandler();
            }
        });

        function attachCloseHandler() {
            const closeBtn = floatingMenuOverlay.querySelector('.popup-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    floatingMenuOverlay.classList.add('hidden');
                    floatingMenuOverlay.innerHTML = '';
                });
            }
        }
    }

    // ===========================
    // BUTTONS FOR DYNAMIC POPUPS
    // ===========================
    setupFetchPopup({
        triggerId: 'explore-more-btn',
        endpoint: 'exploreMore',
        mapData: (data) => data.map(item => `
            <div class="explore-item">
                <img src="${item.image}" alt="${item.title}" class="popup-image" />
                <h2 class="popup-title">${item.title}</h2>
                <p class="popup-description">${item.description}</p>
            </div>`).join('')
    });

    setupFetchPopup({
        triggerId: 'explore-more-about',
        endpoint: 'aboutExplore',
        mapData: (data) => `
            <img src="${data[0].image}" alt="${data[0].title}" class="popup-image" />
            <h2 class="popup-title">${data[0].title}</h2>
            <p class="popup-description">${data[0].description}</p>`
    });

    setupFetchPopup({
        triggerId: 'nav-chef',
        endpoint: 'chef',
        mapData: (data) => `
            <img src="${data[0].image}" alt="${data[0].title}" class="popup-image" />
            <h2 class="popup-title">${data[0].title}</h2>
            <p class="popup-description">${data[0].description}</p>`
    });
}
