# Kashmere storefront

Catalog follows the supplied November 2026 price sheet: Beard & Body Butter (4 oz) $25; Beard Growth Oil (2 oz) $10; King's Bundle (two butters and one oil) $45, a $15 saving from $60 individually.

The frontend is buildless HTML/CSS/JS in `public`. The shopping bag is stored in the visitor's browser. SVG packaging illustrations were created to match the reference palette; the uploaded screenshot and its metadata are not published.

## Checkout configuration

The existing Netlify Stripe endpoint supports a multi-product bag and enforces prices and integer quantities on the server. Stripe credentials were not read or changed.

Before enabling online orders, configure `STRIPE_SECRET_KEY` and either `STRIPE_SHIPPING_RATE_ID` or a comma-separated `STRIPE_SHIPPING_RATE_IDS` in Netlify's Functions environment. Use actual business-approved Stripe shipping rates, not the illustrative $12–$17 range as an automatic fixed charge. Redeploy after configuring environment variables. `SHIPPING_COUNTRIES` defaults to US; provide comma-separated supported country codes to expand it.

`SITE_URL` or Netlify's `URL` supplies the canonical redirect origin. Stripe automatic tax can be enabled with `STRIPE_AUTOMATIC_TAX=true` once the business's Stripe Tax setup and registrations are ready. Confirm tax treatment before taking live orders. Missing payment or shipping configuration returns a friendly Instagram ordering message without creating a payment session.

Confirm actual ingredients, directions, processing times and return terms with the business before adding detailed policies or claims. The FAQ directs these questions to the official Instagram account. No testimonials, guarantees, shipping promises or payment-method claims were invented.

## Validation

JavaScript syntax checks passed. Mock checkout checks covered malformed input, invalid products, duplicate products, invalid quantities, missing configuration, server-side prices, shipping options and canonical redirects. Browser checks covered desktop and 390 px layout, add-to-bag, quantity updates, reload persistence, removal and empty-bag checkout disabling. No real purchase was made.
