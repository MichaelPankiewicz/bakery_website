// src/js/popup.js
import { fetchJson, showNotification, validateEmail, validateField, getApiUrl } from './functions.js';

export function setupPopups() {
    const contactOverlay = document.querySelector('#floating-menu-overlay');

    // ===========================
    // CONTACT POPUP
    // ===========================
    const contactBtn = document.querySelector('.contact');
    if (contactBtn && contactOverlay) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Maak popup-card
            const popupCard = document.createElement('div');
            popupCard.className = 'popup-card contact-form-card';

            // Sluitknop
            const closeBtn = document.createElement('button');
            closeBtn.className = 'popup-close-btn';
            closeBtn.textContent = '×';
            popupCard.appendChild(closeBtn);

            // Titel
            const h2 = document.createElement('h2');
            h2.className = 'popup-title';
            h2.textContent = 'Contact Us';
            popupCard.appendChild(h2);

            // Formulier
            const form = document.createElement('form');
            form.id = 'contact-form';
            form.noValidate = true;

            const createInputField = (labelText, type, id, placeholder) => {
                const label = document.createElement('label');
                label.setAttribute('for', id);
                label.textContent = labelText;

                const input = type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
                if (type !== 'textarea') input.type = type;
                input.id = id;
                input.name = id.split('-')[1];
                input.placeholder = placeholder;
                input.required = true;

                form.appendChild(label);
                form.appendChild(input);

                return input;
            };

            const nameInput = createInputField('Name', 'text', 'contact-name', 'Your name');
            const emailInput = createInputField('Email', 'email', 'contact-email', 'your@email.com');
            const messageInput = createInputField('Message', 'textarea', 'contact-message', 'Your message');

            // Submit button
            const submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.className = 'popup-expand-btn';
            submitBtn.textContent = 'Send';
            form.appendChild(submitBtn);

            popupCard.appendChild(form);

            // Voeg popup toe aan overlay
            while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
            contactOverlay.appendChild(popupCard);
            contactOverlay.classList.remove('hidden');

            // Sluitknop functionaliteit
            closeBtn.addEventListener('click', () => {
                contactOverlay.classList.add('hidden');
                while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
            });

            // Validatie
            [nameInput, emailInput, messageInput].forEach(input => {
                input.addEventListener('input', () => validateField(input));
            });

            // Form submit
            form.addEventListener('submit', async (ev) => {
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
                        while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);

                        if (typeof setupContactCRUD !== 'undefined') {
                            document.dispatchEvent(new Event('contactUpdated'));
                        }
                    } catch (err) {
                        showNotification('Failed to send message.');
                        console.error(err);
                    }
                }
            });
        });
    }

    // ===========================
    // GALLERY POPUP
    // ===========================
    const galleryLink = document.querySelector('#gallery-link');
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'fullscreen-image-overlay hidden';
    const fullscreenWrapper = document.createElement('div');
    fullscreenWrapper.className = 'fullscreen-image-wrapper';
    const fullscreenImg = document.createElement('img');
    fullscreenImg.alt = 'Fullscreen view';
    const fullscreenCloseBtn = document.createElement('button');
    fullscreenCloseBtn.className = 'fullscreen-close-btn';
    fullscreenCloseBtn.setAttribute('aria-label', 'Close');
    fullscreenCloseBtn.textContent = '×';
    fullscreenWrapper.appendChild(fullscreenImg);
    fullscreenWrapper.appendChild(fullscreenCloseBtn);
    fullscreenOverlay.appendChild(fullscreenWrapper);
    document.body.appendChild(fullscreenOverlay);

    const closeFullscreen = () => {
        fullscreenOverlay.classList.add('hidden');
        fullscreenImg.src = '';
    };

    fullscreenCloseBtn.addEventListener('click', closeFullscreen);
    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) closeFullscreen();
    });

    if (galleryLink && contactOverlay) {
        galleryLink.addEventListener('click', async (e) => {
            e.preventDefault();

            while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);

            const popupCard = document.createElement('div');
            popupCard.className = 'popup-card';
            const closeBtn = document.createElement('button');
            closeBtn.className = 'popup-close-btn';
            closeBtn.textContent = '×';
            popupCard.appendChild(closeBtn);

            const loadingMsg = document.createElement('p');
            loadingMsg.className = 'fallback-msg';
            loadingMsg.textContent = 'Loading gallery...';
            popupCard.appendChild(loadingMsg);

            contactOverlay.appendChild(popupCard);
            contactOverlay.classList.remove('hidden');

            closeBtn.addEventListener('click', () => {
                contactOverlay.classList.add('hidden');
                while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
            });

            try {
                const data = await fetchJson('gallery');
                while (popupCard.firstChild) popupCard.removeChild(popupCard.firstChild);

                const closeBtn2 = document.createElement('button');
                closeBtn2.className = 'popup-close-btn';
                closeBtn2.textContent = '×';
                popupCard.appendChild(closeBtn2);

                closeBtn2.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
                });

                if (!Array.isArray(data) || data.length === 0) {
                    const msg = document.createElement('p');
                    msg.textContent = 'No gallery images available.';
                    popupCard.appendChild(msg);
                    return;
                }

                const title = document.createElement('h2');
                title.className = 'popup-title';
                title.textContent = 'Gallery';
                popupCard.appendChild(title);

                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'popup-gallery-container';
                galleryContainer.style.display = 'grid';
                galleryContainer.style.gridTemplateColumns = 'repeat(6,1fr)';
                galleryContainer.style.gap = '10px';

                const randomized = data.sort(() => Math.random() - 0.5);
                randomized.forEach(imgData => {
                    const img = document.createElement('img');
                    img.src = imgData.image;
                    img.className = 'popup-gallery-image';
                    img.addEventListener('click', () => {
                        fullscreenImg.src = img.src;
                        fullscreenOverlay.classList.remove('hidden');
                    });
                    galleryContainer.appendChild(img);
                });

                popupCard.appendChild(galleryContainer);
            } catch (err) {
                console.error(err);
                while (popupCard.firstChild) popupCard.removeChild(popupCard.firstChild);
                const closeBtn3 = document.createElement('button');
                closeBtn3.className = 'popup-close-btn';
                closeBtn3.textContent = '×';
                popupCard.appendChild(closeBtn3);
                const msg = document.createElement('p');
                msg.textContent = 'Failed to load gallery.';
                popupCard.appendChild(msg);

                closeBtn3.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
                });
            }
        });
    }

    // ===========================
    // FETCH-BASED DYNAMIC POPUPS
    // ===========================
    function setupFetchPopup({ triggerId, endpoint, mapData, fallbackMessage = 'No content available.', title = '' }) {
        const trigger = document.querySelector(`#${triggerId}`);
        if (!trigger || !contactOverlay) return;

        trigger.addEventListener('click', async (e) => {
            e.preventDefault();

            while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
            const popupCard = document.createElement('div');
            popupCard.className = 'popup-card';
            const closeBtn = document.createElement('button');
            closeBtn.className = 'popup-close-btn';
            closeBtn.textContent = '×';
            popupCard.appendChild(closeBtn);
            const loadingMsg = document.createElement('p');
            loadingMsg.className = 'fallback-msg';
            loadingMsg.textContent = 'Loading...';
            popupCard.appendChild(loadingMsg);
            contactOverlay.appendChild(popupCard);
            contactOverlay.classList.remove('hidden');

            closeBtn.addEventListener('click', () => {
                contactOverlay.classList.add('hidden');
                while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
            });

            try {
                const data = await fetchJson(endpoint);
                while (popupCard.firstChild) popupCard.removeChild(popupCard.firstChild);
                const closeBtn2 = document.createElement('button');
                closeBtn2.className = 'popup-close-btn';
                closeBtn2.textContent = '×';
                popupCard.appendChild(closeBtn2);

                closeBtn2.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
                });

                if (!Array.isArray(data) || data.length === 0) {
                    const msg = document.createElement('p');
                    msg.textContent = fallbackMessage;
                    popupCard.appendChild(msg);
                    return;
                }

                if (title) {
                    const h2 = document.createElement('h2');
                    h2.className = 'popup-title';
                    h2.textContent = title;
                    popupCard.appendChild(h2);
                }

                const contentElements = mapData(data);
                if (Array.isArray(contentElements)) {
                    contentElements.forEach(el => popupCard.appendChild(el));
                } else if (contentElements instanceof HTMLElement) {
                    popupCard.appendChild(contentElements);
                }
            } catch (err) {
                console.error(err);
                while (popupCard.firstChild) popupCard.removeChild(popupCard.firstChild);
                const closeBtn3 = document.createElement('button');
                closeBtn3.className = 'popup-close-btn';
                closeBtn3.textContent = '×';
                popupCard.appendChild(closeBtn3);
                const msg = document.createElement('p');
                msg.textContent = 'Failed to load content.';
                popupCard.appendChild(msg);

                closeBtn3.addEventListener('click', () => {
                    contactOverlay.classList.add('hidden');
                    while (contactOverlay.firstChild) contactOverlay.removeChild(contactOverlay.firstChild);
                });
            }
        });
    }

    // ===========================
    // EXAMPLES OF DYNAMIC POPUPS
    // ===========================
    const createExploreItem = (item) => {
        const container = document.createElement('div');
        container.className = 'explore-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.className = 'popup-image';
        container.appendChild(img);

        const h2 = document.createElement('h2');
        h2.className = 'popup-title';
        h2.textContent = item.title;
        container.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = item.description;
        container.appendChild(p);

        return container;
    };

    setupFetchPopup({
        triggerId: 'explore-more-btn',
        endpoint: 'exploreMore',
        mapData: data => data.map(createExploreItem)
    });

    setupFetchPopup({
        triggerId: 'explore-more-about',
        endpoint: 'aboutExplore',
        mapData: data => createExploreItem(data[0])
    });

    setupFetchPopup({
        triggerId: 'nav-chef',
        endpoint: 'chef',
        mapData: data => createExploreItem(data[0])
    });
}
