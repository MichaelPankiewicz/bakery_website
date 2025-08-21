// CSS
import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/popup.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';

// JS
import { setupScrollAnimations } from './js/global.js';
import { setupBakeryItems } from './js/hero-menu.js';
import { setupNavigation } from './js/navigation.js';
import { setupPopups } from './js/popup.js'; // new modular popup
import { setupAnimations } from './js/animation.js'; // updated modular animation
import { setupForm } from './js/form.js'; // updated modular form
import './js/menu-cards.js'; // legacy side-effect import

// Optional: ensure menuHighlights is available globally
window.menuHighlights = window.menuHighlights || [
  // Example structure
  // { title: 'Fresh Ingredients', type: 'ingredients', items: ['Eggs', 'Flour', 'Milk'] },
  // { title: 'Our Gallery', type: 'gallery', items: ['img1.jpg', 'img2.jpg'] },
  // { title: 'Community Partners', type: 'community', items: ['Partner A', 'Partner B'] }
];

document.addEventListener('DOMContentLoaded', () => {
  // Updated modular setups
  setupScrollAnimations();
  setupBakeryItems();
  setupNavigation();
  setupPopups();
  setupAnimations();
  setupForm(); // <-- modular, no window needed

  // Legacy window-based side-effect setups
  if (window.setupMenuCards) window.setupMenuCards();
});
