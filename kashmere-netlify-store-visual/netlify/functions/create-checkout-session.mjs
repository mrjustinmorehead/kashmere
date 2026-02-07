import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRODUCTS = {
  beard_butter: { name: "Kashmere Beard Butter", amount: 1800 },
  growth_oil:   { name: "Kashmere Beard Growth Oil", amount: 2000 },
  beard_kit:    { name: "The Kashmere Beard Kit", amount: 3400 },
};

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    if (!process.env.STRIPE_SECRET_KEY) return { statusCode: 500, body: "Missing STRIPE_SECRET_KEY" };

    const { id } = JSON.parse(event.body || "{}");
    const product = PRODUCTS[id];
    if (!product) return { statusCode: 400, body: "Unknown product id" };

    const origin =
      process.env.SITE_URL ||
      event.headers.origin ||
      `https://${event.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: product.amount,
          product_data: { name: product.name },
        },
      }],
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
      allow_promotion_codes: true,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
