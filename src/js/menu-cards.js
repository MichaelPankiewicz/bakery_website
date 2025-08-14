// menu-cards.js
// Optimized: caches data, avoids repeated fetches & listeners

document.addEventListener('DOMContentLoaded', () => {
    const menuCards = document.querySelectorAll(".menu-card");
    const floatingMenuOverlay = document.querySelector("#floating-menu-overlay");

    let menuData = null;

    // Fetch once and cache
    const fetchMenuData = async () => {
        if (!menuData) {
            try {
                const res = await fetch("http://localhost:3000/menuHighlights");
                menuData = await res.json();
            } catch (err) {
                console.error("Error fetching popup data:", err);
                return [];
            }
        }
        return menuData;
    };

    // Open popup
    const openPopup = async (title) => {
        const data = await fetchMenuData();
        const match = data.find(item => item.title === title);
        if (!match) return;

        // Prepare button & expandable content
        let buttonHTML = "";
        let expandableHTML = "";

        if (match.type === "ingredients") {
            buttonHTML = `<button class="popup-expand-btn">Show Ingredients</button>`;
            expandableHTML = `<ul class="popup-expand-list hidden">
                ${match.ingredients.map(ing => `<li><strong>${ing.name}:</strong> ${ing.description}</li>`).join("")}
            </ul>`;
        } else if (match.type === "products" || match.type === "gallery") {
            buttonHTML = `<button class="popup-expand-btn">View ${match.type === 'products' ? 'Products' : 'Gallery'}</button>`;
            expandableHTML = `<div class="popup-expand-list popup-gallery hidden"></div>`; // load on demand
        } else if (match.type === "community") {
            expandableHTML = `<div class="popup-expand-list">
                ${match.partners.map(p => `<p><a href="${p.link}" target="_blank">${p.name}</a></p>`).join("")}
            </div>`;
        }

        // Inject content
        floatingMenuOverlay.innerHTML = `
            <div class="popup-card">
                <button class="popup-close-btn">&times;</button>
                <img src="${match.image}" alt="${match.title}" class="popup-image">
                <h2 class="popup-title">${match.title}</h2>
                <p class="popup-description">${match.description}</p>
                ${buttonHTML}
                ${expandableHTML}
            </div>
        `;
        floatingMenuOverlay.classList.remove("hidden");

        // Close button
        const closeBtn = floatingMenuOverlay.querySelector(".popup-close-btn");
        closeBtn.addEventListener("click", () => {
            floatingMenuOverlay.classList.add("hidden");
            floatingMenuOverlay.innerHTML = "";
        });

        // Expandable button logic
        const expandBtn = floatingMenuOverlay.querySelector(".popup-expand-btn");
        const expandList = floatingMenuOverlay.querySelector(".popup-expand-list");

        if (expandBtn && expandList) {
            expandBtn.addEventListener("click", () => {
                if ((match.type === "products" || match.type === "gallery") && expandList.innerHTML === "") {
                    // Lazy-load images
                    expandList.innerHTML = match.products.map(p => `<img src="${p}" class="popup-product-image" alt="Product">`).join("");
                }
                expandList.classList.toggle("hidden");
            });
        }
    };

    // Add click listeners
    menuCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h4").textContent.trim();
            openPopup(title);
        });
    });
});
