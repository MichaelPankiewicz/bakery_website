export function setupBakeryItems() {
    const menuButton = document.querySelector('.open-menu-btn');
    const menuContainer = document.querySelector('.dynamic-menu');

    if (!menuButton || !menuContainer) return;

    let isVisible = false;

    async function fetchBakeryItems(container) {
        container.innerHTML = '';

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-menu-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.addEventListener('click', () => {
            container.classList.add('hidden');
            isVisible = false;
        });
        container.appendChild(closeBtn);

        // Fallback
        const fallback = document.createElement('p');
        fallback.className = 'fallback-msg';
        fallback.textContent = 'Loading menu...';
        container.appendChild(fallback);

        try {
            const baseUrl = process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "";

            const url = process.env.NODE_ENV === "development"
                ? `${baseUrl}/bakeryItems`
                : `${baseUrl}/api/bakeryItems`;

            const res = await fetch(url);
            const items = await res.json();

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

        } catch (err) {
            console.error("Error fetching bakery items:", err);
            fallback.textContent = 'Failed to load menu. Please try again later.';
        }
    }

    menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        menuContainer.classList.toggle('hidden');
        isVisible = !isVisible;

        if (isVisible) {
            fetchBakeryItems(menuContainer);
        }
    });
}
