// navigation.js
// Navigation and hamburger menu logic

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('#burger-toggle');
    const nav = document.querySelector('header nav');
    const headerScroll = document.querySelector('header');
    if (burger && nav && headerScroll) {
        const toggleMenu = () => {
            const expanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', String(!expanded));
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            headerScroll.classList.toggle('mobile-nav-open');
        };
        burger.addEventListener('click', toggleMenu);
        burger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                headerScroll.classList.add('scrolled');
            } else {
                headerScroll.classList.remove('scrolled');
            }
        });
    }
});
