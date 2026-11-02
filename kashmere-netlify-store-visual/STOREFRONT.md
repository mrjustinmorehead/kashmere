# Kashmere storefront

Catalog follows the supplied November 2026 price sheet: Beard & Body Butter (4 oz) $25; Beard Growth Oil (2 oz) $10; King's Bundle (two butters and one oil) $45, a $15 saving from $60 individually.

The frontend is buildless HTML/CSS/JS in `public`. The public experience is a collection preview with product exploration and Instagram enquiries. SVG packaging illustrations were created to match the reference palette; the uploaded screenshot and its metadata are not published.

## Checkout configuration

The existing Netlify Stripe endpoint supports a multi-product bag and enforces prices and integer quantities on the server. Stripe credentials were not read or changed.

Before enabling online orders, configure `STRIPE_SECRET_KEY` and either `STRIPE_SHIPPING_RATE_ID` or a comma-separated `STRIPE_SHIPPING_RATE_IDS` in Netlify's Functions environment. Use actual business-approved Stripe shipping rates, not the illustrative $12–$17 range as an automatic fixed charge. Redeploy after configuring environment variables. `SHIPPING_COUNTRIES` defaults to US; provide comma-separated supported country codes to expand it.

`SITE_URL` or Netlify's `URL` supplies the canonical redirect origin. Stripe automatic tax can be enabled with `STRIPE_AUTOMATIC_TAX=true` once the business's Stripe Tax setup and registrations are ready. Confirm tax treatment before taking live orders. Missing payment or shipping configuration returns a friendly Instagram ordering message without creating a payment session.

Confirm actual ingredients, directions, processing times and return terms with the business before adding detailed policies or claims. The FAQ directs these questions to the official Instagram account. No testimonials, guarantees, shipping promises or payment-method claims were invented.

## Validation

JavaScript syntax checks passed. Mock checkout checks covered malformed input, invalid products, duplicate products, invalid quantities, missing configuration, server-side prices, shipping options and canonical redirects. Browser checks covered desktop and 390 px layout, add-to-bag, quantity updates, reload persistence, removal and empty-bag checkout disabling. No real purchase was made.


## November storefront improvements

- Added user-confirmed founder credit for Terrence Carr. The public Instagram profile describes the account as the Kashmere Beard and Body Butter creator/operator. Product posts required sign-in during review, and retrieval services had no indexed product information. No unverified ingredients, scent options, customer reviews, founder quotes or delivery/return promises were added.
- Replaced cropped collection views on individual cards with dedicated SVG product assets. These are illustrations, not product photographs. Updated the native crown-and-beard mark to keep the header and favicon consistent with the packaging.
- Added product-detail dialogs, cart thumbnails, an actionable View bag notification, larger supporting text, prominent shipping estimates, a more specific hero, and a founder section.
- The site is explicitly a collection preview. The public bag has been replaced by product exploration; the checkout endpoint remains unused. Stripe and the custom domain are intentionally deferred by the user. The backend was not changed in this pass.
- A noindex/nofollow meta tag keeps this preview out of search results. At launch, remove that tag, confirm product information and policies, set up the custom domain and payment/shipping/tax configuration, then restore the purchase interface and validate the full payment/confirmation/fulfillment flow.
- Still needed from the business: real product photos; full ingredients, scent details and label-approved directions; actual processing and return terms; business contact email; authentic approved customer feedback. Analytics selection remains a launch decision; no third-party tracking was added.


## Instagram gallery

The user explicitly requested review and publication of photos from the official Instagram account. The selected original media were downloaded through the browser and are bundled with the site, avoiding expiring Instagram CDN links and third-party embed scripts. SVG image containers preserve the downloaded JPEG pixels; no generative image edits were made.

Sources reviewed:
- Product photograph: https://www.instagram.com/p/DTTHi9FESJQ/?img_index=1 (January 9, 2026). Butter jars and the original packaging. The other images in this post were personal portraits and were not selected.
- Earn Your Crown campaign artwork: https://www.instagram.com/p/DY3IqhhNBdB/ (May 27, 2026). This is labeled campaign artwork on the site, not represented as a documentary product photo.
- Official price sheet: https://www.instagram.com/p/DZQYK41iX-T/?img_index=2 (June 6, 2026). Its parent carousel carried an Instagram AI content label. Published as an optional full-size price-sheet image, not a product photograph.

The gallery appears after the collection, with full-image links, source-post links and a note that packaging varies between posts. Current catalog cards and pricing remain unchanged. No private messages, personal portrait posts, commenter testimonials, credentials or session information were included. Payments remain disabled for the prelaunch preview.

## Official logo and palette

The user supplied and authorized `file_0000000014b881f5b3136f48717d760c.png` as the official identity. `public/assets/official-logo.svg` contains a lossless WebP encoding of that exact image, with identical RGB pixels verified before integration. Native SVG viewports frame the supplied wordmark and emblem for the header/footer and favicon; the founder panel displays the complete approved lockup. No approximation or new AI-generated logo was substituted.

The page palette now uses deep navy #001C47, warm gold #F8CE70, cream #FFF5DC and supporting blue panels. Header, footer, hero seal, buttons, product panels, gallery borders, help sections and shopping dialogs use the coordinated palette. Existing Instagram photographs/artwork and product illustration artwork retain their original designs. Founder spelling remains Terrence Carr. The preview/noindex status and disabled checkout remain in place.


