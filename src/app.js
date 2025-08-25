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
import { setupMenuCards } from './js/menu-cards.js'; // modular import


document.addEventListener('DOMContentLoaded', () => {
  // Updated modular setups
  setupScrollAnimations();
  setupBakeryItems();
  setupNavigation();
  setupPopups();
  setupAnimations();
  setupForm();
  setupMenuCards(); // <-- modular now, no window reference needed
});
