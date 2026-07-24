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
 * The counter and dot trail run off this list — one entry per island zone in
 * the continuous flight. It stays flat and independent of the animation so the
 * counter can advance zone-by-zone as the single scrubbed flight moves through
 * the whole tour, exactly like the reference reel.
 */
export const milestones = [
  { id: 'flight', label: 'The island' },
  { id: 'flight', label: 'Website' },
  { id: 'flight', label: 'NFC card' },
  { id: 'flight', label: 'Local presence' },
  { id: 'flight', label: 'Shiek' },
  { id: 'flight', label: 'Dave' },
  { id: 'flight', label: 'Haiqal' },
  { id: 'flight', label: 'Rein' },
]

export const nav = [
  { id: 'problem', label: 'The problem' },
  // `flightProgress` jumps into the flight at the bundle zones instead of its top.
  { id: 'flight', label: 'The bundle', flightProgress: 0.1875 },
  { id: 'flight', label: 'The team', flightProgress: 0.5625 },
  { id: 'showcase', label: 'Work' },
  { id: 'pricing', label: 'Pricing' },
]

/**
 * The continuous flight: eight island zones scrubbed as one take. Each zone
 * carries an all-caps eyebrow, a headline with exactly one phrase in the coral
 * accent, and a one-line subhead — the reference's per-scene copy pattern.
 * Bundle zones (2–4) add a service hotspot with a PHP price; crew zones (5–8)
 * add a name/role card. `hint` shows the scroll cue only on the first zone.
 */
