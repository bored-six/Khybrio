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
  // `flightProgress` jumps into the flight at a zone; `zoneRange` lights the
  // pill coral while that zone band is the one on screen.
  { id: 'flight', label: 'The bundle', flightProgress: 0.1875, zoneRange: [1, 3] },
  { id: 'flight', label: 'The team', flightProgress: 0.5625, zoneRange: [4, 7] },
  { id: 'services', label: 'What we do' },
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
      // The coral phrase cycles through these every few seconds.
      rotations: ['no compromises', 'no runaround', 'no shortcuts', 'all yours'],
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
      hotspot: { benefit: 'Turns visitors into messages' },
    },
    {
      key: 'nfc',
      eyebrow: 'The tap card',
      title: ['One tap, ', 'everything shared', '.'],
      sub: 'Your site, socials and number land on any phone in about a second. Reprogrammable any time.',
      hotspot: { benefit: 'Tap-to-share, no app needed' },
    },
    {
      key: 'local',
      eyebrow: 'Local presence',
      title: ['Turn up when they ', 'search', '.'],
      sub: 'Google Business Profile and Facebook Page claimed, filled out and optimized for local search.',
      hotspot: { benefit: 'So you turn up on Google Maps' },
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
    // Placeholder sample projects — swap for real client work when ready.
    { name: 'Aling Nena’s', kind: 'Sari-sari store' },
    { name: 'Bright Smile Dental', kind: 'Dental clinic' },
    { name: 'JR Barbershop', kind: 'Barbershop' },
    { name: 'Grace Milk Tea', kind: 'Milk tea shop' },
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

// PLACEHOLDER reviews — realistic Filipino-flavoured demo content for the
// showcase, with a little Tagalog mixed in. Replace with genuine, permissioned
// quotes before treating these as real client testimonials.
export const testimonials = {
  eyebrow: 'What owners say',
  title: 'Straight from the shop floor',
  items: [
    { quote: 'Sobrang bilis mag-set up! Isang linggo lang, may tumatawag na from Google. Salamat, Khybrio!', name: 'Aling Nena', business: 'Nena’s Sari-sari Store', rating: 5 },
    { quote: 'Ang galing ng tap card. Isang tap lang, nasa phone na nila lahat — website, FB, number. Astig!', name: 'Kuya Jun', business: 'JR Barbershop', rating: 5 },
    { quote: 'Buhay na buhay na ang Facebook page namin ngayon. Nasasagot na agad ang mga message. Solid.', name: 'Ate Grace', business: 'Grace Milk Tea', rating: 5 },
    { quote: 'From invisible to number one sa search sa area namin. Sulit na sulit, promise.', name: 'Mark', business: 'MJ Auto Repair', rating: 5 },
    { quote: 'Ang bilis mag-load kahit mahina ang signal. Napapansin talaga ng mga customer. Professional tingnan.', name: 'Dr. Aisha', business: 'Bright Smile Dental', rating: 5 },
    { quote: 'Very patient sila mag-explain, walang arte, walang masyadong technical terms. Madaling kausap.', name: 'Tita Beth', business: 'Beth’s Catering', rating: 4 },
    { quote: 'Isang bayad, kumpleto na — website, card, at Google. Hindi na ako naghahabol ng tatlong tao.', name: 'Paolo', business: 'Paolo Films', rating: 5 },
    { quote: 'Maganda ang trabaho at may follow-up pa pagkatapos. Hindi ka iiwan. Highly recommended!', name: ' Inay Lita', business: 'Lita’s Bakeshop', rating: 5 },
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

// Mascot intro.
export const mascot = {
  eyebrow: 'Meet the guide',
  title: ['Say hi to ', 'Khybi', '.'],
  body: 'Our little guide to the whole bundle. Wherever you spot Khybi on this page, he’s pointing at something that helps your business get found and get trusted. Tiny mascot, big job.',
  points: ['Guides you through the bundle', 'Shows up where it matters', 'Always on your side'],
}

// Interactive NFC tap demo. Placeholder contact rows.
export const nfcDemo = {
  eyebrow: 'The tap card',
  title: 'Tap it. Everything’s shared.',
  body: 'One tap puts your website, socials, number and map pin straight onto their phone — no app, no typing. Hover the card to see it.',
  rows: [
    { icon: 'globe', label: 'yourbusiness.ph' },
    { icon: 'instagram', label: '@yourbiz' },
    { icon: 'facebook', label: 'facebook.com/yourbiz' },
    { icon: 'phone', label: '+63 9XX XXX XXXX' },
  ],
}

export const pricing = {
  eyebrow: 'What you get',
  // Prices are shared privately with clients, not on the public site. Instead
  // of numbers, each plan sells the outcome and points to a free call.
  title: 'Pick the fit. We size the rest.',
  body: 'You own everything we build — no lock-in, nothing held hostage if you leave. We tailor each plan to your business, so the price comes on a quick call, not a generic sticker.',
  reassurances: ['You own everything', 'No lock-in contracts', 'Free 15-minute call first'],
  tiers: [
    {
      name: 'Essential',
      label: 'For a fresh start',
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
      label: 'Most picked',
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
      name: 'Care plan',
      label: 'Optional add-on',
      body: 'Keep it all fed and growing after launch. Add to either plan, cancel anytime.',
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
  cta: { label: 'Get your quote', href: '#contact' },
  footnote:
    'Every plan starts with a free 15-minute call. You get a clear, itemised quote before anything begins.',
}

// "What we do" — the three services in depth, plus how we work.
export const services = {
  eyebrow: 'What we do',
  title: 'Three things every local business needs — done right, done together.',
  body: 'Most shops are missing all three and stitching them from different people. We build them as one so they actually point at each other.',
  items: [
    {
      icon: 'globe',
      name: 'A website that converts',
      body: 'A fast, mobile-first site built around one job: turning a visitor into a message or a call. Clean design, your photos and words, loads even on weak data.',
      points: ['Mobile-first & fast', 'Contact-focused layout', 'Your branding & copy', 'Analytics built in'],
    },
    {
      icon: 'nfc',
      name: 'NFC tap card',
      body: 'A premium card that shares your whole presence with one tap — website, socials, number, map pin. No app, reprogrammable anytime, perfect for events and walk-ins.',
      points: ['One tap to share', 'No app needed', 'Reprogrammable', 'Premium, on-brand card'],
    },
    {
      icon: 'pin',
      name: 'Local presence',
      body: 'We claim, fill out and optimize your Google Business Profile and Facebook Page so you actually turn up when people nearby search for what you sell.',
      points: ['Google Business Profile', 'Facebook Page rebuild', 'Optimized for local search', 'Reviews & posts set up'],
    },
  ],
  steps: [
    { n: '01', name: 'Free call', body: 'A quick 15 minutes to understand your business and what’s missing.' },
    { n: '02', name: 'We build', body: 'Site, card and profiles set up together — usually live within days.' },
    { n: '03', name: 'You go live', body: 'You get found, you get trusted. Optional care plan keeps it growing.' },
  ],
  // Standalone Logo & Branding add-on — a natural first step, not a bolt-on.
  branding: {
    eyebrow: 'Add-on · Logo & branding',
    title: 'No logo yet? Start here.',
    body: 'Most shops we meet have no logo — just a name in a random font, or nothing at all. Since your website and tap card both need one to look credible, a clean mark is the natural first step. Honest heads-up: this is a modern, AI-assisted mark refined into clean vector — not a multi-week brand-agency rebrand. Fast, affordable, and fully yours.',
    tiers: [
      {
        name: 'Logo only',
        price: '₱3,000',
        features: [
          'One fused letterform + icon mark',
          'SVG + PNG exports',
          'Grain-free version for favicon & small sizes',
        ],
      },
      {
        name: 'Logo + mini brand kit',
        price: '₱6,000',
        featured: true,
        features: [
          'Everything in Logo only',
          'Locked colour palette (3–4 colours + hex)',
          'Type pairing — one display + one body face',
          'One-page usage guide (do’s & don’ts, min size, clear space)',
        ],
      },
      {
        name: 'With the full bundle',
        price: 'Free',
        features: [
          'Logo + mini brand kit, included',
          'Because your site & card need it anyway',
        ],
      },
    ],
  },
}

// Detailed "Meet the team" — richer than the crew zones in the flight.
export const team = {
  eyebrow: 'Behind the bundle',
  title: 'Meet the team',
  body: 'Small on purpose. You always know exactly who you’re talking to — no account managers, no runaround.',
  members: [
    {
      name: 'Shiek Abdurahman',
      initials: 'SA',
      role: 'Developer',
      accent: 'var(--color-teal-deep)',
      bio: 'Builds and maintains every site we ship and the technical side of the whole bundle — from the first line of code to hosting and uptime.',
      focus: ['Web development', 'NFC setup', 'Hosting & uptime'],
    },
    {
      name: 'Dave Calio',
      initials: 'DC',
      role: 'Cold pitch & client presentations',
      accent: 'var(--color-teal-bright)',
      bio: 'Usually the first person you meet. Walks owners through what the bundle actually changes for their business — in plain terms, no jargon.',
      focus: ['First contact', 'Client presentations', 'Onboarding'],
    },
    {
      name: 'Haiqal Munjalin',
      initials: 'HM',
      role: 'Cold pitch & client presentations',
      accent: 'var(--color-coral)',
      bio: 'Runs presentations and follow-through, from the first pitch all the way to a signed, clearly-scoped agreement.',
      focus: ['Pitching', 'Scoping', 'Follow-through'],
    },
    {
      name: 'Rein Garcia',
      initials: 'RG',
      role: 'Social media management',
      accent: 'var(--color-teal-deep)',
      bio: 'Keeps your pages alive across every platform once the bundle goes live — posts, replies and the little things that keep a page looking open for business.',
      focus: ['Social media', 'Content', 'Community replies'],
    },
  ],
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
    { label: 'Messenger', handle: 'm.me/khybrio', href: '#', icon: 'messenger' },
    { label: 'WhatsApp', handle: '+63 XXX XXX XXXX', href: '#', icon: 'whatsapp' },
    { label: 'Viber', handle: '+63 XXX XXX XXXX', href: '#', icon: 'viber' },
  ],
}

export const footer = {
  blurb: 'Websites, NFC tap cards and local presence for businesses in Zamboanga City and across Mindanao.',
}
