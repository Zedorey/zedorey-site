// ZEDOREY - ABOUT PAGE JS

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Fade in
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// Marquee
function buildMarquee(id, reverse = false) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = ['Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I'];
  const doubled = [...items, ...items];
  el.innerHTML = doubled.map(t => `<span class="marquee-item">${t}<span class="cross">✝︎</span></span>`).join('');
  if (reverse) el.style.animationDirection = 'reverse';
}
buildMarquee('marqueeInner');
buildMarquee('marqueeInner2', true);

// Email signup
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.innerHTML = `<p style="font-family:var(--font-ui);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent)">You're on the list. ✝︎</p>`;
});
