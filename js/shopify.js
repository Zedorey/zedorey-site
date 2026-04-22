// ─────────────────────────────────────────
// ZEDOREY - SHOPIFY CONFIG
// Token goes here when ready to go live
// ─────────────────────────────────────────
const SHOPIFY_CONFIG = {
  storeDomain: 'zedorey.myshopify.com',
  storefrontToken: null, // ← paste token here when ready
  apiVersion: '2024-01',
  storeUrl: 'https://zedorey.com'
};

// ─────────────────────────────────────────
// STATIC PRODUCTS
// Update these when designs are revealed
// ─────────────────────────────────────────
const STATIC_PRODUCTS = [
  {
    id: 'drop-hoodie',
    handle: 'set-apart-vol-i-heavyweight-hoodie',
    title: 'SET APART - VOL. I HEAVYWEIGHT HOODIE',
    collection: 'drop',
    availableForSale: false,
    comingSoon: true,
    price: null,
    image: null,
    specs: '420gsm · Drop Shoulder · Deep True Black',
    description: 'The first piece from Set Apart Vol. I. The Baldwin figure carries the print - illustrated, raw, unmistakable. One hand raised. Robes heavy. A man in the middle of something - not at the end of it.',
    tags: ['drop', 'vol-i', 'set-apart']
  },
  {
    id: 'zdry-hoodie',
    handle: 'zdry-essentials-heavyweight-hoodie',
    title: 'ZDRY ESSENTIALS - HEAVYWEIGHT HOODIE',
    collection: 'essentials',
    availableForSale: false,
    comingSoon: true,
    price: null,
    image: null,
    specs: '420gsm · Drop Shoulder · Premium Cotton',
    description: 'Built to last. Worn with intention. The ZDRY Essentials Hoodie is the foundation - heavyweight construction that holds its shape and earns its place.',
    tags: ['essentials', 'zdry']
  },
  {
    id: 'zdry-tee',
    handle: 'zdry-essentials-heavyweight-tee',
    title: 'ZDRY ESSENTIALS - HEAVYWEIGHT TEE',
    collection: 'essentials',
    availableForSale: false,
    comingSoon: true,
    price: null,
    image: null,
    specs: '260gsm · Oversized · Premium Cotton',
    description: 'The everyday piece. Heavyweight enough to stand on its own, clean enough to layer under anything.',
    tags: ['essentials', 'zdry']
  },
  {
    id: 'zdry-hat',
    handle: 'zdry-essentials-dad-hat',
    title: 'ZDRY ESSENTIALS - DAD HAT',
    collection: 'essentials',
    availableForSale: false,
    comingSoon: true,
    price: null,
    image: null,
    specs: 'Unstructured · Adjustable · One Size',
    description: 'Understated. Worn daily. The ZDRY Dad Hat carries the brand without announcing it.',
    tags: ['essentials', 'zdry']
  }
];

// ─────────────────────────────────────────
// PRODUCT FUNCTIONS
// ─────────────────────────────────────────
async function getProducts(first = 20) {
  if (SHOPIFY_CONFIG.storefrontToken) {
    try {
      const res = await fetch(
        `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken
          },
          body: JSON.stringify({
            query: `query { products(first: ${first}) { edges { node {
              id title handle availableForSale tags
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 1) { edges { node { url altText } } }
            }}}}`
          })
        }
      );
      const data = await res.json();
      return data?.data?.products?.edges?.map(e => e.node) || STATIC_PRODUCTS;
    } catch { return STATIC_PRODUCTS; }
  }
  return STATIC_PRODUCTS;
}

async function getProduct(handle) {
  if (SHOPIFY_CONFIG.storefrontToken) {
    try {
      const res = await fetch(
        `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken
          },
          body: JSON.stringify({
            query: `query($handle: String!) { product(handle: $handle) {
              id title handle descriptionHtml availableForSale tags
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 5) { edges { node { url altText } } }
              variants(first: 20) { edges { node {
                id title availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
              }}}
            }}`,
            variables: { handle }
          })
        }
      );
      const data = await res.json();
      return data?.data?.product || STATIC_PRODUCTS.find(p => p.handle === handle) || null;
    } catch { return STATIC_PRODUCTS.find(p => p.handle === handle) || null; }
  }
  return STATIC_PRODUCTS.find(p => p.handle === handle) || null;
}

// ─────────────────────────────────────────
// CART (live when token is added)
// ─────────────────────────────────────────
const Cart = {
  get() {
    try { const c = localStorage.getItem('zedorey_cart'); return c ? JSON.parse(c) : null; } catch { return null; }
  },
  set(cart) { try { localStorage.setItem('zedorey_cart', JSON.stringify(cart)); } catch {} },
  clear() { try { localStorage.removeItem('zedorey_cart'); } catch {} },
  async addItem(variantId, quantity = 1) { return null; }
};

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function formatPrice(amount, currencyCode = 'AUD') {
  if (!amount || parseFloat(amount) === 0) return 'Price TBA';
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: currencyCode }).format(parseFloat(amount));
}

function getShopifyProductUrl(handle) {
  return `${SHOPIFY_CONFIG.storeUrl}/products/${handle}`;
}
