// ZEDOREY - PRODUCTS PAGE JS

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10));

// Marquee
const marqueeEl = document.getElementById('marqueeInner');
if (marqueeEl) {
  const items = ['Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I'];
  marqueeEl.innerHTML = [...items,...items].map(t => `<span class="marquee-item">${t}<span class="cross">✝︎</span></span>`).join('');
}

let allProducts = [];

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!products.length) {
    grid.innerHTML = `<div class="products-empty">No products found</div>`;
    return;
  }
  grid.innerHTML = products.map(product => `
    <a href="product.html?handle=${product.handle}" class="product-card fade-in">
      <div class="product-img" style="background:var(--grey-dark)"></div>
      <div class="product-badge"><span class="badge-coming">Coming Soon</span></div>
      <div class="product-card-overlay">
        <div class="product-card-name">${product.title}</div>
        <div class="product-card-price">Coming Soon</div>
      </div>
    </a>`).join('');

  requestAnimationFrame(() => {
    document.querySelectorAll('.product-card.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  });
}

async function loadProducts() {
  allProducts = await getProducts(24);
  renderProducts(allProducts);
}

// Filter tabs
document.getElementById('filterTabs')?.addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const filter = tab.dataset.filter;
  if (filter === 'all') renderProducts(allProducts);
  else renderProducts(allProducts.filter(p => p.collection === filter || p.tags?.includes(filter)));
});

loadProducts();
