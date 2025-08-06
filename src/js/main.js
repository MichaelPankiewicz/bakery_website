const container = document.getElementById('favorites');




// Scroll-based reveal animation
// scrollAnimations.js
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // allows repeated animation
      }
    });
  }, options);

  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".scroll-fade");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // allows repeat
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el) => observer.observe(el));
});
