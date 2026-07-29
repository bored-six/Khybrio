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
]

export const nav = [
  // `flightProgress` jumps into the flight at a zone; `zoneRange` lights the
  // pill coral while that zone band is the one on screen. The fractions are
  // zone-centres over the seven zones: 1.5/7 for the bundle, 4.5/7 for the crew.
  { id: 'flight', label: 'The bundle', flightProgress: 0.2143, zoneRange: [1, 3] },
  { id: 'flight', label: 'The team', flightProgress: 0.6429, zoneRange: [4, 6] },
  { id: 'services', label: 'What we do' },
  { id: 'showcase', label: 'Work' },
  { id: 'pricing', label: 'Pricing' },
]

/**
 * The continuous flight: seven island zones scrubbed as one take. Each zone
 * carries an all-caps eyebrow, a headline with exactly one phrase in the coral
 * accent, and a one-line subhead — the reference's per-scene copy pattern.
 * Bundle zones (2–4) add a service hotspot with a PHP price; crew zones (5–7)
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
      rotations: ['no compromises', 'no runaround', 'done together', 'all yours'],
      sub: 'A website, an NFC tap card, and a Google Business Profile — set up together, not one at a time.',
      ctas: {
        // `flightProgress` scrolls into the flight at a specific zone rather
        // than to the flight's top. Bundle = zone 1 centre, crew = Shiek's zone.
        primary: { label: 'See the bundle', flightProgress: 0.2143 },
        secondary: { label: 'Meet the team', flightProgress: 0.6429 },
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
      sub: 'Your site, socials and number land on almost any modern phone in about a second. Reprogrammable any time.',
      hotspot: { benefit: 'Tap-to-share, no app needed' },
    },
    {
      key: 'local',
      eyebrow: 'Local presence',
      title: ['Show up when they ', 'search nearby', '.'],
      sub: 'Google Business Profile and Facebook Page claimed, filled out and set up to help you rank in local search.',
      hotspot: { benefit: 'Built to help you show up on Google Maps' },
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
      crew: { name: 'Dave Calio', role: 'First contact & onboarding', initials: 'DC', accent: 'var(--color-teal-bright)' },
    },
    {
      key: 'haiqal',
      eyebrow: 'Behind the bundle',
      title: ['Haiqal ', 'makes the case', '.'],
      sub: 'Runs presentations and follow-through, from first pitch to signed scope.',
      crew: { name: 'Haiqal Munjalin', role: 'Marketing & sales', initials: 'HM', accent: 'var(--color-coral)' },
      // Last zone of the flight, so it carries the exit CTAs.
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
  // No prices here on purpose: pricing is quoted on a call, not posted publicly.
  // See `pricing` below for the reasoning shown to the visitor.
  hotspots: [
    {
      id: 'website',
      title: 'A website that converts',
      body: 'Fast, mobile-first, built around one goal: getting the visitor to contact you.',
      position: { top: '24%', left: '12%' },
    },
    {
      id: 'nfc',
      title: 'NFC tap card',
      body: 'Tap it on almost any modern phone. Your site, socials and number land in about a second. Reprogrammable any time.',
      position: { top: '52%', left: '44%' },
    },
    {
      id: 'local',
      title: 'Local presence',
      body: 'Google Business Profile and Facebook Page claimed, filled out and set up to help you rank in local search.',
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

// PLACEHOLDER reviews — realistic Filipino-flavoured demo content for the
// showcase, with a little Tagalog mixed in. Replace with genuine, permissioned
// quotes before treating these as real client testimonials.
export const testimonials = {
  eyebrow: 'Sample reviews — real ones coming soon',
  title: 'Straight from the shop floor',
  // Every item carries `sample: true`, which renders a "Sample" tag on the card
  // so nothing here reads as a real, attributed endorsement.
  items: [
    { quote: 'Sobrang bilis mag-set up! Isang linggo lang, may tumatawag na from Google. Salamat, Khybrio!', name: 'Aling Nena', business: 'Nena’s Sari-sari Store', rating: 5, sample: true },
    { quote: 'Ang galing ng tap card. Isang tap lang, nasa phone na nila lahat — website, FB, number. Astig!', name: 'Kuya Jun', business: 'JR Barbershop', rating: 5, sample: true },
    { quote: 'Buhay na buhay na ang Facebook page namin ngayon. Nasasagot na agad ang mga message. Solid.', name: 'Ate Grace', business: 'Grace Milk Tea', rating: 5, sample: true },
    { quote: 'From invisible to number one sa search sa area namin. Sulit na sulit, promise.', name: 'Mark', business: 'MJ Auto Repair', rating: 5, sample: true },
    { quote: 'Ang bilis mag-load kahit mahina ang signal. Napapansin talaga ng mga customer. Professional tingnan.', name: 'Dr. Aisha', business: 'Bright Smile Dental', rating: 5, sample: true },
    { quote: 'Very patient sila mag-explain, walang arte, walang masyadong technical terms. Madaling kausap.', name: 'Tita Beth', business: 'Beth’s Catering', rating: 4, sample: true },
    { quote: 'Isang bayad, kumpleto na — website, card, at Google. Hindi na ako naghahabol ng tatlong tao.', name: 'Paolo', business: 'Paolo Films', rating: 5, sample: true },
    { quote: 'Maganda ang trabaho at may follow-up pa pagkatapos. Hindi ka iiwan. Highly recommended!', name: 'Inay Lita', business: 'Lita’s Bakeshop', rating: 5, sample: true },
  ],
}

// Count-up strip. Deliberately honest facts (not fabricated business counts):
// three services in one bundle, typical setup time, one tap, full ownership.
export const stats = [
  { value: 3, suffix: '-in-1', label: 'website, NFC card & local presence' },
  // A week, not 48h. The old figure was a promise we'd have had to break the
  // first time a client was slow with photos or Google sat on a verification.
  { value: 7, suffix: ' days', label: 'target build time, once your photos are in' },
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
  reassurances: [
    'You own everything',
    'No lock-in contracts',
    'Free call, no obligation — honest advice even if you don’t buy',
  ],
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
        'Google Business Profile set up to help you rank locally',
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
      // Scoped down from open-ended "social media management across
      // platforms" — that was a full-time promise with nobody behind it once
      // Rein left. A fixed monthly post count is something three people can
      // actually deliver every month without it quietly slipping.
      features: [
        'Monthly posts on your Facebook Page and Google profile',
        'Monthly site updates & edits',
        'Hosting, domain & uptime handled',
        'Monthly one-page report',
      ],
      featured: false,
    },
  ],
  cta: { label: 'Get your quote', href: '#contact' },
  footnote:
    'Every plan starts with a free 15-minute call — no obligation, and we’ll tell you honestly if you don’t need all three. You get a clear, itemized quote before anything begins.',
}

// Short origin story. Trust with local SMEs is personal, so this says plainly
// who we are and why we started, without inflating the track record.
export const about = {
  eyebrow: 'Who you’re dealing with',
  title: 'Three people from Zamboanga who got tired of watching good shops stay invisible.',
  body: 'We kept seeing the same thing around the city — a barbershop with a queue out the door and no map pin, a bakery whose Facebook Page had been dead for two years, a clinic losing patients to a competitor with a worse service but a better website. The tools to fix it aren’t expensive or complicated. They were just never packaged for a small local business, in plain language, by someone you can actually reach. So we packaged them.',
  points: [
    { label: 'Based here', value: 'Zamboanga City — and we take on work anywhere in Mindanao.' },
    { label: 'Small on purpose', value: 'Three of us. No account managers, no handoffs, no runaround.' },
    { label: 'Plain language', value: 'We explain what we’re doing and why, without the jargon.' },
  ],
}

// Objection-handling FAQ — the questions owners actually ask on the first call.
export const faq = {
  eyebrow: 'Before you ask',
  title: 'The questions we get every time',
  items: [
    {
      q: 'How much does it cost?',
      a: 'It depends on how many pages you need and what state your profiles are in, so we quote after a quick look rather than posting a number that would be wrong for half the businesses who read it. The free 15-minute call ends with a clear, itemized quote — no pressure to take it.',
    },
    {
      q: 'How long does it take?',
      a: 'We aim for about a week to build your side of it — site, card and profiles — once we have your photos and details. The honest caveat is Google’s verification, which can take a week or two on its own and is entirely on their end. So: about a week for the build, and we’ll tell you where the Google side stands rather than leave you guessing.',
    },
    {
      q: 'I already have a Facebook Page. Do I still need this?',
      a: 'Probably — but not all of it. A Page on its own doesn’t show up on Google Maps and can’t be found by someone searching for what you sell. We’ll often clean up the Page you have rather than rebuild it, and tell you on the call which parts you genuinely don’t need.',
    },
    {
      q: 'Who owns the website and the profiles?',
      a: 'You do, completely. The domain, the site, the Google Business Profile, the Facebook Page — all registered in your name and handed over. If you ever leave us, nothing gets held hostage and nothing switches off.',
    },
    {
      q: 'What if I don’t have a logo?',
      a: 'Most shops we meet don’t. We offer a logo and mini brand kit as an add-on, and it’s included with the full bundle — your site and tap card both need one to look credible.',
    },
    {
      q: 'What happens after it goes live?',
      a: 'Nothing breaks if you do nothing. The optional care plan keeps the site updated, the pages posting and the hosting handled — but it’s a monthly add-on you can cancel anytime, not a condition of the build.',
    },
  ],
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
      body: 'A custom tap card that shares your whole presence with one tap — website, socials, number, map pin. No app, reprogrammable anytime, made for events and walk-ins.',
      points: ['One tap to share', 'No app needed', 'Reprogrammable', 'Custom, on-brand card'],
    },
    {
      icon: 'pin',
      name: 'Local presence',
      body: 'We claim, verify and properly fill out your Google Business Profile — categories, hours, service areas, photos — so you can turn up when someone nearby searches for what you sell instead of being invisible on the map.',
      points: ['Google Business Profile', 'Facebook Page rebuild', 'Built for local search', 'Reviews & posts set up'],
    },
  ],
  steps: [
    { n: '01', name: 'Free call', body: 'A quick 15 minutes to understand your business and what’s missing. No obligation — you get honest advice either way.' },
    { n: '02', name: 'We build', body: 'Site, card and profiles set up together — about a week once we have your photos.' },
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
        features: [
          'One fused letterform + icon mark',
          'SVG + PNG exports',
          'Grain-free version for favicon & small sizes',
        ],
      },
      {
        name: 'Logo + mini brand kit',
        featured: true,
        features: [
          'Everything in Logo only',
          'Locked color palette (3–4 colors + hex)',
          'Type pairing — one display + one body face',
          'One-page usage guide (do’s & don’ts, min size, clear space)',
        ],
      },
      {
        name: 'With the full bundle',
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
      // `photo` keys into A.teamPhotos in lib/assets.js. Anyone without one
      // falls back to the initials avatar, so the grid stays even.
      photo: 'shiek',
      role: 'Developer',
      accent: 'var(--color-teal-deep)',
      bio: 'Builds and maintains every site we ship and the technical side of the whole bundle — from the first line of code to hosting and uptime.',
      focus: ['Web development', 'NFC setup', 'Hosting & uptime'],
    },
    {
      name: 'Dave Calio',
      initials: 'DC',
      photo: 'dave',
      role: 'First contact & onboarding',
      accent: 'var(--color-teal-bright)',
      bio: 'Usually the first person you meet. Walks owners through what the bundle actually changes for their business — in plain terms, no jargon.',
      focus: ['First contact', 'Client presentations', 'Onboarding'],
    },
    {
      name: 'Haiqal Munjalin',
      initials: 'HM',
      photo: 'haiqal',
      role: 'Marketing & sales',
      accent: 'var(--color-coral)',
      bio: 'Runs presentations and follow-through, from the first pitch all the way to a signed, clearly-scoped agreement.',
      focus: ['Pitching', 'Scoping', 'Follow-through'],
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
  // Live channels. A phone number is deliberately not listed yet — add one here
  // with icon 'whatsapp' or 'viber' once there's a line someone actually answers.
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

export const footer = {
  blurb: 'Websites, NFC tap cards and local presence for businesses in Zamboanga City and across Mindanao.',
}
