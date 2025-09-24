// src/js/popup.js
import { fetchJson, showNotification, validateEmail, validateField, getApiUrl } from './functions.js';

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

            // Close popup
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

            [nameInput, emailInput, messageInput].forEach(input => {
                input.addEventListener('input', () => validateField(input));
            });

            form.addEventListener('submit', async (ev) => {
                ev.preventDefault();

                const validName = validateField(nameInput);
                const validEmail = validateField(emailInput);
                const validMessage = validateField(messageInput);

                if (validName && validEmail && validMessage) {
                    try {
                        // POST to API
                        await fetch(getApiUrl('Contact'), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: nameInput.value.trim(),
                                email: emailInput.value.trim(),
                                message: messageInput.value.trim()
                            })
                        });

                        showNotification('Message sent!');
                        contactOverlay.classList.add('hidden');
                        contactOverlay.innerHTML = '';

                        // Trigger refresh of contact-crud if exists
                        if (typeof setupContactCRUD !== 'undefined') {
                            document.dispatchEvent(new Event('contactUpdated'));
                        }

                    } catch (err) {
                        console.error(err);
                        showNotification('Failed to submit message.');
                    }
                }
            });
        });
    }
        let cleanupFns = [];
        if (contactBtn?.addEventListener && contactOverlay) {
            const openPopup = (e) => {
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

                // Close popup
                const closeBtn = contactOverlay.querySelector('.popup-close-btn');
                const closeHandler = () => {
                    contactOverlay.classList.add('hidden');
                    contactOverlay.innerHTML = '';
                    cleanupFns.forEach(fn => fn());
                    cleanupFns = [];
                };
                closeBtn?.addEventListener('click', closeHandler);
                cleanupFns.push(() => closeBtn?.removeEventListener('click', closeHandler));

                // Validation logic
                const form = document.querySelector('#contact-form');
                const nameInput = document.querySelector('#contact-name');
                const emailInput = document.querySelector('#contact-email');
                const messageInput = document.querySelector('#contact-message');

                [nameInput, emailInput, messageInput].forEach(input => {
                    if (input?.addEventListener) {
                        const inputHandler = () => validateField(input);
                        input.addEventListener('input', inputHandler);
                        cleanupFns.push(() => input.removeEventListener('input', inputHandler));
                    }
                });

                if (form?.addEventListener) {
                    const submitHandler = async (ev) => {
                        ev.preventDefault();
                        const validName = validateField(nameInput);
                        const validEmail = validateField(emailInput);
                        const validMessage = validateField(messageInput);
                        if (validName && validEmail && validMessage) {
                            try {
                                await fetch(getApiUrl('Contact'), {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        name: nameInput.value.trim(),
                                        email: emailInput.value.trim(),
                                        message: messageInput.value.trim()
                                    })
                                });
                                showNotification('Message sent!');
                                contactOverlay.classList.add('hidden');
                                contactOverlay.innerHTML = '';
                                if (typeof setupContactCRUD !== 'undefined') {
                                    document.dispatchEvent(new Event('contactUpdated'));
                                }
                            } catch (err) {
                                showNotification('Error sending message.');
                            }
                        }
                    };
                    form.addEventListener('submit', submitHandler);
                    cleanupFns.push(() => form.removeEventListener('submit', submitHandler));
                }
            };
            contactBtn.addEventListener('click', openPopup);
            cleanupFns.push(() => contactBtn.removeEventListener('click', openPopup));
        }

    // ===========================
    // GALLERY POPUP LOGIC
    // ===========================
    const galleryLink = document.querySelector('#gallery-link');
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

            contactOverlay.innerHTML = `
                <div class="popup-card">
                    <button class="popup-close-btn">&times;</button>
                    <p class="fallback-msg">Loading gallery...</p>
                </div>`;
            contactOverlay.classList.remove('hidden');

            try {
                const data = await fetchJson('gallery');
                if (!Array.isArray(data) || data.length === 0) {
                    contactOverlay.innerHTML = `
                        <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>No gallery images available.</p>
                        </div>`;
                    attachGalleryCloseHandler();
                    return;
                }

                const randomized = data.sort(() => Math.random() - 0.5);

                contactOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <h2 class="popup-title">Gallery</h2>
                        <div class="popup-gallery-container" style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;">
                            ${randomized.map(img => `<img src="${img.image}" class="popup-gallery-image"/>`).join('')}
                        </div>
                    </div>`;
                attachGalleryCloseHandler();

                const galleryContainer = document.querySelector('.popup-gallery-container');
                galleryContainer.addEventListener('click', (e) => {
                    const clicked = e.target.closest('.popup-gallery-image');
                    if (!clicked) return;
                    fullscreenImg.src = clicked.src;
                    fullscreenOverlay.classList.remove('hidden');
                });
            } catch (err) {
                console.error(err);
                contactOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load gallery.</p>
                    </div>`;
                attachGalleryCloseHandler();
            }
        });

        function attachGalleryCloseHandler() {
            const closeBtn = contactOverlay.querySelector('.popup-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    contactOverlay.innerHTML = '';
                });
            }
        }
    }

    // ===========================
    // GENERIC FETCH-BASED POPUPS
    // ===========================
    function setupFetchPopup({ triggerId, endpoint, mapData, fallbackMessage = 'No content available.', title = '' }) {
        const trigger = document.querySelector(`#${triggerId}`);
        if (!trigger || !contactOverlay) return;

        trigger.addEventListener('click', async (e) => {
            e.preventDefault();
            contactOverlay.innerHTML = `
                <div class="popup-card">
                    <button class="popup-close-btn">&times;</button>
                    <p class="fallback-msg">Loading...</p>
                </div>`;
            contactOverlay.classList.remove('hidden');

            try {
                const data = await fetchJson(endpoint);
                if (!Array.isArray(data) || data.length === 0) {
                    contactOverlay.innerHTML = `
                        <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>${fallbackMessage}</p>
                        </div>`;
                    attachCloseHandler();
                    return;
                }

                const contentHTML = mapData(data);
                contactOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        ${title ? `<h2 class="popup-title">${title}</h2>` : ''}
                        ${contentHTML}
                    </div>`;
                attachCloseHandler();
            } catch (err) {
                console.error(err);
                contactOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load content.</p>
                    </div>`;
                attachCloseHandler();
            }
        });

        function attachCloseHandler() {
            const closeBtn = contactOverlay.querySelector('.popup-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    contactOverlay.innerHTML = '';
                });
            }
        }
    }

    // ===========================
    // EXAMPLE DYNAMIC POPUPS
    // ===========================
    setupFetchPopup({
        triggerId: 'explore-more-btn',
        endpoint: 'exploreMore',
        mapData: data => data.map(item => `
            <div class="explore-item">
                <img src="${item.image}" alt="${item.title}" class="popup-image"/>
                <h2 class="popup-title">${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `).join('')
    });

    setupFetchPopup({
        triggerId: 'explore-more-about',
        endpoint: 'aboutExplore',
        mapData: data => `
            <img src="${data[0].image}" alt="${data[0].title}" class="popup-image"/>
            <h2 class="popup-title">${data[0].title}</h2>
            <p>${data[0].description}</p>
        `
    });

    setupFetchPopup({
        triggerId: 'nav-chef',
        endpoint: 'chef',
        mapData: data => `
            <img src="${data[0].image}" alt="${data[0].title}" class="popup-image"/>
            <h2 class="popup-title">${data[0].title}</h2>
            <p>${data[0].description}</p>
        `
    });
}
