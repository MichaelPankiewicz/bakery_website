import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/popup.css';
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
// gallery popup logic (#gallery-link)
// ===========================
const galleryLink = document.getElementById('gallery-link');

if (galleryLink && floatingMenuOverlay) {
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();

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
                    popupCard.innerHTML += `<p>No gallery images available at the moment. Please check back later.</p>`;
                    attachGalleryCloseHandler();
                    return;
                }

                // Keep random order but show ALL images
                const shuffled = data.sort(() => 0.5 - Math.random());

                // Create HTML for images
                const imagesHTML = shuffled.map(item => `
                    <div class="popup-gallery-item">
                        <img src="${item.image}" alt="Gallery image" class="popup-gallery-image" />
                    </div>
                `).join('');

                popupCard.innerHTML = `
                    <button class="popup-close-btn">&times;</button>
                    <h2 class="popup-title">Gallery</h2>
                    <div class="popup-gallery-container">
                        ${imagesHTML}
                    </div>
                `;

                attachGalleryCloseHandler();
                attachGalleryImageClickHandler();
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
            });
        }
    }

    // Image click to open fullscreen preview
    function attachGalleryImageClickHandler() {
        const images = floatingMenuOverlay.querySelectorAll('.popup-gallery-image');
        images.forEach(img => {
            img.addEventListener('click', () => {
                const fullscreen = document.createElement('div');
                fullscreen.classList.add('fullscreen-image-overlay');
                fullscreen.innerHTML = `
                    <div class="fullscreen-image-wrapper">
                        <img src="${img.src}" alt="Fullscreen view" />
                        <button class="fullscreen-close-btn">&times;</button>
                    </div>
                `;
                document.body.appendChild(fullscreen);

                fullscreen.querySelector('.fullscreen-close-btn').addEventListener('click', () => {
                    fullscreen.remove();
                });

                fullscreen.addEventListener('click', (e) => {
                    if (e.target === fullscreen) fullscreen.remove();
                });
            });
        });
    }
}


    // ===========================
    // FIXED About Us Explore More popup logic (#explore-more-about)
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

                    // Use exactly the same popup markup and CSS classes as other popups
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

        const item = data[0]; // show only first chef for now

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



}); // end DOMContentLoaded

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
// Startup overlay
window.addEventListener('load', () => {
    const overlay = document.getElementById('startup-overlay');
    if (overlay) setTimeout(() => overlay.style.display = 'none', 3500);
});
// Burger menu
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
        if (window.scrollY > 10) headerScroll.classList.add('scrolled');
        else headerScroll.classList.remove('scrolled');
    });
}



// MENU CARDS POPUP
const menuCards = document.querySelectorAll(".menu-card");
const floatingMenuOverlay = document.querySelector("#floating-menu-overlay");

menuCards.forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h4").textContent.trim();

        fetch("http://localhost:3000/menuHighlights")
            .then(res => res.json())
            .then(data => {
                const match = data.find(item => item.title === title);
                if (match) {
                    let expandableContent = "";
                    let buttonHTML = "";

                    if (match.type === "ingredients") {
                        buttonHTML = '<button class="popup-expand-btn">Show Ingredients</button>';
                        expandableContent = `
                <ul class="popup-expand-list hidden">
                  ${match.ingredients.map(ing => `<li><strong>${ing.name}:</strong> ${ing.description}</li>`).join("")}
                </ul>
              `;
                    } else if (match.type === "products" || match.type === "gallery") {
                        buttonHTML = `<button class="popup-expand-btn">View ${match.type === 'products' ? 'Products' : 'Gallery'}</button>`;
                        expandableContent = `
                <div class="popup-expand-list popup-gallery hidden">
                  ${match.products.map(p => `<img src="${p}" class="popup-product-image" alt="Product">`).join("")}
                </div>
              `;
                    } else if (match.type === "community") {
                        expandableContent = `
                <div class="popup-expand-list">
                  ${match.partners.map(p => `<p><a href="${p.link}" target="_blank">${p.name}</a></p>`).join("")}
                </div>
              `;
                    }

                    floatingMenuOverlay.innerHTML = `
              <div class="popup-card">
                <button class="popup-close-btn">&times;</button>
                <img src="${match.image}" alt="${match.title}" class="popup-image">
                <h2 class="popup-title">${match.title}</h2>
                <p class="popup-description">${match.description}</p>
                ${buttonHTML}
                ${expandableContent}
              </div>
            `;
                    floatingMenuOverlay.classList.remove("hidden");

                    document.querySelector(".popup-close-btn").addEventListener("click", () => {
                        floatingMenuOverlay.classList.add("hidden");
                        floatingMenuOverlay.innerHTML = "";
                    });

                    const expandBtn = document.querySelector(".popup-expand-btn");
                    const expandList = document.querySelector(".popup-expand-list");
                    if (expandBtn && expandList) {
                        expandBtn.addEventListener("click", () => {
                            expandList.classList.toggle("hidden");
                        });
                    }
                }
            })
            .catch(err => console.error("Error fetching popup data:", err));
    });

document.addEventListener('DOMContentLoaded', () => {
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
    try {
      const response = await fetch('http://localhost:3000/topMenu');
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
    
    priceEl.textContent = item.price ? `Price: ${item.price}` : ''; // <-- new line
    
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

});