// ZEDOREY - SINGLE PRODUCT PAGE JS

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10));

// Marquee
const marqueeEl = document.getElementById('marqueeInner');
if (marqueeEl) {
  const items = ['Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I','Zedorey','Set Apart','Vol. I'];
  marqueeEl.innerHTML = [...items,...items].map(t => `<span class="marquee-item">${t}<span class="cross">✝︎</span></span>`).join('');
}

const handle = new URLSearchParams(window.location.search).get('handle');

async function loadProduct() {
  const main = document.getElementById('productMain');
  if (!handle) {
    main.innerHTML = `<div style="padding:120px 40px;text-align:center;color:var(--grey-muted);font-family:var(--font-ui);font-size:11px;letter-spacing:0.2em;text-transform:uppercase">Product not found - <a href="products.html" style="color:var(--white)">Back to products</a></div>`;
    return;
  }

  const product = await getProduct(handle);
  if (!product) {
    main.innerHTML = `<div style="padding:120px 40px;text-align:center;color:var(--grey-muted);font-family:var(--font-ui);font-size:11px;letter-spacing:0.2em;text-transform:uppercase">Product not found - <a href="products.html" style="color:var(--white)">Back to products</a></div>`;
    return;
  }

  const isEssential = product.collection === 'essentials' || product.tags?.includes('essentials');
  const displayTitle = isEssential ? 'ZDRY Essentials' : product.title;
  const displayDesc = isEssential ? 'Part of the ZDRY Essentials line. Revealed in time.' : (product.description || '');
  const displaySpecs = isEssential ? null : product.specs;
  const placeholderLabel = isEssential ? 'Revealed Soon' : 'Designs Not Yet Revealed';

  document.title = `${displayTitle} - Zedorey`;

  // Static product (no token)
  main.innerHTML = `
    <div class="product-layout">
      <div class="product-images">
        <div class="product-images-track">
          <div class="product-image-item ${isEssential ? 'locked-image-item' : ''}" style="background:var(--grey-dark);display:flex;align-items:center;justify-content:center;">
            <div style="text-align:center;">
              <p style="font-family:var(--font-ui);font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--grey-muted)">${placeholderLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-breadcrumb">
          <a href="products.html">Products</a>
          <span>→</span>
          <span style="color:var(--grey-muted)">${displayTitle}</span>
        </div>

        <h1 class="product-title">${displayTitle}</h1>

        <div class="product-price coming-soon">Coming Soon</div>

        <div class="product-divider"></div>

        <div class="product-add">
          <a href="contact.html" class="btn-add-to-cart" style="display:block;text-align:center;text-decoration:none;line-height:1">
            Join The Drop List
          </a>
          <p class="product-add-note">Be notified the moment this drops</p>
        </div>

        <div class="product-divider"></div>

        <div class="product-description">
          <p>${displayDesc}</p>
        </div>

        <div class="product-details">
          ${displaySpecs ? `
          <div class="product-detail-row">
            <span class="detail-key">Specs</span>
            <span class="detail-val">${displaySpecs}</span>
          </div>` : ''}
          <div class="product-detail-row">
            <span class="detail-key">Availability</span>
            <span class="detail-val">${isEssential ? 'Always stocked once revealed.' : 'Limited. No restocks.'}</span>
          </div>
          <div class="product-detail-row">
            <span class="detail-key">${isEssential ? 'Reveal' : 'Drop'}</span>
            <span class="detail-val">${isEssential ? 'After Vol. I' : 'June 2026'}</span>
          </div>
        </div>

        <div style="margin-top:8px">
          <span class="section-label">II Cor XII IX</span>
        </div>
      </div>
    </div>
  `;
}

loadProduct();
