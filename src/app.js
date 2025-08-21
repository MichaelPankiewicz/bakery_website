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
import './js/animation.js'; // legacy side-effect import
import './js/form.js';      // legacy side-effect import
import './js/menu-cards.js'; // legacy side-effect import

// Optional: ensure menuHighlights is available globally
// Replace this with your actual fetch/import if needed
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
  setupPopups(); // <-- fully functional modular popup

  // Legacy window-based side-effect setups
  if (window.setupAnimations) window.setupAnimations();
  if (window.setupForm) window.setupForm();
  if (window.setupMenuCards) window.setupMenuCards();
});
