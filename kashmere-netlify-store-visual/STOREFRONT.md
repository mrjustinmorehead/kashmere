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


## November storefront improvements

- Added user-confirmed founder credit for Terrance Carr. The public Instagram profile describes the account as the Kashmere Beard and Body Butter creator/operator. Product posts required sign-in during review, and retrieval services had no indexed product information. No unverified ingredients, scent options, customer reviews, founder quotes or delivery/return promises were added.
- Replaced cropped collection views on individual cards with dedicated SVG product assets. These are illustrations, not product photographs. Updated the native crown-and-beard mark to keep the header and favicon consistent with the packaging.
- Added product-detail dialogs, cart thumbnails, an actionable View bag notification, larger supporting text, prominent shipping estimates, a more specific hero, and a founder section.
- The site is explicitly a collection preview. `ONLINE_CHECKOUT_ENABLED` in public/app.js is false; the bag works, but the payment button stays disabled. Stripe and the custom domain are intentionally deferred by the user. The backend was not changed in this pass.
- A noindex/nofollow meta tag keeps this preview out of search results. At launch, remove that tag, confirm product information and policies, set up the custom domain and payment/shipping/tax configuration, then enable the checkout flag and validate the full payment/confirmation/fulfillment flow.
- Still needed from the business: real product photos; full ingredients, scent details and label-approved directions; actual processing and return terms; business contact email; authentic approved customer feedback. Analytics selection remains a launch decision; no third-party tracking was added.


## Instagram gallery

The user explicitly requested review and publication of photos from the official Instagram account. The selected original media were downloaded through the browser and are bundled with the site, avoiding expiring Instagram CDN links and third-party embed scripts. SVG image containers preserve the downloaded JPEG pixels; no generative image edits were made.

Sources reviewed:
- Product photograph: https://www.instagram.com/p/DTTHi9FESJQ/?img_index=1 (January 9, 2026). Butter jars and the original packaging. The other images in this post were personal portraits and were not selected.
- Earn Your Crown campaign artwork: https://www.instagram.com/p/DY3IqhhNBdB/ (May 27, 2026). This is labeled campaign artwork on the site, not represented as a documentary product photo.
- Official price sheet: https://www.instagram.com/p/DZQYK41iX-T/?img_index=2 (June 6, 2026). Its parent carousel carried an Instagram AI content label. Published as an optional full-size price-sheet image, not a product photograph.

The gallery appears after the collection, with full-image links, source-post links and a note that packaging varies between posts. Current catalog cards and pricing remain unchanged. No private messages, personal portrait posts, commenter testimonials, credentials or session information were included. Payments remain disabled for the prelaunch preview.
