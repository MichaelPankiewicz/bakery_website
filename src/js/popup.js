document.addEventListener('DOMContentLoaded', () => {
    
    
    
    
// ===========================
// CONTACT US POPUP LOGIC
// ===========================
const contactBtn = document.querySelector('.contact');
const contactOverlay = document.getElementById('floating-menu-overlay');

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
        const form = document.getElementById('contact-form');
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // ✅ fixed regex
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
    let notif = document.createElement('div');
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
    // OLD Explore More popup logic (your existing one, for #explore-more-btn)
    // ===========================
    const exploreMoreBtn = document.getElementById('explore-more-btn');
    const floatingMenuOverlay = document.getElementById('floating-menu-overlay');

    if (exploreMoreBtn && floatingMenuOverlay) {
        exploreMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            fetch('http://localhost:3000/exploreMore')
                .then(res => res.json())
                .then(data => {
                    if (!Array.isArray(data) || data.length === 0) {
                        floatingMenuOverlay.innerHTML = `
                          <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>No content available at the moment. Please check back later.</p>
                          </div>`;
                        floatingMenuOverlay.classList.remove('hidden');
                        attachCloseHandler();
                        return;
                    }

                    // Create HTML for each item
                    const contentHTML = data.map(item => `
                      <div class="explore-item" style="margin-bottom: 2rem;">
                        <img src="${item.image}" alt="${item.title}" class="popup-image" />
                        <h2 class="popup-title">${item.title}</h2>
                        <p class="popup-description">${item.description}</p>
                      </div>
                    `).join('');

                    floatingMenuOverlay.innerHTML = `
                      <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        ${contentHTML}
                      </div>
                    `;

                    floatingMenuOverlay.classList.remove('hidden');
                    attachCloseHandler();
                })
                .catch(() => {
                    floatingMenuOverlay.innerHTML = `
                      <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load content. Please try again later.</p>
                      </div>`;
                    floatingMenuOverlay.classList.remove('hidden');
                    attachCloseHandler();
                });
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
// gallery popup logic (#gallery-link) - Optimized
// ===========================
const galleryLink = document.getElementById('gallery-link');

// Create fullscreen overlay once and append to body
const fullscreenOverlay = document.createElement('div');
fullscreenOverlay.className = 'fullscreen-image-overlay hidden';
fullscreenOverlay.innerHTML = `
  <div class="fullscreen-image-wrapper">
      <img src="" alt="Fullscreen view" />
      <button class="fullscreen-close-btn">&times;</button>
  </div>
`;
document.body.appendChild(fullscreenOverlay);

const fullscreenImg = fullscreenOverlay.querySelector('img');
const fullscreenCloseBtn = fullscreenOverlay.querySelector('.fullscreen-close-btn');

// Close handlers
const closeFullscreen = () => fullscreenOverlay.classList.add('hidden');
fullscreenCloseBtn.addEventListener('click', closeFullscreen);
fullscreenOverlay.addEventListener('click', e => {
    if (e.target === fullscreenOverlay) closeFullscreen();
});

if (galleryLink && floatingMenuOverlay) {
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Render skeleton popup immediately
        floatingMenuOverlay.innerHTML = `
            <div class="popup-card">
                <button class="popup-close-btn">&times;</button>
                <p class="fallback-msg">Loading gallery...</p>
            </div>
        `;
        floatingMenuOverlay.classList.remove('hidden');

        fetch('http://localhost:3000/gallery')
            .then(res => res.json())
            .then(data => {
                const popupCard = floatingMenuOverlay.querySelector('.popup-card');
                const fallback = popupCard.querySelector('.fallback-msg');
                if (fallback) fallback.remove();

                if (!Array.isArray(data) || data.length === 0) {
                    popupCard.insertAdjacentHTML('beforeend', `<p>No gallery images available.</p>`);
                    return attachGalleryCloseHandler();
                }

                // Shuffle once
                const shuffled = data.sort(() => 0.5 - Math.random());

                // Build all images at once
                const imagesHTML = shuffled.map(item => `
                    <div class="popup-gallery-item">
                        <img src="${item.image}" alt="Gallery image" class="popup-gallery-image" loading="lazy" />
                    </div>
                `).join('');

                // Single DOM write
                popupCard.innerHTML = `
                    <button class="popup-close-btn">&times;</button>
                    <h2 class="popup-title">Gallery</h2>
                    <div class="popup-gallery-container">
                        ${imagesHTML}
                    </div>
                `;

                attachGalleryCloseHandler();
            })
            .catch(() => {
                floatingMenuOverlay.innerHTML = `
                    <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load gallery. Please try again later.</p>
                    </div>
                `;
                attachGalleryCloseHandler();
            });
    });

    function attachGalleryCloseHandler() {
        const closeBtn = floatingMenuOverlay.querySelector('.popup-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                floatingMenuOverlay.classList.add('hidden');
                floatingMenuOverlay.innerHTML = '';
            }, { once: true });
        }
    }

    // Event delegation for image clicks
    floatingMenuOverlay.addEventListener('click', (e) => {
        const imgEl = e.target.closest('.popup-gallery-image');
        if (!imgEl) return;

        // Preload clicked image
        const tempImg = new Image();
        tempImg.onload = () => {
            fullscreenImg.src = imgEl.src;
            fullscreenOverlay.classList.remove('hidden');
        };
        tempImg.src = imgEl.src;
    });
}


    // ===========================
    // About Us Explore More popup logic (#explore-more-about)
    // ===========================
    const aboutExploreBtn = document.getElementById('explore-more-about');

    if (aboutExploreBtn && floatingMenuOverlay) {
        aboutExploreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            fetch('http://localhost:3000/aboutExplore')
                .then(res => res.json())
                .then(data => {
                    if (!Array.isArray(data) || data.length === 0) {
                        floatingMenuOverlay.innerHTML = `
                          <div class="popup-card">
                            <button class="popup-close-btn">&times;</button>
                            <p>No content available at the moment. Please check back later.</p>
                          </div>`;
                        floatingMenuOverlay.classList.remove('hidden');
                        attachAboutCloseHandler();
                        return;
                    }

                    // Show only first aboutExplore item for now
                    const item = data[0];

                    // The same popup markup and CSS classes as other popups
                    floatingMenuOverlay.innerHTML = `
                      <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <img src="${item.image}" alt="${item.title}" class="popup-image" />
                        <h2 class="popup-title">${item.title}</h2>
                        <p class="popup-description">${item.description}</p>
                      </div>
                    `;

                    floatingMenuOverlay.classList.remove('hidden');
                    attachAboutCloseHandler();
                })
                .catch(() => {
                    floatingMenuOverlay.innerHTML = `
                      <div class="popup-card">
                        <button class="popup-close-btn">&times;</button>
                        <p>Failed to load content. Please try again later.</p>
                      </div>`;
                    floatingMenuOverlay.classList.remove('hidden');
                    attachAboutCloseHandler();
                });
        });

        function attachAboutCloseHandler() {
            const closeBtn = floatingMenuOverlay.querySelector('.popup-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    floatingMenuOverlay.classList.add('hidden');
                    floatingMenuOverlay.innerHTML = '';
                });
            }
        }
    }



