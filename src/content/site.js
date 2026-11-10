/**
 * Copy for the site: one page, one copy set. Hero and offer copy (packages
 * and services) live in content/offer.js. Voice and honesty rules for
 * everything written here are in BUSINESS.md.
 *
 * Components import from this file and nothing else, so copy edits never mean
 * touching JSX.
 */

export const brand = { name: 'Khybrio', location: 'Zamboanga City, Philippines' }

export const nav = [
  { id: 'packages', label: 'Packages', hint: 'Get found, Get booked, Get ahead' },
  { id: 'services', label: 'Services', hint: 'Everything the packages are made from' },
  { id: 'process', label: 'How it works', hint: 'Free call, written quote, build, handover' },
  { id: 'faq', label: 'FAQ', hint: 'Price, timing, ownership and monthly fees' },
]
export const navCta = { label: 'Book a free call' }

export const process = {
  eyebrow: 'How it works',
  title: 'Four steps. The first one is free.',
  body: 'You get a fixed price before any work starts. If we think you do not need us, we will say so on the call.',
  steps: [
    { n: '01', when: 'Free', name: 'A free call', body: 'Tell us about your business and what is getting in the way. We tell you which package or service would help, if any. No obligation.' },
    { n: '02', when: 'In writing', name: 'A fixed quote', body: 'One fixed price for the setup and one for the monthly part, with what we will build and a launch date. Nothing starts until you agree to it.' },
    { n: '03', when: 'About two weeks', name: 'We build it', body: 'The core setup goes live in about two weeks once we have your photos and details. Revisions on the setup are free until it matches what we agreed.' },
    { n: '04', when: 'Every month', name: 'We keep it running', body: 'Everything is in your name from day one. Each month we keep it accurate and active, and send a report so you can judge the results yourself.' },
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
    { q: 'How much does it cost?', a: 'It depends on your business, so we do not post prices here. Book a free call and we send a fixed price in writing: one for the setup and one for the monthly part. It does not change once you agree to it, and we do not bill by the hour.' },
    { q: 'Why is there a monthly part?', a: 'A listing left alone goes stale, and that is when people stop trusting it. The monthly part keeps your hours, photos and posts correct, answers your reviews, keeps the site and chatbot working, and ends with a report. If you only want a one-time setup of a single service, we can quote that too.' },
    { q: 'How long does it take?', a: 'The core setup goes live in about two weeks once we have your photos, details and access to your accounts. Bigger builds like a dashboard or custom software take longer, and the quote says when. Google can take a week or two to verify a profile on its own, and that part is out of our hands.' },
    { q: 'Who owns the website, the profile and the accounts?', a: 'You do. The domain, the website, the Google and Facebook profiles and every account are set up in your name from the start, with full access for you at all times. If you stop working with us, nothing is switched off and nothing is held back.' },
    { q: 'I already have a Facebook Page. Do I need this?', a: 'Keep your Page. We tidy it up and link it to Google. It does not show up when someone searches Google Maps for what you sell nearby, which is what a Google Business Profile is for, and a website gives people a place to book that you fully control.' },
    { q: 'Where are you based?', a: 'Zamboanga City, Philippines. We meet in person around the city, and take on work from anywhere in the Philippines by call, email or Messenger.' },
  ],
}

export const contact = {
  // The section's headline, questions and result copy live in content/quiz.js.
  // This keeps what is about reaching us: the relay endpoint and the channels.
  channelsLabel: 'Or message us directly',
  /**
   * Formspree. Contact.jsx POSTs JSON with `Accept: application/json`, which is
   * exactly its AJAX contract, so no code change is needed to swap the endpoint.
   * Web3Forms is the fallback if the free tier (50/month) runs out, but it wants
   * an `access_key` in the body, so that one is not a drop-in. Netlify Forms
   * cannot work from GitHub Pages.
   */
  formEndpoint: 'https://formspree.io/f/xrpzzyre',
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

export const footer = { blurb: 'Your business, always connected. Websites, local presence, systems and monthly care for small businesses in the Philippines.' }
