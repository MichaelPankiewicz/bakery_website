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
import './js/popup.js';
import './js/animation.js';
import './js/form.js';
import './js/menu-cards.js';

document.addEventListener('DOMContentLoaded', () => {
  // updated ones
  setupScrollAnimations();
  setupBakeryItems();
  setupNavigation();

  // legacy window-based ones (still side-effect imports)
  if (window.setupPopups) window.setupPopups();
  if (window.setupAnimations) window.setupAnimations();
  if (window.setupForm) window.setupForm();
  if (window.setupMenuCards) window.setupMenuCards();
});
