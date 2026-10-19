/**
 * Copy for the site: one page, one copy set. Hero and offer copy (services,
 * packages, add-ons) live in content/offer.js. Voice and honesty rules for
 * everything written here are in BUSINESS.md.
 *
 * Components import from this file and nothing else, so copy edits never mean
 * touching JSX.
 */

export const brand = { name: 'Khybrio', location: 'Zamboanga City, Philippines' }

/**
 * The counter and dot trail run off this list: one entry per island zone in
 * the flight. It stays flat and independent of the animation so the counter can
 * advance zone-by-zone as the flight moves.
 */
export const milestones = [
  { id: 'flight', label: 'What we do' },
  { id: 'flight', label: 'Free call' },
  { id: 'flight', label: 'Handover' },
]

export const nav = [
  { id: 'websites', label: 'Websites', hint: 'Starter, Standard and Premium sites' },
  { id: 'google', label: 'Google profile', hint: 'Your listing on Google Search and Maps' },
  { id: 'automation', label: 'Automation', hint: 'One workflow, or up to five connected' },
  { id: 'process', label: 'How it works', hint: 'Free call, written quote, build, handover' },
  { id: 'faq', label: 'FAQ', hint: 'Price, timing, ownership and fees' },
]
export const navCta = { label: 'Book a free call' }

/**
 * The island flight: a short opening beat, not the page's argument. Three
 * zones, one island still each, in the order of scenes.config.js `stills`.
 *
 * Each zone carries an all-caps eyebrow, a headline with exactly one phrase in
 * the coral accent, and a one-line subhead. `hotspot` is the pill on the zone
 * (and the card on desktop), `ctas` the buttons, and `hint` the cue on zone one.
 * The detail for every zone lives in the sections below it.
 */
export const flight = {
  hint: 'Scroll to fly in',
  zones: [
    {
      key: 'open',
      eyebrow: 'What we do',
      title: ['Three services. ', 'Sold separately', '.'],
      sub: 'Websites, Google Business Profiles and workflow automation. Take one, or more.',
    },
    {
      key: 'call',
      eyebrow: 'Step one · Free',
      title: ['Start with a ', 'free call', '.'],
      sub: 'Tell us what is getting in the way. You get a fixed price in writing before anything starts.',
      hotspot: { benefit: 'Free · No obligation' },
    },
    {
      key: 'handover',
      eyebrow: 'At the end · Handover',
      title: ['Everything ', 'in your name', '.'],
      sub: 'Domain, site, profile, automations and every account. If you never speak to us again, it keeps running.',
      hotspot: { benefit: 'Every account in your name' },
      ctas: {
        primary: { label: 'Book a free call', href: '#contact' },
        secondary: { label: 'See the services', href: '#services' },
      },
    },
  ],
}

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

// [OWNER CHECK] The timeline numbers and the paid-tool line are carried over
// from the old copy, not from the offer spec.
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
  /**
   * Shown when someone submits again inside the cooldown. Reads as reassurance
   * rather than an accusation: nearly everyone who sees it is a real person
   * who was not certain the first one sent.
   */
  cooldownNote: 'That one is already with us, so no need to send it twice. We will reply within a day. If something urgent comes up, message us on Facebook or Instagram.',
  /**
   * What the visitor sees if the form cannot send. It has to name a channel
   * that works today and stay in the site's voice.
   */
  fallbackNote: 'Our form is having trouble. Email khybrio.org@gmail.com or message us on Facebook or Instagram, and we will set up the call from there.',
  /**
   * Formspree. Contact.jsx POSTs JSON with `Accept: application/json`, which is
   * exactly its AJAX contract, so no code change is needed to swap the endpoint.
   * Web3Forms is the fallback if the free tier (50/month) runs out, but it wants
   * an `access_key` in the body, so that one is not a drop-in. Netlify Forms
   * cannot work from GitHub Pages.
   */
  formEndpoint: 'https://formspree.io/f/xrpzzyre',
  fields: {
    name: { label: 'Your name', placeholder: 'Juan Dela Cruz' },
    business: { label: 'Business name', placeholder: 'Your business' },
    contact: { label: 'Email or mobile number', placeholder: 'you@email.com or 09XX XXX XXXX' },
    message: { label: 'What does your business do, and what do you need?', placeholder: 'e.g. We run a bakery. We are not on Google Maps, and we take orders through Messenger by hand.' },
  },
  channels: [
    {
      label: 'Email',
      handle: 'khybrio.org@gmail.com',
      href: 'mailto:khybrio.org@gmail.com',
      icon: 'email',
    },
    {
      label: 'Facebook',
      handle: 'facebook.com/khybrio',
      href: 'https://www.facebook.com/khybrio',
      icon: 'facebook',
    },
    {
      label: 'Instagram',
      handle: '@khybrio',
      href: 'https://www.instagram.com/khybrio',
      icon: 'instagram',
    },
  ],
}

export const footer = { blurb: 'Websites, Google Business Profiles and workflow automation for small businesses in the Philippines.' }
