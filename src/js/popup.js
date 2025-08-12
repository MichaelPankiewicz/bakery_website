// popup.js
// All popup/modal handling logic

document.addEventListener('DOMContentLoaded', () => {
    // Contact Us popup
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
            const closeBtn = contactOverlay.querySelector('.popup-close-btn');
            closeBtn.addEventListener('click', () => {
                contactOverlay.classList.add('hidden');
                contactOverlay.innerHTML = '';
            });
        });
    }
    // Explore More popup
    const exploreMoreBtn = document.getElementById('explore-more-btn');
    const floatingMenuOverlay = document.getElementById('floating-menu-overlay');
    if (exploreMoreBtn && floatingMenuOverlay) {
        exploreMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // API fetch logic is in api.js
        });
    }
    // Gallery popup
    const galleryLink = document.getElementById('gallery-link');
    if (galleryLink && floatingMenuOverlay) {
        galleryLink.addEventListener('click', (e) => {
            e.preventDefault();
            // API fetch logic is in api.js
        });
    }
    // About Us Explore More popup
    const aboutExploreBtn = document.getElementById('explore-more-about');
    if (aboutExploreBtn && floatingMenuOverlay) {
        aboutExploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // API fetch logic is in api.js
        });
    }
    // Chef nav link popup
    const chefNavLink = document.getElementById('nav-chef');
    if (chefNavLink && floatingMenuOverlay) {
        chefNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            // API fetch logic is in api.js
        });
    }
});
