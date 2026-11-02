// This is a collection preview. No cart, payment requests, or checkout links are exposed.
const products = {
  beard_butter: {
    name: 'Beard & Body Butter', price: 25, image: 'beard-butter.svg',
    description: 'Hydration, softness, and nourishment for your beard and skin. One essential, with care for both.',
    specs: [['Size', '4 oz / 118 ml'], ['For', 'Beard & body'], ['Includes', 'One jar of Beard & Body Butter']]
  },
  growth_oil: {
    name: 'Beard Growth Oil', price: 10, image: 'growth-oil.svg',
    description: 'A nourishing oil for your everyday beard care ritual, presented in a dropper bottle.',
    specs: [['Size', '2 oz / 59 ml'], ['For', 'Beard care'], ['Includes', 'One bottle of Beard Growth Oil']]
  },
  beard_kit: {
    name: 'The King’s Bundle', price: 45, image: 'beard-kit.svg',
    description: 'The complete collection: two Beard & Body Butters and one Beard Growth Oil. $45 together, compared with $60 separately — a $15 saving.',
    specs: [['Butter', 'Two 4 oz / 118 ml jars'], ['Oil', 'One 2 oz / 59 ml bottle'], ['Saving', '$15 compared with buying separately']]
  }
};
const dialog = document.getElementById('product-details');
const nav = document.getElementById('main-nav');
const toggle = document.getElementById('menu-toggle');
let previousFocus;
function closeMenu(restoreFocus = false) {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => {
  if (!event.target.closest('header')) closeMenu();
  const trigger = event.target.closest('[data-details]');
  if (!trigger || !Object.hasOwn(products, trigger.dataset.details)) return;
  const product = products[trigger.dataset.details];
  previousFocus = trigger;
  document.getElementById('detail-title').textContent = product.name;
  document.getElementById('detail-price').textContent = `$${product.price}`;
  document.getElementById('detail-description').textContent = product.description;
  const image = document.getElementById('detail-image');
  image.src = `assets/${product.image}`;
  image.alt = `${product.name} packaging preview`;
  const specs = document.getElementById('detail-specs');
  specs.replaceChildren();
  for (const [label, value] of product.specs) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label; dd.textContent = value;
    specs.append(dt, dd);
  }
  dialog.querySelector('.formula-details').open = false;
  dialog.showModal();
  dialog.scrollTop = 0;
});
for (const id of ['close-details', 'continue-exploring']) document.getElementById(id).addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());
document.getElementById('year').textContent = new Date().getFullYear();
