// ZEDOREY — HOME PAGE JS

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Fade in observer
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
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

// Load ZDRY essentials only (not the drop hoodie)
async function loadProducts() {
  const grid = document.getElementById('productsGrid');
  const allProducts = await getProducts();
  const essentials = allProducts.filter(p =>
    p.collection === 'essentials' || p.tags?.includes('essentials') || p.id?.includes('zdry')
  );

  grid.innerHTML = essentials.map(product => `
    <a href="pages/product.html?handle=${product.handle}" class="product-card locked-card">
      <div class="product-img locked-img"></div>
      <div class="product-badge"><span class="badge-coming">Coming Soon</span></div>
      <div class="product-card-overlay">
        <div class="product-card-name">ZDRY Essentials</div>
        <div class="product-card-price">Revealed Soon</div>
      </div>
    </a>`).join('');
}

loadProducts();

// Email signup
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.innerHTML = `<p style="font-family:var(--font-ui);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent)">You're on the list. ✝︎</p>`;
});
