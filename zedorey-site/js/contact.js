// ZEDOREY - CONTACT PAGE JS

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

document.getElementById('signupForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.innerHTML = `<p style="font-family:var(--font-ui);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-top:16px">You're on the list. ✝︎</p>`;
});
