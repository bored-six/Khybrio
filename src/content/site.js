/**
 * Every word, price and link on the site lives here. Components import from
 * this file and nothing else, so copy edits never mean touching JSX.
 *
 * Items marked PLACEHOLDER need real values before this goes anywhere near a
 * customer.
 */

export const brand = {
  name: 'Khybrio',
  tagline: 'Get found. Get trusted. In one bundle.',
  location: 'Zamboanga City, Philippines',
}

/**
 * The counter and dot trail run off this list. It is deliberately flat and
 * independent of how each section animates — the hero owns milestones 0 and 1
 * and switches between them mid-pin, which is exactly what makes the handoff
 * from the video scrub to the still scrubs invisible.
 */
export const milestones = [
  { id: 'hero', label: 'The island' },
  { id: 'problem', label: 'The problem' },
  { id: 'bundle', label: 'The bundle' },
  { id: 'showcase', label: 'The work' },
  { id: 'people', label: 'The people' },
  { id: 'contact', label: 'Get started' },
]

export const nav = [
  { id: 'problem', label: 'The problem' },
  { id: 'bundle', label: 'The bundle' },
  { id: 'showcase', label: 'Work' },
  { id: 'people', label: 'People' },
  { id: 'pricing', label: 'Pricing' },
]

export const hero = {
  eyebrow: 'Digital presence, Zamboanga City',
  title: 'Get found. Get trusted. In one bundle.',
  body: 'A professional website, an NFC tap card, and a Google Business Profile that actually turns up in search — set up for your business in one go.',
  cta: { label: 'See the bundle', href: '#bundle' },
  secondary: { label: 'Talk to us', href: '#contact' },
  hint: 'Scroll to fly in',
}

export const problem = {
  eyebrow: 'Why customers pick someone else',
  title: 'Three quiet leaks, all of them fixable',
  items: [
    {
      title: 'They search. You don’t show up.',
      body: 'Someone looks for what you sell and finds nothing — no site, no map pin, no hours. So they call the shop that does show up.',
    },
    {
      title: 'Your Facebook Page went quiet.',
      body: 'Last post two years ago, messages unread, no address on file. To a first-time customer, that reads as closed.',
    },
    {
      title: 'Cards nobody scans.',
      body: 'Paper cards get pocketed and lost. A tap card puts your site, socials and number straight onto their phone in about a second.',
    },
  ],
}

export const bundle = {
  eyebrow: 'One package, three fixes',
  title: 'The bundle',
  body: 'We don’t sell these separately. They only work as a set — the card points at the site, the site feeds the profile, the profile brings the search traffic.',
  // PLACEHOLDER — set your real rates. These are structural stand-ins only.
  hotspots: [
    {
      id: 'website',
      title: 'A website that converts',
      body: 'Fast, mobile-first, built around one goal: getting the visitor to contact you.',
      price: '₱12,000 – ₱25,000',
      position: { top: '24%', left: '12%' },
    },
    {
      id: 'nfc',
      title: 'NFC tap card',
      body: 'Tap it on any phone. Your site, socials and number land instantly. Reprogrammable any time.',
      price: '₱1,500 – ₱3,500',
      position: { top: '52%', left: '44%' },
    },
    {
      id: 'local',
      title: 'Local presence',
      body: 'Google Business Profile and Facebook Page claimed, filled out and optimized so you turn up in local search.',
      price: '₱4,000 – ₱8,000',
      position: { top: '30%', left: '72%' },
    },
  ],
}

export const showcase = {
  eyebrow: 'Recent work',
  title: 'Built for businesses like yours',
  body: 'Every site ships mobile-first, loads fast on a weak connection, and puts the contact button where a thumb already is.',
  // PLACEHOLDER — swap for real client names once you have sign-off to use them.
  samples: [
    { name: 'Sample project one', kind: 'Restaurant' },
    { name: 'Sample project two', kind: 'Dental clinic' },
    { name: 'Sample project three', kind: 'Auto services' },
    { name: 'Sample project four', kind: 'Retail shop' },
  ],
}

