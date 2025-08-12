// misc.js
// Miscellaneous code (e.g., startup overlay fade out)

window.addEventListener('load', () => {
    const overlay = document.getElementById('startup-overlay');
    if (overlay) setTimeout(() => overlay.style.display = 'none', 3500);
});
