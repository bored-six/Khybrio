# Merge plan: one page at `/` for the new offer

Source of truth for the offer: `.claude/specs/offer.md`. Copy rules: `BUSINESS.md` "Voice & honesty rules", plain English, no em dashes, no prices, no headcount, no Rein.
Designer owns (do NOT edit): `src/sections/Hero.jsx`, `src/sections/offer/*`, `src/content/offer.js`, `src/components/icons/*`. If a build error comes from one of those, report it, do not fix it.
Canonical CTA wording, site-wide: **Book a free call** (designer's hero should match).

## Pushback on the brief
- **"Single entry" stays two Rollup inputs.** One app (`index.html`) plus `ph/index.html` rewritten as a static redirect with no app in it. Tested on this repo's Vite 8: `%BASE_URL%` expands inside a root-level HTML input (`/Khybrio/` in build, `/` in dev). A `public/ph/index.html` fails twice: no `%BASE_URL%` expansion, and Vite dev's HTML fallback only looks in the project root, so `/ph/` would serve the main app in dev rather than redirect.
- **Flight is cut, not rewritten.** It is 4.8 screens of pinned scroll before the offer, every zone sells the free audit, and the page now gets opened from NFC taps on phones on mobile data, which is exactly why `/ph` never had it. Owner may overrule: fallback zone copy is in section 3.
- **Problem is kept.** It names the gap in the owner's words (one item per service line) and is the one place that defuses "we already have a Facebook Page" before the offer.

## 0. Checks (write first, run before any change, expect red)
Save to the scratchpad, not the repo. Run from the repo root. Before the change, `redirect-prod`, `no-removed`, `no-taglish`, `no-emdash` and `no-ph-links` must FAIL.
```bash
npm run lint || exit 1; npm run build || exit 1
f=0; c(){ if bash -c "$2"; then echo "PASS $1"; else echo "FAIL $1"; f=1; fi; }
B='dist/index.html dist/assets/*.js'
c redirect-prod  "grep -qF 'url=/Khybrio/' dist/ph/index.html && grep -qF \"replace('/Khybrio/'\" dist/ph/index.html"
c redirect-noapp "! grep -qF 'type=\"module\"' dist/ph/index.html"
c one-app        "! ls dist/assets/ | grep -q '^ph-'"
c no-removed     "! grep -qiE 'audit|review service|retainer|managed|buong|full setup|google \+ reviews|social media|logo work|international|taglish' $B"
c no-usd         "! grep -qw USD $B"
c no-taglish     "! grep -qwE 'namin|Libreng|negosyo|Hinahanap|kami' $B"
c no-rein        "! grep -qw Rein $B && ! find dist -iname '*rein*' | grep -q ."
c no-headcount   "! grep -qiE 'three of us|four of us|(three|four)-person|tatlo' $B"
c no-emdash      "! grep -qF '—' $B"
c no-ph-links    "! grep -qE 'hreflang|ph/' $B"
c no-dead-anchor "! grep -qwE '#(pricing|automate|flight|improves|not-for|reviews|tap-demo|khybi)' $B"
exit $f
```
Calibrated against today's bundle: the only library noise was `rein` inside `beforeinput` (hence case-sensitive `-w Rein`) and `bundleType` (hence no `bundle` term). Every em dash in today's bundle is ours.
Manual, once at the end: `npm run dev`, then `curl -s -H 'Accept: text/html' localhost:5173/ph/ | grep -F 'url=/"'` prints a line; `npm run preview`, open `/Khybrio/ph/#contact` in a browser, lands on `/Khybrio/#contact`.

## 1. Routing (commit `feat(site): retire /ph page, keep /ph/ as a redirect`)
Independent of the designer; build must pass after this step with today's `App.jsx`.
- `vite.config.js`: input becomes `{ main: resolve(import.meta.dirname, 'index.html'), 'ph-redirect': resolve(import.meta.dirname, 'ph/index.html') }`. Rewrite the comment: one app at `/`; `ph/index.html` is a redirect kept for old links and NFC cards, a Vite input so `%BASE_URL%` expands. Do not delete it.
- `ph/index.html`, whole file:
```html
<!doctype html>
<html lang="en-PH">
  <head>
    <meta charset="UTF-8" />
    <!-- Redirect only, no app. Old /ph/ links and NFC cards point here, so never delete it.
         %BASE_URL% is /Khybrio/ in the build and / in dev. -->
    <script>location.replace('%BASE_URL%' + location.search + location.hash)</script>
    <meta http-equiv="refresh" content="0; url=%BASE_URL%" />
    <title>Khybrio</title>
    <!-- og:title, og:description, og:image (+ :type :width :height), twitter:card:
         copy the exact lines from index.html (section 4) so old shared links still preview. -->
  </head>
  <body><a href="%BASE_URL%">Continue to Khybrio</a></body>
</html>
```
- Delete: `src/ph.jsx`, `src/PhApp.jsx`, `src/content/ph.js`, `src/sections/PhHero.jsx`, `src/sections/Reviews.jsx`, `src/sections/NfcTapDemo.jsx`, `src/sections/MascotIntro.jsx` (the last four import `content/ph` and are used only by `PhApp`).
- Delete Rein leftovers that ship in `dist`: `public/assets/world/08-rein.png`, `public/assets/world/08-rein.webp`, `public/assets/placeholders/08-rein.svg`, the `08-rein.svg` line in `scripts/gen-placeholders.mjs`, the "08-rein is still on disk" comment in `src/lib/assets.js`.
- Not specified: remapping old hashes (`#pricing`, `#reviews`). The hash passes through; an id that no longer exists just lands at the top.

## 2. Sections and components (commit `feat(site): one page for the new offer`)
**Precondition:** all five `src/sections/offer/*.jsx` and `src/content/offer.js` exist. If not, stop after steps 1, 4 and 5 and report.

| File | Verdict | Reason |
|---|---|---|
| sections/Problem.jsx | keep, new copy | three gaps, one per service line |
| sections/Flight.jsx | delete | see pushback; zones sell the audit |
| sections/Services.jsx | delete | replaced by ServicesOverview; "automation leads, the rest feed it" contradicts standalone services |
| sections/Automate.jsx | delete | six workflows now in AutomationPackages; copy points to the free audit |
| sections/Improves.jsx | delete | automation-only, not in the page order |
| sections/NotFor.jsx | delete | automation-only, built on "the audit is free" |
| sections/Pricing.jsx | delete | Managed plan, Google + reviews, Buong setup, Site + automation bundle: all removed |
| sections/Process.jsx, About.jsx, Faq.jsx, Footer.jsx | keep, new copy | in the fixed order; About was /ph-only |
| sections/Contact.jsx | keep, new copy + 3 string fixes | below |
| components/Nav.jsx | edit | strip flight coupling, CTA label from content |
| components/SceneCounter, ScrollScene, SceneMedia, RotatingWord, InitialsAvatar | delete | flight-only |
| components/DeviceShowcase | delete | Services-only |
| components/Khybi, AnimatedNumber | delete | already imported nowhere |
| components/FlowMachine + `runLog` + hooks/usePrefersReducedMotion | delete only if nothing outside them imports them after the designer's Hero lands | designer may still use the run log |
| components/AssetImage, Logo, Magnetic, Reveal, Words | keep | shared primitives |
| hooks/useKenBurns, useProgressEffect, useScrubbedVideo; lib/sceneRegistry.js; src/scenes/ | delete | flight-only |
| lib/smoothScroll.js | remove `scrollToSceneProgress` | flight-only |
| lib/assets.js | `logoFull.alt = 'Khybrio'` | old alt had an em dash and "local digital presence" |

Rule for every delete: `grep -rn "<Name>" src` first; if a designer file imports it, keep it and report.

**`src/App.jsx`**: imports Nav, Hero, Problem, the five `./sections/offer/*` named exports, Process, About, Faq, Contact, Footer. `useEffect` unchanged. Render: `<Nav />` then `<main>`: Hero, Problem, ServicesOverview, WebsitePackages, GoogleProfile, AutomationPackages, AddOns, the existing chamber `<div className="mx-2 overflow-clip rounded-[40px] bg-teal-deep sm:mx-4 sm:rounded-[64px]">` holding only `<Process />`, About, Faq, Contact; then `<Footer />`. No SceneCounter. Rewrite the docblock: one page; gap, offer, how buying works, who we are, objections, the ask.
`src/main.jsx` unchanged. Only if a designer file calls `useContent()` for offer keys: `value={{ ...site, ...offer }}`. `context.jsx`: comment only (one page, one copy set).

**`src/components/Nav.jsx`**: remove `scrollToSceneProgress`, `subscribeActiveIndex` (and `ScrollTrigger` if then unused) from imports; remove `activeZone`, `atFlight`, `zoneRef`, `flightRef` and their effects; in `read()` drop the `getById('flight')` block and the `item.zoneRange` branch; `goItem(item)` becomes `go(item.id)`; both hardcoded `Get started` labels become `navCta.label` from `useContent()`. Docblock: drop "the dark flight".

**`src/sections/Contact.jsx`**: `_subject` becomes `` `Free call request: ${data.business || data.name || 'new enquiry'}` ``; success text `Got it. We will reply within a day.`; set `_replyto` only when `data.contact?.includes('@')` (the field now accepts a mobile number, and a phone in `_replyto` risks Formspree rejecting the send).

## 3. `src/content/site.js` (same commit as step 2)
Exports after: `brand, nav, navCta, problem, process, about, faq, contact, footer`. Delete `milestones, flight, improves, services, automate, pricing, notFor`, `brand.tagline`, `footer.altPage`. Delete `hero` and `runLog` only once nothing imports them (see table). Top comment: one page; hero and offer copy live in `content/offer.js`; voice rules in BUSINESS.md.
```js
export const brand = { name: 'Khybrio', location: 'Zamboanga City, Philippines' }
export const nav = [
  { id: 'websites', label: 'Websites', hint: 'Starter, Standard and Premium sites' },
  { id: 'google', label: 'Google profile', hint: 'Your listing on Google Search and Maps' },
  { id: 'automation', label: 'Automation', hint: 'One workflow, or up to five connected' },
  { id: 'process', label: 'How it works', hint: 'Free call, written quote, build, handover' },
  { id: 'faq', label: 'FAQ', hint: 'Price, timing, ownership and fees' },
]
export const navCta = { label: 'Book a free call' }
export const problem = {
  eyebrow: 'Where customers slip away',
  title: 'Three gaps that quietly cost a small business customers',
  items: [
    { title: 'Not on Google Maps', body: 'Someone nearby searches for what you sell. Your Facebook Page does not show up on Google Maps, so they go to the shop that does. Keep the Page. This is a different place people look.' },
    { title: 'Nowhere to send people', body: 'A customer wants your prices, your hours or a booking late at night. If the only way to ask is a message that waits for a reply, some of them will not wait.' },
    { title: 'The same work, by hand', body: 'Orders copied out of Messenger, invoices chased one at a time, the same reply typed all day. It eats hours, and every re-type is a chance to get something wrong.' },
  ],
}
export const process = {
  eyebrow: 'How it works',
  title: 'Four steps. The first one is free.',
  body: 'You get a fixed price before any work starts. If we think you do not need us, we will say so on the call.',
  steps: [
    { n: '01', when: 'Free', name: 'A free call', body: 'Tell us about your business and what is getting in the way. We tell you which of our services would help, if any, and what we would build. No obligation.' },
    { n: '02', when: 'In writing', name: 'A fixed quote', body: 'We send a written quote with what we will build, a target date and one fixed price. No hourly billing. Nothing starts until you agree to it.' },
    { n: '03', when: 'To the agreed date', name: 'We build it', body: 'We build what the quote says and show you as we go. Automations run alongside the way you work now until they have proven themselves on your real work.' },
    { n: '04', when: 'Yours to keep', name: 'Handover', body: 'The domain, the website, the Google profile, the automations and every account are in your name, with a written walkthrough. If you never speak to us again, it keeps running.' },
  ],
}
export const about = {
  eyebrow: 'Who we are',
  title: 'A small studio in Zamboanga City, for businesses like the ones down the street.',
  body: 'We kept seeing the same things around the city. A barbershop with a queue outside and no pin on the map. A bakery whose Facebook Page went quiet two years ago. An owner typing up Messenger orders after closing. The tools that fix this are not expensive or complicated. Nobody had explained them plainly to small business owners, so we started Khybrio to do that.',
  points: [
    { label: 'Based in Zamboanga City', value: 'We meet in person around the city and take on work from anywhere in the Philippines.' },
    { label: 'You talk to the people doing the work', value: 'No account managers and no passing you around.' },
    { label: 'New, and honest about it', value: 'We will not show invented reviews or a made-up portfolio. Real client work goes up here only with the client’s permission.' },
  ],
}
export const faq = {
  eyebrow: 'Before you ask',
  title: 'Questions owners usually ask',
  items: [
    { q: 'How much does it cost?', a: 'It depends on what you need, so we do not post prices here. A number on this page would be wrong for half the people reading it. Book a free call, tell us what you need, and we send one fixed price in writing. It does not change once you agree to it, and we do not bill by the hour.' },
    { q: 'How long does it take?', a: 'Your written quote has a target date. As a rough guide, a Google profile is about a week of our work, and a website or a single workflow is two to four weeks. Bigger builds take longer. The date holds as long as we have your photos, details and access to your accounts, which is usually what decides the pace. Google can take one to two weeks to verify a profile on its own, and that part is out of our hands.' },
    { q: 'Who owns the website, the profile and the automations?', a: 'You do. The domain, the website, the Google Business Profile, the automations and every account are set up in your name from the start. If you stop working with us, nothing is switched off and nothing is held back.' },
    { q: 'Are there any ongoing fees?', a: 'There is no monthly fee to us. A website needs a domain and hosting, and you pay those yearly fees directly to the provider, in your name. If an automation needs a paid tool of its own, the quote says so before you agree to anything.' },
    { q: 'What are add-ons?', a: 'Extras on top of a package, like a Google Maps embed, an extra page, a booking system on a Starter site, or an NFC card for your counter. Each one sits in a small, medium or large band by how long it takes, and every add-on in a band costs the same. Physical items like NFC cards and stands each have their own fixed price.' },
    { q: 'Do I need all three services?', a: 'No. Each one is sold on its own. You might only need your Google profile fixed, or one task automated. On the call we tell you what would actually help, even if it is one small thing.' },
    { q: 'I already have a Facebook Page. Do I need this?', a: 'Keep your Page. It works well for people who already know you. It does not show up when someone searches Google Maps for what you sell nearby, which is what a Google Business Profile is for. A website adds a place you fully control that can take bookings and inquiries.' },
    { q: 'Where are you based?', a: 'Zamboanga City, Philippines. We can meet in person around the city, and we take on work from anywhere in the Philippines by call, email or Messenger.' },
  ],
}
export const contact = {
  eyebrow: 'Book a free call',
  title: 'Tell us about your business. We will tell you what would help.',
  body: 'Send a short message and we will set up a free call at a time that suits you. You get a straight answer, and a fixed quote if you want one. No obligation.',
  submitLabel: 'Book my free call',
  cooldownNote: 'That one is already with us, so no need to send it twice. We will reply within a day. If something urgent comes up, message us on Facebook or Instagram.',
  fallbackNote: 'Our form is having trouble. Email khybrio.org@gmail.com or message us on Facebook or Instagram, and we will set up the call from there.',
  formEndpoint: 'https://formspree.io/f/xrpzzyre',
  fields: {
    name: { label: 'Your name', placeholder: 'Juan Dela Cruz' },
    business: { label: 'Business name', placeholder: 'Your business' },
    contact: { label: 'Email or mobile number', placeholder: 'you@email.com or 09XX XXX XXXX' },
    message: { label: 'What does your business do, and what do you need?', placeholder: 'e.g. We run a bakery. We are not on Google Maps, and we take orders through Messenger by hand.' },
  },
  channels: [ /* keep the existing three entries (Email, Facebook, Instagram) exactly as they are */ ],
}
export const footer = { blurb: 'Websites, Google Business Profiles and workflow automation for small businesses in the Philippines.' }
```
FAQ timeline numbers and the paid-tool line are **[OWNER CHECK]**: the durations are carried over from old copy, not from offer.md.
**Flight fallback (only if the owner overrules the cut):** keep the flight files; `milestones` labels `What we do`, `Free call`, `Handover`; zones: `open` eyebrow 'What we do', title `['Three services. ', 'Sold separately', '.']`, no rotations, sub 'Websites, Google Business Profiles and workflow automation. Take one, or more.' / `call` eyebrow 'Step one · Free', title `['Start with a ', 'free call', '.']`, sub 'Tell us what is getting in the way. You get a fixed price in writing before anything starts.', hotspot 'Free · No obligation' / `handover` eyebrow 'At the end · Handover', title `['Everything ', 'in your name', '.']`, sub 'Domain, site, profile, automations and every account. If you never speak to us again, it keeps running.', hotspot 'Every account in your name', ctas Book a free call `#contact` / See the services `#services`.

## 4. `index.html` (commit `chore(meta): title and share tags for the merged site`)
- `<html lang="en-PH">`.
- `<title>Khybrio | Websites, Google profiles and automation for small businesses</title>`
- description: `Websites, Google Business Profiles and workflow automation for small businesses in the Philippines. Fixed price, quoted on a free call. You own everything.`
- `og:title`: `Khybrio | Websites, Google profiles and automation`; `og:description`: `A digital services studio in Zamboanga City. Quoted on a free call, fixed price in writing, everything set up in your name.`; `og:image:alt`: `The Khybrio island, home of Khybi the mascot`.
- Remove the `hreflang` alternate and its comment. Remove the `01-hero.webp` preload and its comment unless `grep -n "A.hero" src/sections/Hero.jsx` hits (the island now only appears in the footer).
- Keep charset, viewport, theme-color, icons, og:type, og:image + type/width/height, twitter:card.

## 5. Docs (commit `docs: BUSINESS and README for the single-site offer`)
**BUSINESS.md**
- Title `# Khybrio: Business Context`. Status line: `Last updated: 2026-10-20. Status: early; first clients signed October 2026 (no client names or prices in this public repo).`
- `## One paragraph`, replace with: `Khybrio is a digital services studio in Zamboanga City, Philippines, for small businesses, starting with Philippine ones. Three services, each sold on its own: website packages (Starter, Standard, Premium), Google Business Profile setup ("Google muna", or item by item) and workflow automation (One workflow, or the Operations package of up to five). Add-ons sit on top in fixed bands. No prices on the site: every job is quoted on a free call, fixed price, in writing, and the client owns everything. One site, in English, at /. The old /ph page is a redirect to it.`
- `## The team`: Dave's "Does" becomes `First person a prospect meets; runs the free call, plain language`. Add row `| TBC | TBC | Joined by 2026-10-14; name and role not yet recorded |`. Replace the Rein line with: `Rein Garcia (social media management) left the team; social media management is not offered. The site states no headcount.`
- `## The pivot`: keep the body; first line under the heading: `> **Superseded 2026-10-20.** Kept as history. The two-page split, USD offer, review retainer, managed plan and free audit described here are retired. See "The offer".`
- Replace `## The international offer` and `## The local offer` with `## The offer (since 2026-10-20)`: copy offer.md lines 6 to 69 (Positioning through Removed) verbatim, then keep the local section's "The sales opener is a demo" paragraph under `### Selling the Google profile`. Drop "Order of sale", "Review service", packages, founding clients, six-workflow examples list.
- `## Pricing philosophy`, replace bullets with: no prices on the site, quoted on a free call; fixed price agreed in writing, no hourly billing; add-ons priced by band, physical items each at their own fixed price; client pays domain and hosting yearly, directly, in their name; client owns everything and the written agreement must assign it; no monthly fee to Khybrio.
- Voice rule 6 becomes `**Say we're new.** Being plain about it does the trust-building fake proof would have faked.`
- Brand identity: replace the "Hero signature" bullet with `Hero: see src/sections/Hero.jsx (redesigned October 2026).` and add `The footer lockup PNG still carries the old "Local digital presence" descriptor (open item).`
- Channels: Base `Zamboanga City; takes on work from anywhere in the Philippines`; Site `One page at /; ph/index.html is a static redirect to / for old links and NFC cards. Copy: src/content/site.js and src/content/offer.js.`; email note ends `undercuts the pitch`.
- `## Current status & open items (as of 2026-10-20)`: 1 form wired to Formspree; 2 real client work replaces examples only with written permission; 3 fourth member's name and role; 4 footer logo descriptor; 5 domain email.

**README.md**
- Replace lines 3 to 8 (keep the `# Khybrio` heading) with: `Marketing site for Khybrio, a digital services studio in Zamboanga City: website packages, Google Business Profile setup and workflow automation for small businesses in the Philippines. One page in English, React 19 + Vite + Tailwind v4, on GitHub Pages under /Khybrio/. ph/index.html is a static redirect to / because old links and NFC cards point at /ph/; never delete it.`
- Delete "The signature interaction", "Architecture" and "Assets"; in their place `## Structure` listing `src/content/site.js` (Problem, Process, About, FAQ, Contact, Footer, Nav copy), `src/content/offer.js` (hero and offer copy), `src/sections/` (offer/ holds the five offer sections), `src/components/`, `src/lib/` (smoothScroll, assets), `ph/index.html` (redirect only), plus one line: `The scroll-scrubbed island flight (ported from oso95/scroll-world) was removed in the October 2026 merge; it is in git history.`
- Accessibility: one line, `prefers-reduced-motion: reduce disables Lenis and the reveal animations.` "Before this is customer-ready": replace with `Open items: see BUSINESS.md, "Current status".`

## Not specified (and why)
- Layout, order inside the offer block, hero, icons: designer's. Problem keeps its lucide icons until the designer swaps them.
- Unused CSS utilities, unused `A.*` asset entries, remaining island stills, `ASSETS.md`, `HIGGSFIELD.md`, `scripts/build-flight.sh`: harmless or historical, left alone.
- Payment terms, a post-handover fix window (old packages had 30/60 days) and the founding-clients discount: none are in offer.md, so none go on the site until the owner decides.
- No test runner is added; section 0 is the gate.
