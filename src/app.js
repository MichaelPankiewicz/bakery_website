import './css/style.css';
import './css/navbar.css';
import './css/hero.css';
import './css/popup.css';
import './css/about.css';
import './css/menu.css';
import './css/news.css';
import './css/footer.css';

import './js/global.js';
import './js/navigation.js';
import './js/popup.js';
import './js/animation.js';
import './js/form.js';
import './js/menu-cards.js';

import { setupBakeryItems } from './js/hero-menu.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.setupGlobal) window.setupGlobal();
    if (window.setupNavigation) window.setupNavigation();
    if (window.setupPopups) window.setupPopups();
    if (window.setupAnimations) window.setupAnimations();
    if (window.setupForm) window.setupForm();
    if (window.setupMenuCards) window.setupMenuCards();

    // ✅ Call imported function directly
    setupBakeryItems();
});
