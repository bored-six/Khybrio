# Khybrio: Business Context

> Drop this file into any chat to give it full context on the business.
> Last updated: 2026-11-10. Status: early; first clients signed October 2026 (no client names or prices in this public repo).

## One paragraph

Khybrio is a studio in Zamboanga City, Philippines, that keeps small businesses "always connected": found on Google and Facebook, bookable at any hour, and kept running every month. It sells three packages, each building on the last: **Get found**, **Get booked** and **Get ahead**, each with a setup part and a monthly part. The six services behind them (website, systems and automation, local presence and reviews, content management, NFC and print, care and maintenance) can also be quoted on their own. No prices on the site: every job is quoted on a free call, fixed price, in writing, and the client owns everything. One site, in English, at /. The old /ph page is a redirect to it.

## The team

| Person | Role | Does |
|---|---|---|
| Shiek Abdurahman | Developer | Builds every automation and site, plus handover docs, hosting, uptime |
| Dave Calio | First contact & onboarding | First person a prospect meets; runs the free call, plain language |
| Haiqal Munjalin | Marketing & sales | Proposals, scoping, follow-through to a signed agreement |
| TBC | TBC | Joined by 2026-10-14; name and role not yet recorded |

Rein Garcia (social media management) left the team; social media management is not offered. The site states no headcount.

## The pivot (why the business looks like this)

> **Superseded.** Kept as history. The two-page split, USD offer and free audit described here are retired; the monthly review work came back inside the packages on 2026-11-10. See "The offer".

The original offer was a **bundle**: website + NFC tap card + Google Business
Profile/Facebook Page optimization, sold locally in Zamboanga. It kept dying on
one objection: **"we already have a Facebook Page"** — and the customer was
right. For many local shops the Page genuinely is enough. The bundle was
optional, one-time, and arguable; nothing billed monthly, so every sale meant
hunting for the next one.

The reframe:

- **Internationally, sell automation.** It's felt daily, measurable, and
  recurring — not something a customer can argue their way out of.
- **Locally, sell the Google Maps gap.** A Facebook Page does not appear when
  someone searches "hardware store near me" on Google Maps. That's a different
  discovery surface, most owners have never checked it, and it's provable on
  their own phone in sixty seconds.
- **Never argue with the Facebook Page.** The local pitch is "your Page is
  working, keep it — this is a different thing."
- **The NFC card is not a product.** A printed QR does 95% of the job for free
  and a sharp owner will say so. The card is a **free mechanism** bundled into a
  monthly **review-collection service**; what's sold is the review count and the
  Maps ranking it buys. This is also the recurring local revenue line.

## The offer (since 2026-11-10)

The full spec, with every item per package and per service, is
`.claude/specs/offer.md`. Site copy is `src/content/offer.js`. It replaced the
2026-10-20 offer (Starter/Standard/Premium sites, "Google muna", six workflows,
add-on bands), which is in git history.

### Positioning
- Tagline: **"Your business, always connected."**
- A growth partner that builds assets, not a vendor selling one-off services.
  Three pillars: **Systems** (website, chatbot, booking), **Marketing** (local
  presence and content), **Optimization** (care and monthly reporting).
- Based in Zamboanga City, Philippines. Philippine businesses, priced in PHP.
- ONE site, in English. The separate Taglish `/ph` page is retired and merged.
- The client owns everything: domain, site, profiles, systems, accounts.

### The three packages
Each includes everything in the one before it.
- **Get found:** be on the map. Google profile, Maps pin, Facebook Page linked
  to Google, a simple website, NFC review cards. Monthly: Google upkeep,
  review replies, a report.
- **Get booked** (our default recommendation): adds a booking or ordering
  website, a Messenger chatbot and a photo day. Monthly: website and chatbot
  care, regular posts and video.
- **Get ahead:** adds a live dashboard, automatic order and lead logging, and
  Google and Meta ads. Monthly: dashboard support, more content, ads managed.

### The six services
Website · Systems and automation · Local presence and reviews · Content
management · NFC and print · Care and maintenance. Each can be quoted alone.

### Guarantee
On-time launch (core setup in about two weeks once we have the client's
materials), full ownership, free revisions on setup until it matches the
agreed scope.

