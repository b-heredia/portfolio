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

// Boot-up intro overlay
const bootOverlay = document.getElementById('boot-overlay');
if (bootOverlay) {
  const bootDuration = prefersReducedMotion ? 0 : 1200;
  setTimeout(() => bootOverlay.remove(), bootDuration);
}

// Cursor-tracking ambient glow
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && !prefersReducedMotion) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

// Comet-trail cursor
(function () {
  const canvas = document.getElementById('cometCanvas');
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext('2d');
  const colors = ['#8b6bff', '#dd1cc3', '#22d3ee'];
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 3 + 2,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (particles.length > 160) particles.splice(0, particles.length - 160);
  }, { passive: true });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * Math.max(p.life, 0), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    particles = particles.filter((p) => p.life > 0);
    requestAnimationFrame(loop);
  }
  loop();
})();

// Scroll progress bar
// Scroll progress bar
const scrollFill = document.getElementById('scrollFill');
if (scrollFill) {
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollFill.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
}

// 3D tilt on project cards
if (!prefersReducedMotion) {
  document.querySelectorAll('.project.tilt').forEach((card) => {
    card.style.transition = 'transform 0.15s ease';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Live footer clock
const liveClock = document.getElementById('liveClock');
if (liveClock) {
  function tickClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  }
  tickClock();
  setInterval(tickClock, 1000);
}

// Footer date stamp
const footerDate = document.getElementById('footerDate');
if (footerDate) {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  footerDate.textContent = `${dd}.${mm}.${now.getFullYear()}`;
}

// Ruler tick marks along the top HUD strip
const ruler = document.getElementById('ruler');
if (ruler) {
  function buildRuler() {
    const tickWidth = 42;
    const count = Math.ceil(window.innerWidth / tickWidth) + 1;
    ruler.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= count; i++) {
      const tick = document.createElement('span');
      tick.className = 'ruler-tick';
      tick.textContent = i;
      frag.appendChild(tick);
    }
    ruler.appendChild(frag);
  }
  buildRuler();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildRuler, 200);
  });
}