## Readability and luxury refinement — November 2026

The current public preview uses a simpler collection → ritual → founder → journal → help flow. Body copy is 16 px, supporting shopping information is 14 px, and controls have at least 44 px touch targets. Decorative eyebrows and packaging-preview captions may be smaller. The exact official logo remains unchanged; interface gold is now a quieter champagne #DFC18A.

The mobile header has an accessible disclosure menu, with Escape support and menu links that close it. The shortened hero shows the products within the initial 390 × 844 viewport. Removed the floating crown, vertical lettering, benefit strip, repeated shipping notes, redundant product-detail links, and repeated bundle FAQ.

Product dialogs have a persistent close control and enquiry action, readable specifications, an expandable formula section, and focus restoration. Explore actions replace Add to bag; no payment or checkout requests are made. The Stripe backend is unchanged. Browser-saved bags from earlier previews are neither read nor erased.

The founder section uses a restrained typographic founder credit instead of displaying the logo again. A verified portrait and approved personal story are still needed. No substitute portrait, invented biography, or attributed quotation is published. Historic Instagram media remain unchanged and are distinguished from packaging previews.

### Published copy

- Announcement: “Discover the collection · Online ordering opens soon.”
- Hero: “Earn your crown.” / “Care for your beard. Care for yourself. Discover our butter and oil essentials for a well-kept daily ritual.” CTA: “Explore the collection”.
- Collection: “Everyday care. Considered essentials.” / “Butter for beard and body. Oil for your beard. Better together.”
- Butter: “Hydration and softness, from beard to skin.” Detail: “Hydration, softness, and nourishment for your beard and skin. One essential, with care for both.”
- Oil: “A nourishing oil for your everyday beard care ritual.” Detail: “A nourishing oil for your everyday beard care ritual, presented in a dropper bottle.”
- Bundle: “Bring both essentials together. Two butters, one oil, and a $15 saving.” Detail retains the confirmed $45 bundle / $60 separately pricing.
- Ritual: “A little care. Your own moment.” / “Find the essential that fits your routine, with care for your beard and the skin beneath it.” The two entries explain butter and oil without repeating sizes or prices.
- Founder: “Care worth making time for.” / “Kashmere brings beard and body care together in a focused collection: butter, oil, and a moment for yourself. Founded by Terrence Carr. Follow the story, explore the collection, and connect directly with Kashmere.”
- Journal: “Kashmere in focus.” / “A look at Kashmere, from the original jars to the latest campaign.” Original jars: “A closer look at the butter.” Campaign: “Earn your crown.”
- Help: “The finer details.” / “A question about the collection? Connect directly with Kashmere.”
- Ordering FAQ: “Online ordering is coming soon. For now, explore the collection and follow @kashmerebeard_body on Instagram for updates and product enquiries.”
- Shipping FAQ: “Shipping is charged separately and varies by destination. Our published price-sheet estimate is $12–$17. Final shipping charges will be shown before payment when online ordering opens.”
- Formula FAQ: “Full formula, fragrance, and application details will be published before online ordering opens. Until then, please check the product label and contact Kashmere with specific ingredient or sensitivity questions.”
- Delivery/returns FAQ: “Processing times and return terms will be published before online ordering opens. For questions about an existing order, message Kashmere on Instagram with your order number.”
- Footer: “Beard care. Body care. Your daily ritual.”

### Suggested launch copy — requires business confirmation; NOT published

These are writing templates, not factual product descriptions or adopted policies. Replace all brackets and obtain the founder's approval before publishing.

**Founder story, proposed first-person draft**

“I created Kashmere to make everyday care feel intentional. My aim is simple: a focused collection for your beard and skin, and a daily ritual that feels like your own. Earn your crown.” — Proposed wording for Terrence Carr to revise and approve; not an existing quote or verified origin story. Add one specific, true sentence about what prompted him to start the business and a verified portrait with permission to publish.

**Butter formula panel**

- Texture: “[Verified texture and finish, e.g. rich / whipped / lightweight only if accurate].”
- Scent: “[Approved fragrance name and accurate scent notes; state fragrance-free only if confirmed].”
- Ingredients: “[Full label ingredient list, reproduced exactly and reviewed by the business].”
- How to use: “[Label-approved amount, application area, method, and frequency].”
- A little goes a long way: use only if confirmed; add expected jar duration only with a documented amount and frequency.

**Oil formula panel**

- Texture: “[Verified absorption and finish; avoid non-greasy claims unless confirmed].”
- Scent: “[Approved fragrance name and accurate notes].”
- Ingredients: “[Full label ingredient list].”
- How to use: “[Label-approved drop count, application method, and frequency].”
- Do not add hair-growth timelines, guaranteed growth, medical claims, or universal suitability claims.

**Shipping and returns, proposed structure**

“Orders are prepared within [approved processing window]. Shipping options and costs are shown at checkout. [Approved tracking/dispatch statement].”

“[Business-approved return eligibility]. Contact [business support address] within [approved period] with your order number. [Approved rules for opened items, damaged deliveries, and return postage].”

Do not publish these templates until the business supplies the actual terms and support email. The launch also still requires Stripe, domain, final packaging photographs, and removal of noindex once ready.