### Not offered
Logo or brand identity work, USD pricing, "international" framing, Taglish
copy.

### Selling the Google profile

**The sales opener is a demo, not a pitch:** in their shop, on your phone,
search their category + "Zamboanga" on Google Maps. Show them the competitor
at the top with 40 reviews — and them missing, unclaimed, or one blurry photo
from 2019. "Every person who searched this today went to them." It closes
itself.

## Pricing philosophy

- **No prices on the site.** Quoted on a free call.
- **Two fixed prices, agreed in writing before anything starts:** one for the
  setup, one for the monthly part. No hourly billing.
- **The monthly part is what keeps it working.** A listing left alone goes
  stale; the monthly work keeps it correct and active and ends in a report.
- **Lead with their lost customers, bring up packages last.** Avoid showing a
  price list before the problem is clear (see the operational map's sales
  rules).
- **The client pays domain and hosting yearly, directly,** in their name.
- **The client owns everything.** The written agreement must actually assign it.

## Voice & honesty rules (the constitution — apply to ALL copy)

These came from hard lessons; breaking them is the one unforgivable edit:

1. **No fabricated proof. Ever.** No invented testimonials, portfolio pieces,
   client names, star ratings, or "most picked" badges. The site once had
   fake reviews and a fake portfolio; they were removed deliberately.
2. **Sample/illustrative content is always labelled.** Any demo UI, example
   run log, or illustrative metric carries an **"Example"** badge. The badge is
   load-bearing, not decoration.
3. **Under-promise timing.** "About a week / weeks not quarters," framed as a
   *target*, conditional on the client's photos/access — and Google's
   verification delay is named as theirs, not ours.
4. **Hedge what we can't control:** "set up to *help you* rank" (never "you
   will rank #1"), "almost any modern phone" (never "any phone"), "taking on
   work from anywhere" (never "working with businesses in X" until true).
5. **Plain language, no jargon.** Explain what we're doing and why.
6. **Say we're new.** Being plain about it does the trust-building fake proof would have faked.
7. **Push back on flawed requests** rather than quietly shipping them.

## Brand identity

- **Name:** Khybrio · **Mascot:** Khybi (small teal creature with coral ears)
- **Colors:** teal-deep `#1C4D4A` (anchor) · teal-bright `#00767F` · teal-soft
  `#A9C6C3` · cream `#F5F7F6` · coral `#E8622D` (accent, sparingly)
- **Type:** Fraunces (display serif — commands through *scale* at regular
  weight, not boldness) + Inter (body/UI)
- **Style:** editorial broadsheet — 2px borders, rounded "chamber" sections
  alternating dark teal and cream, floating pill nav, hand-drawn coral
  squiggle underlines. Flat, no gradients-for-decoration, honest.
- **Hero:** see `src/sections/Hero.jsx` (redesigned October 2026).
- The footer lockup PNG still carries the old "Local digital presence"
  descriptor (open item).

## Channels & operations

- **Email:** khybrio.org@gmail.com *(open item: move to a domain email, since
  a Gmail address undercuts the pitch)*
- **Facebook:** facebook.com/khybrio · **Instagram:** @khybrio
- **Base:** Zamboanga City; takes on work from anywhere in the Philippines
- **Site:** One page at `/`; `ph/index.html` is a static redirect to `/` for old
  links and NFC cards. Copy: `src/content/site.js` and `src/content/offer.js`.
  Order: Hero, Packages, Services, How it works, About, FAQ, Contact.
  Contact is a guided chat: Khybi asks five questions (business type, Google
  Maps, how customers book, branches, biggest pain), takes name and contact,
  then shows a suggested package. The lead email carries every answer and the
  package the visitor was shown, so read it before the call. The suggestion is
  a starting point, not a quote; the rules are in `src/lib/recommend.test.js`.
- **Operational map:** FigJam board with the sales funnel, services and
  positioning. Its Pricing and Packaging boxes were still blank on 2026-11-10.

## Current status & open items (as of 2026-11-10)

1. The contact form is wired to Formspree.
2. Real client work replaces example content only with written permission.
3. The fourth team member's name and role.
4. The footer logo descriptor (see Brand identity).
5. A domain email.
6. Prices for the three packages (setup and monthly) are not written down
   anywhere in the repo yet.
