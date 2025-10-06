import { fetchJson, createElementWithClass, clearElement, toggleClass } from './functions.js';

/**
 * Refactor: innerHTML volledig vervangen door veilige DOM-manipulatie.
 * Alle rendering gebeurt nu met createElement, appendChild, textContent, classList, enz.
 */
export function setupMenuCards() {
    const menuCards = document.querySelectorAll('.menu-card');
    const floatingMenuOverlay = document.querySelector('#floating-menu-overlay');

    menuCards.forEach(card => {
        card.addEventListener('click', async () => {
            const title = card.querySelector('h4').textContent.trim();
            try {
                // ✅ fetch from backend (via functions.js)
                const data = await fetchJson('menuHighlights');
                console.log("Loaded menuHighlights from backend:", data);

                const match = data.find(item => item.title === title);
                if (match) {
                    // Maak popup-card
                    const popupCard = document.createElement('div');
                    popupCard.className = 'popup-card';

                    // Sluitknop
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'popup-close-btn';
                    closeBtn.textContent = '×';

                    // Afbeelding
                    const img = document.createElement('img');
                    img.src = match.image;
                    img.alt = match.title;
                    img.className = 'popup-image';

                    // Titel
                    const h2 = document.createElement('h2');
                    h2.className = 'popup-title';
                    h2.textContent = match.title;

                    // Beschrijving
                    const desc = document.createElement('p');
                    desc.className = 'popup-description';
                    desc.textContent = match.description;

                    // Uitklapbare content
                    let expandBtn = null;
                    let expandList = null;

                    if (match.type === 'ingredients') {
                        expandBtn = document.createElement('button');
                        expandBtn.className = 'popup-expand-btn';
                        expandBtn.textContent = 'Show Ingredients';

                        expandList = document.createElement('ul');
                        expandList.className = 'popup-expand-list hidden';
                        match.ingredients.forEach(ing => {
                            const li = document.createElement('li');
                            const strong = document.createElement('strong');
                            strong.textContent = ing.name + ':';
                            li.appendChild(strong);
                            li.appendChild(document.createTextNode(' ' + ing.description));
                            expandList.appendChild(li);
                        });
                    } else if (match.type === 'products' || match.type === 'gallery') {
                        expandBtn = document.createElement('button');
                        expandBtn.className = 'popup-expand-btn';
                        expandBtn.textContent = `View ${match.type === 'products' ? 'Products' : 'Gallery'}`;

                        expandList = document.createElement('div');
                        expandList.className = 'popup-expand-list popup-gallery hidden';
                        match.products.forEach(p => {
                            const imgEl = document.createElement('img');
                            imgEl.src = p;
                            imgEl.className = 'popup-product-image';
                            imgEl.alt = 'Product';
                            expandList.appendChild(imgEl);
                        });
                    } else if (match.type === 'community') {
                        expandList = document.createElement('div');
                        expandList.className = 'popup-expand-list';
                        match.partners.forEach(p => {
                            const pEl = document.createElement('p');
                            const a = document.createElement('a');
                            a.href = p.link;
                            a.target = '_blank';
                            a.textContent = p.name;
                            pEl.appendChild(a);
                            expandList.appendChild(pEl);
                        });
                    }

                    // Voeg alles toe aan popupCard
                    popupCard.appendChild(closeBtn);
                    popupCard.appendChild(img);
                    popupCard.appendChild(h2);
                    popupCard.appendChild(desc);
                    if (expandBtn) popupCard.appendChild(expandBtn);
                    if (expandList) popupCard.appendChild(expandList);

                    // Maak overlay leeg en voeg popupCard toe
                    clearElement(floatingMenuOverlay);
                    floatingMenuOverlay.appendChild(popupCard);
                    floatingMenuOverlay.classList.remove('hidden');

                    // Event handlers
                    closeBtn.addEventListener('click', () => {
                        floatingMenuOverlay.classList.add('hidden');
                        clearElement(floatingMenuOverlay);
                    });

                    if (expandBtn && expandList) {
                        expandBtn.addEventListener('click', () => {
                            toggleClass(expandList, 'hidden');
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching popup data:', err);
            }
        });
    });
}