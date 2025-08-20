

window.setupMenuCards = function() {
    const menuCards = document.querySelectorAll(".menu-card");
    const floatingMenuOverlay = document.querySelector("#floating-menu-overlay");

    menuCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h4").textContent.trim();

            const baseUrl = process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : '';

            const url = process.env.NODE_ENV === 'development'
                ? `${baseUrl}/menuHighlights`
                : `${baseUrl}/api/menuHighlights`;

            fetch(url)
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
    });
}