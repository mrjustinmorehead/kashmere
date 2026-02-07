import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    const sig = event.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !secret) return { statusCode: 400, body: "Missing signature/secret" };

    const payload = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
    const stripeEvent = stripe.webhooks.constructEvent(payload, sig, secret);

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      console.log("✅ Order paid:", { id: session.id, email: session.customer_details?.email, amount: session.amount_total });
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("Webhook error:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