export const flight = {
  hint: 'Scroll to fly in',
  zones: [
    {
      key: 'hero',
      eyebrow: 'Get found. Get trusted.',
      title: ['One bundle, ', 'no compromises', '.'],
      sub: 'A website, an NFC tap card, and a Google Business Profile — set up together, not one at a time.',
      ctas: {
        // `flightProgress` scrolls into the flight at a specific zone rather
        // than to the flight's top. Bundle = zone 1 centre, crew = Shiek's zone.
        primary: { label: 'See the bundle', flightProgress: 0.1875 },
        secondary: { label: 'Meet the team', flightProgress: 0.5625 },
      },
    },
    {
      key: 'website',
      eyebrow: 'The website',
      title: ['A site that actually ', 'converts', '.'],
      sub: 'Fast, mobile-first, built around one goal: getting the visitor to contact you.',
      // PLACEHOLDER — set your real rate.
      hotspot: { price: '₱12,000 – ₱25,000' },
    },
    {
      key: 'nfc',
      eyebrow: 'The tap card',
      title: ['One tap, ', 'everything shared', '.'],
      sub: 'Your site, socials and number land on any phone in about a second. Reprogrammable any time.',
      // PLACEHOLDER — set your real rate.
      hotspot: { price: '₱1,500 – ₱3,500' },
    },
    {
      key: 'local',
      eyebrow: 'Local presence',
      title: ['Turn up when they ', 'search', '.'],
      sub: 'Google Business Profile and Facebook Page claimed, filled out and optimized for local search.',
      // PLACEHOLDER — set your real rate.
      hotspot: { price: '₱4,000 – ₱8,000' },
    },
    {
      key: 'shiek',
      eyebrow: 'Behind the bundle',
      title: ['Shiek ', 'builds', ' it all.'],
      sub: 'Every site we ship, plus the technical side of the whole bundle.',
      crew: { name: 'Shiek Abdurahman', role: 'Developer', initials: 'SA', accent: 'var(--color-teal-deep)' },
    },
    {
      key: 'dave',
      eyebrow: 'Behind the bundle',
      title: ['Dave ', 'opens', ' the door.'],
      sub: 'First contact — walks owners through what the bundle changes for their business.',
      crew: { name: 'Dave Calio', role: 'Cold pitch & client presentations', initials: 'DC', accent: 'var(--color-teal-bright)' },
    },
    {
      key: 'haiqal',
      eyebrow: 'Behind the bundle',
      title: ['Haiqal ', 'makes the case', '.'],
      sub: 'Runs presentations and follow-through, from first pitch to signed scope.',
      crew: { name: 'Haiqal Munjalin', role: 'Cold pitch & client presentations', initials: 'HM', accent: 'var(--color-coral)' },
    },
    {
      key: 'rein',
      eyebrow: 'Behind the bundle',
      title: ['Rein keeps it ', 'alive', '.'],
      sub: 'Social media management across every platform once the bundle goes live.',
      crew: { name: 'Rein Garcia', role: 'Social media management', initials: 'RG', accent: 'var(--color-teal-deep)' },
      ctas: {
        primary: { label: 'See pricing', href: '#pricing' },
        secondary: { label: 'Talk to us', href: '#contact' },
      },
    },
  ],
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

// PLACEHOLDER reviews. Every item is `sample: true` and the UI tags each card
// "Sample", so these read as filler, not real endorsements — swap them for
// genuine, permissioned quotes (real names/businesses) before launch. They use
// only first names + generic business types on purpose, so nothing here claims
// a specific real business said it.
export const testimonials = {
  eyebrow: 'What owners say',
  title: 'Straight from the shop floor',
  items: [
    { quote: 'They set everything up in a week and calls started coming in straight from Google.', name: 'Maria', business: 'Sari-sari store', rating: 5, sample: true },
    { quote: 'The tap card is a hit at events — one tap and they have all our details.', name: 'Carlo', business: 'Barbershop', rating: 5, sample: true },
    { quote: 'Our Facebook page finally looks alive, and messages actually get answered now.', name: 'Jenny', business: 'Milk tea shop', rating: 5, sample: true },
    { quote: 'Went from invisible to the first page for our area. Worth every peso.', name: 'Ryan', business: 'Auto repair', rating: 5, sample: true },
    { quote: 'Clean website that loads fast even on mobile data — clients notice.', name: 'Aisha', business: 'Dental clinic', rating: 5, sample: true },
    { quote: 'Simple to work with. They explained everything without the tech jargon.', name: 'Miguel', business: 'Catering', rating: 4, sample: true },
    { quote: 'The bundle just made sense — no chasing three different people.', name: 'Grace', business: 'Boutique', rating: 5, sample: true },
    { quote: 'Setup was painless and the follow-up support is actually there.', name: 'Paolo', business: 'Photography', rating: 5, sample: true },
  ],
}

// Count-up strip. Deliberately honest facts (not fabricated business counts):
// three services in one bundle, typical setup time, one tap, full ownership.
export const stats = [
  { value: 3, suffix: '-in-1', label: 'website, NFC card & local presence' },
  { value: 48, suffix: 'h', label: 'typical setup, start to live' },
  { value: 1, suffix: ' tap', label: 'to share everything you do' },
  { value: 100, suffix: '%', label: 'yours to keep — nothing locked in' },
]

// Interactive NFC tap demo. Placeholder contact rows.
export const nfcDemo = {
  eyebrow: 'The tap card',
  title: 'Tap it. Everything’s shared.',
  body: 'One tap puts your website, socials, number and map pin straight onto their phone — no app, no typing. Hover the card to see it.',
  rows: [
    { icon: 'globe', label: 'yourbusiness.ph' },
    { icon: 'phone', label: '+63 9XX XXX XXXX' },
    { icon: 'facebook', label: 'facebook.com/yourbiz' },
    { icon: 'mapPin', label: 'Zamboanga City' },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: 'One setup fee. Retainer optional.',
  body: 'You own everything we build. The monthly retainer is for keeping it fed — nothing is held hostage if you stop.',
  // Toggle between paying the setup once and splitting it over `splitMonths`.
  toggle: { once: 'Pay once', split: 'Split monthly', splitMonths: 6 },
  // PLACEHOLDER — set your real rates. `amount` drives the animated numbers;
  // `recurring` tiers (the retainer) ignore the split toggle.
  tiers: [
    {
      name: 'Essential',
      amount: 15000,
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
      amount: 28000,
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
      amount: 4500,
      unit: 'per month, optional',
      recurring: true,
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
    'Prices depend on scope and page count. We quote after a 15-minute call, not before. Split billing is available on request.',
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
