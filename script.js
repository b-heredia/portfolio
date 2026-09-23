// Typing effect for the hero tagline
const phrases = [
  "Aspiring Software Developer",
  "Exploring AI + Creative Code",
  "i.c.stars"
];
 
const typedEl = document.getElementById('typed');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
function typeLoop() {
  if (!typedEl) return;
 
  if (prefersReducedMotion) {
    typedEl.textContent = phrases[0];
    return;
  }
 
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
 
  function tick() {
    const current = phrases[phraseIndex];
 
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
 
    setTimeout(tick, deleting ? 35 : 65);
  }
 
  tick();
}
 
typeLoop();
 
// Fade-in sections on scroll
const revealEls = document.querySelectorAll('.reveal');
 
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
 
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}
 