const chefNavLink = document.getElementById('nav-chef');

if (chefNavLink && floatingMenuOverlay) {
  chefNavLink.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/chef')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          floatingMenuOverlay.innerHTML = `
            <div class="popup-card">
              <button class="popup-close-btn">&times;</button>
              <p>No content available at the moment. Please check back later.</p>
            </div>`;
          floatingMenuOverlay.classList.remove('hidden');
          attachChefCloseHandler();
          return;
        }

        const item = data[0]; // Assuming we only want to show the first chef item

        floatingMenuOverlay.innerHTML = `
          <div class="popup-card">
            <button class="popup-close-btn">&times;</button>
            <img src="${item.image}" alt="${item.title}" class="popup-image" />
            <h2 class="popup-title">${item.title}</h2>
            <p class="popup-description">${item.description}</p>
          </div>
        `;

        floatingMenuOverlay.classList.remove('hidden');
        attachChefCloseHandler();
      })
      .catch(() => {
        floatingMenuOverlay.innerHTML = `
          <div class="popup-card">
            <button class="popup-close-btn">&times;</button>
            <p>Failed to load content. Please try again later.</p>
          </div>`;
        floatingMenuOverlay.classList.remove('hidden');
        attachChefCloseHandler();
      });
  });

  function attachChefCloseHandler() {
    const closeBtn = floatingMenuOverlay.querySelector('.popup-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        floatingMenuOverlay.classList.add('hidden');
        floatingMenuOverlay.innerHTML = '';
      });
    }
  }
}



});