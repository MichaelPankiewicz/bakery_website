import { showNotification } from './functions.js';

// ===========================
// Intersection Observer for scroll-reveal and scroll-fade
// ===========================
export function setupScrollAnimations() {
  const revealOptions = { threshold: 0.2, rootMargin: '0px' };
  const fadeOptions = { threshold: 0.1 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, revealOptions);

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, fadeOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.scroll-fade').forEach(el => fadeObserver.observe(el));
}
