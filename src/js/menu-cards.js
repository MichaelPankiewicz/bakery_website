// menu-cards.js
// Menu card click and detail popup logic

document.addEventListener('DOMContentLoaded', () => {
    const menuCards = document.querySelectorAll('.menu-card');
    const floatingMenuOverlay = document.querySelector('#floating-menu-overlay');
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent.trim();
            fetch('http://localhost:3000/menuHighlights')
                .then(res => res.json())
                .then(data => {
                    const match = data.find(item => item.title === title);
                    if (match) {
                        // Show popup logic here
                    }
                })
                .catch(err => console.error('Error fetching popup data:', err));
        });
    });
});
