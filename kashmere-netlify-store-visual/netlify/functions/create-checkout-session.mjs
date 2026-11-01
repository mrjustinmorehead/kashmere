import Stripe from 'stripe';
const PRODUCTS = {
  beard_butter: { name: 'Kashmere Beard & Body Butter — 4 oz', amount: 2500 },
  growth_oil: { name: 'Kashmere Beard Growth Oil — 2 oz', amount: 1000 },
  beard_kit: { name: "Kashmere King's Bundle — 2 Butters + 1 Oil", amount: 4500 },
};
const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return reply(400, { error: 'Invalid request.' }); }
  const items = body.items || (body.id ? [{ id: body.id, quantity: 1 }] : []);
  if (!Array.isArray(items) || !items.length || items.length > 3) return reply(400, { error: 'Please check your shopping bag.' });
  const seen = new Set();
  for (const item of items) {
    if (!item || !Object.hasOwn(PRODUCTS, item.id) || seen.has(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) return reply(400, { error: 'Please check your product quantities.' });
    seen.add(item.id);
  }
  if (!process.env.STRIPE_SECRET_KEY) return reply(503, { error: 'Online checkout is being prepared. Please message @kashmerebeard_body on Instagram to order.' });
  const shippingRates = (process.env.STRIPE_SHIPPING_RATE_IDS || process.env.STRIPE_SHIPPING_RATE_ID || '').split(',').map(v => v.trim()).filter(Boolean);
  if (!shippingRates.length) return reply(503, { error: 'Please message @kashmerebeard_body on Instagram for your shipping quote and order. Online shipping checkout is being prepared.' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = process.env.SITE_URL || process.env.URL || 'https://kashmerebeard.netlify.app';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map(({ id, quantity }) => ({ quantity, price_data: { currency: 'usd', unit_amount: PRODUCTS[id].amount, product_data: { name: PRODUCTS[id].name } } })),
      shipping_address_collection: { allowed_countries: (process.env.SHIPPING_COUNTRIES || 'US').split(',').map(v => v.trim()).filter(Boolean) },
      shipping_options: shippingRates.slice(0, 5).map(shipping_rate => ({ shipping_rate })),
      billing_address_collection: 'required',
      ...(process.env.STRIPE_AUTOMATIC_TAX === 'true' ? { automatic_tax: { enabled: true } } : {}),
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
    });
    return reply(200, { url: session.url });
  } catch (error) {
    console.error('Checkout creation failed', error.type || 'unknown');
    return reply(503, { error: 'Checkout is temporarily unavailable. Your bag is saved. Please message Kashmere on Instagram for help.' });
  }
};
