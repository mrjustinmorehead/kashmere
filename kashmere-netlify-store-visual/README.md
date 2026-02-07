# Kashmere Beard Care — Netlify + Stripe (Lean Visual Starter)

This is a lightweight ecommerce starter that looks like a real brand page:
- Dark + gold premium aesthetic
- 2 products + bundle
- Stripe Checkout for secure payments (PCI-compliant)

## Prereqs
- Node 18+
- Netlify CLI: `npm i -g netlify-cli`
- Stripe account (test mode fine)

## Run locally
1) Install deps:
```bash
npm install
```

2) Create `.env` from `.env.example` and set:
- STRIPE_SECRET_KEY=sk_test_...

3) Start:
```bash
netlify dev
```

Open the dev URL (typically http://localhost:8888)

## Deploy
- Push to GitHub and deploy via Netlify
- Add env vars in Netlify settings:
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET (optional)

## Next upgrades (if you scale)
- Use Stripe Price IDs (more robust than inline price_data)
- Add shipping options + taxes in Stripe Checkout
- Add inventory/fulfillment (Netlify KV / Supabase / ShipStation, etc.)
