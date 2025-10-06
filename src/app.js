// CSS
import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/popup.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';
import './css/crud.css';
import './css/contact-crud.css';

// JS
import { setupScrollAnimations } from './js/global.js';
import { setupBakeryItems } from './js/hero-menu.js';
import { setupNavigation } from './js/navigation.js';
import { setupPopups } from './js/popup.js';
import { setupAnimations } from './js/animation.js';
import { setupForm } from './js/form.js';
import { setupMenuCards } from './js/menu-cards.js';
import { setupCrud } from './js/crud.js'; 
import { setupContactCRUD } from './js/contact-crud.js';


document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupBakeryItems();
  setupNavigation();
  setupPopups();
  setupAnimations();
  setupForm();
  setupMenuCards();
  setupCrud(); // 👈 runs only on /crud
  setupContactCRUD();
});