export const people = {
  eyebrow: 'Behind the bundle',
  title: 'The People',
  body: 'Four of us. Small enough that you always know who you are talking to.',
  members: [
    {
      name: 'Shiek Abdurahman',
      initials: 'SA',
      role: 'Developer',
      blurb: 'Builds and maintains every site we ship, plus the technical side of the whole bundle.',
      accent: 'var(--color-teal-deep)',
    },
    {
      name: 'Dave Calio',
      initials: 'DC',
      role: 'Cold pitch & client presentations',
      blurb: 'First contact. Walks owners through what the bundle actually changes for their business.',
      accent: 'var(--color-teal-bright)',
    },
    {
      name: 'Haiqal Munjalin',
      initials: 'HM',
      role: 'Cold pitch & client presentations',
      blurb: 'Runs presentations and follow-through, from first pitch to signed scope.',
      accent: 'var(--color-coral)',
    },
    {
      name: 'Rein Garcia',
      initials: 'RG',
      role: 'Social media management',
      blurb: 'Keeps the pages alive across every platform once the bundle goes live.',
      accent: 'var(--color-teal-deep)',
    },
  ],
}

// PLACEHOLDER — real reviews only. Fabricated testimonials attributed to
// plausible-sounding local businesses are a legal and reputational problem,
// so these are visibly blank until you have genuine quotes with permission.
export const testimonials = {
  eyebrow: 'What owners say',
  title: 'Straight from the shop floor',
  items: [
    { quote: null, name: null, business: null, rating: 5 },
    { quote: null, name: null, business: null, rating: 5 },
    { quote: null, name: null, business: null, rating: 5 },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: 'One setup fee. Retainer optional.',
  body: 'You own everything we build. The monthly retainer is for keeping it fed — nothing is held hostage if you stop.',
  // PLACEHOLDER — set your real rates.
  tiers: [
    {
      name: 'Essential',
      price: '₱15,000',
      unit: 'one-time setup',
      body: 'For a business that needs to exist online, properly, this month.',
      features: [
        'Up to 4-page website',
        '1 NFC tap card, programmed',
        'Google Business Profile claimed & filled',
        'Facebook Page cleanup',
        'Mobile-first, fast on weak signal',
      ],
      featured: false,
    },
    {
      name: 'Complete',
      price: '₱28,000',
      unit: 'one-time setup',
      body: 'The full bundle, tuned for businesses that live on local search.',
      features: [
        'Up to 8-page website with contact forms',
        '5 NFC tap cards, programmed',
        'Google Business Profile optimized for local ranking',
        'Facebook Page rebuild + 2 weeks of starter posts',
        'Photo & copy pass across all three',
        'Analytics wired up',
      ],
      featured: true,
    },
    {
      name: 'Retainer',
      price: '₱4,500',
      unit: 'per month, optional',
      body: 'Add on to either tier. Cancel whenever.',
      features: [
        'Social media management across platforms',
        'Monthly site updates & edits',
        'Google Business Profile posts',
        'Hosting, domain & uptime handled',
        'Monthly one-page report',
      ],
      featured: false,
    },
  ],
  footnote:
    'Prices depend on scope and page count. We quote after a 15-minute call, not before.',
}

export const contact = {
  eyebrow: 'Get started',
  title: 'Tell us what you sell. We’ll tell you what’s missing.',
  body: 'A short message is enough. We reply on whichever of these you already use.',
  // PLACEHOLDER — any endpoint accepting a JSON POST (Formspree, Netlify
  // Forms, your own handler). Until this is set the form tells the visitor it
  // isn't connected instead of quietly dropping their message.
  formEndpoint: null,
  // PLACEHOLDER — drop in real handles.
  channels: [
    { label: 'Messenger', handle: 'm.me/khybrio', href: '#' },
    { label: 'WhatsApp', handle: '+63 XXX XXX XXXX', href: '#' },
    { label: 'Viber', handle: '+63 XXX XXX XXXX', href: '#' },
  ],
}

export const footer = {
  blurb: 'Websites, NFC tap cards and local presence for businesses in Zamboanga City and across Mindanao.',
}
