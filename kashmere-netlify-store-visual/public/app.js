// Keep payments closed until Stripe, shipping and launch details are confirmed.
const ONLINE_CHECKOUT_ENABLED = false;
const products = {
  beard_butter: {
    name: 'Beard & Body Butter', price: 25, detail: '4 oz · 118 ml', image: 'beard-butter.svg',
    description: 'Deep hydration, softness and nourishment for your beard and skin.',
    specs: [['Size', '4 oz / 118 ml'], ['For', 'Beard & body'], ['Includes', 'One jar of Beard & Body Butter']]
  },
  growth_oil: {
    name: 'Beard Growth Oil', price: 10, detail: '2 oz · 59 ml', image: 'growth-oil.svg',
    description: 'The nourishing oil in your Kashmere beard care routine, presented in a bottle with a dropper.',
    specs: [['Size', '2 oz / 59 ml'], ['For', 'Beard care'], ['Includes', 'One bottle of Beard Growth Oil']]
  },
  beard_kit: {
    name: "The King's Bundle", price: 45, detail: '2 butters + 1 oil', image: 'beard-kit.svg',
    description: 'The complete Kashmere collection. Two Beard & Body Butters and one Beard Growth Oil for $45 — a $15 saving compared with buying all three separately.',
    specs: [['Butter', 'Two 4 oz / 118 ml jars'], ['Oil', 'One 2 oz / 59 ml bottle'], ['Value', '$60 separately · $45 as a bundle']]
  }
};
let cart = {};
try {
  const saved = JSON.parse(localStorage.getItem('kashmere-bag') || '{}');
  if (saved && typeof saved === 'object') {
    for (const [id, quantity] of Object.entries(saved)) {
      if (Object.hasOwn(products, id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 20) cart[id] = quantity;
    }
  }
} catch { /* A browser with storage disabled can still use the bag this visit. */ }
const dialog = document.getElementById('cart');
const detailsDialog = document.getElementById('product-details');
const items = document.getElementById('cart-items');
const checkout = document.getElementById('checkout');
const message = document.getElementById('checkout-message');
const toast = document.getElementById('toast');
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
let toastTimer;

function render() {
  try { localStorage.setItem('kashmere-bag', JSON.stringify(cart)); } catch {}
  document.getElementById('cart-count').textContent = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById('subtotal').textContent = money(Object.entries(cart).reduce((total, [id, quantity]) => total + products[id].price * quantity, 0));
  items.replaceChildren();
  checkout.disabled = !ONLINE_CHECKOUT_ENABLED || !Object.keys(cart).length;
  for (const [id, quantity] of Object.entries(cart)) {
    const product = products[id];
    const line = document.createElement('article');
    line.className = 'cart-line';
    line.innerHTML = `<img class="cart-thumb" src="assets/${product.image}" alt="${product.name}" width="72" height="84"><div class="cart-line-info"><div class="cart-line-heading"><h3>${product.name}</h3><span>${money(product.price * quantity)}</span></div><p>${product.detail} · ${money(product.price)} each</p><div class="quantity"><button data-change="${id}" data-delta="-1" aria-label="Decrease ${product.name} quantity">−</button><span aria-label="Quantity">${quantity}</span><button data-change="${id}" data-delta="1" aria-label="Increase ${product.name} quantity" ${quantity >= 20 ? 'disabled' : ''}>+</button><button data-remove="${id}" class="remove">Remove</button></div></div>`;
    items.append(line);
  }
  if (!Object.keys(cart).length) items.innerHTML = '<div class="empty"><p>Your bag is ready for a little care.</p><button id="continue-shopping" class="button outline">Explore the collection →</button></div>';
}
function openCart() {
  if (detailsDialog.open) detailsDialog.close();
  toast.classList.remove('visible');
  clearTimeout(toastTimer);
  if (!dialog.open) dialog.showModal();
}
function showDetails(id) {
  if (!Object.hasOwn(products, id)) return;
  const product = products[id];
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-price').textContent = money(product.price);
  document.getElementById('detail-description').textContent = product.description;
  const image = document.getElementById('detail-image');
  image.src = `assets/${product.image}`;
  image.alt = product.name;
  const specs = document.getElementById('detail-specs');
  specs.replaceChildren();
  for (const [label, value] of product.specs) {
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    specs.append(term, description);
  }
  document.getElementById('detail-add').dataset.add = id;
  detailsDialog.showModal();
}
document.addEventListener('click', event => {
  const add = event.target.closest('[data-add]');
  const change = event.target.closest('[data-change]');
  const remove = event.target.closest('[data-remove]');
  const details = event.target.closest('[data-details]');
  if (details) showDetails(details.dataset.details);
  if (add) {
    const id = add.dataset.add;
    if (!Object.hasOwn(products, id)) return;
    if ((cart[id] || 0) >= 20) { openCart(); return; }
    cart[id] = (cart[id] || 0) + 1;
    message.textContent = '';
    render();
    if (detailsDialog.open) detailsDialog.close();
    document.getElementById('toast-text').textContent = `${products[id].name} added`;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    // Keep the action available long enough to find and activate it.
    toastTimer = setTimeout(() => {
      if (!toast.contains(document.activeElement) && !toast.matches(':hover')) toast.classList.remove('visible');
    }, 8000);
  }
  if (change) {
    const id = change.dataset.change;
    if (!Object.hasOwn(products, id)) return;
    cart[id] = Math.min(20, (cart[id] || 0) + Number(change.dataset.delta));
    if (cart[id] <= 0) delete cart[id];
    message.textContent = '';
    render();
    const focusTarget = items.querySelector(`[data-change="${id}"][data-delta="${change.dataset.delta}"]`);
    if (focusTarget && !focusTarget.disabled) focusTarget.focus();
    else document.getElementById('continue-shopping')?.focus();
  }
  if (remove) {
    delete cart[remove.dataset.remove];
    message.textContent = '';
    render();
    document.getElementById('continue-shopping')?.focus();
  }
  if (event.target.closest('#continue-shopping')) {
    dialog.close();
    document.getElementById('shop').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
});
document.getElementById('open-cart').addEventListener('click', openCart);
document.getElementById('toast-cart').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', () => dialog.close());
document.getElementById('close-details').addEventListener('click', () => detailsDialog.close());
for (const modal of [dialog, detailsDialog]) {
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
}
checkout.addEventListener('click', async () => {
  if (!ONLINE_CHECKOUT_ENABLED || checkout.disabled) return;
  checkout.disabled = true;
  checkout.textContent = 'Opening secure checkout…';
  message.textContent = '';
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: Object.entries(cart).map(([id, quantity]) => ({ id, quantity })) })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Checkout is temporarily unavailable. Please message Kashmere on Instagram for help.');
    const url = new URL(data.url);
    if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Checkout could not be opened. Please contact Kashmere.');
    location.assign(url.href);
  } catch (error) {
    message.textContent = error.message;
    checkout.disabled = false;
    checkout.textContent = 'Continue to checkout ↗';
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
render();
