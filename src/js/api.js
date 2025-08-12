// api.js
// All API fetch calls

export function fetchMenuItems(container) {
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
