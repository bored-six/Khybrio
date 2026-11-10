/**
 * Copy and data for the hero and the offer: three packages and the six
 * services behind them.
 *
 * Source of truth is the Khybrio Operational Map (FigJam, Strategy and Brand
 * panels, read 2026-11-10): the six service groups under "B2B SaaS Services",
 * the tagline "Your Business, Always Connected.", and the positioning
 * Systems, Marketing, Optimization. The three packages follow the ladder used
 * in a recent client proposal: Get found, Get booked, Get ahead, each one
 * building on the last, each with a setup part and a monthly part.
 *
 * House rules for every string in this file:
 *   - No prices. Everything ends in a free call where the quote happens.
 *   - No em dashes, no hype words. Plain sentences.
 *   - Anything illustrative carries an "Example" badge in the component.
 *     The badge is load-bearing (BUSINESS.md, voice rule 2).
 *   - Hedge what we do not control: Google's verification timing is theirs,
 *     never a promised ranking, never a promised number of customers.
 *
 * Components import from here directly, not through the content context.
 */

/** The one place every package and section ends up. */
export const quoteCta = { label: 'Get a quote on a free call', href: '#contact' }

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: 'Based in Zamboanga City',
  // The coral phrase cannot wrap: the squiggle is one SVG under it. At the
  // hero's smallest size (2.4rem) "always connected." measures about 290px,
  // inside a 375px phone's 335px column. Keep it this short if rewritten.
  title: ['Your business, ', 'always connected', '.'],
  sub: 'We put small businesses on Google, Facebook and their own website, connect the bookings and messages behind it, and keep it all running every month. One fixed price, agreed on a free call.',
  ctas: {
    primary: { label: 'Book a free call', href: '#contact' },
    secondary: { label: 'See the packages', href: '#packages' },
  },
  trust: ['Fixed price, in writing', 'Live in about two weeks', 'You own everything'],
  // The hero's card: one customer passing through the three packages. It is
  // a story, not a menu, and it is invented, so the badge stays.
  journey: {
    title: 'One customer, start to finish',
    badge: 'Example',
    steps: [
      {
        key: 'google',
        tag: 'Get found',
        title: 'They find you on Google Maps',
        preview: { name: 'Your Business', line: 'Open today until 6 PM' },
      },
      {
        key: 'site',
        tag: 'Get booked',
        title: 'They book a time on your site',
        preview: { day: 'Sat', time: '10:00 AM', button: 'Book' },
      },
      {
        key: 'flow',
        tag: 'Get ahead',
        title: 'It lands on your dashboard',
        preview: { message: 'Booked for Saturday, 10:00 AM. See you then.', logged: 'Added to today’s bookings' },
      },
    ],
  },
}

/* ── Packages (#packages) ─────────────────────────────────────────────── */

export const packages = {
  eyebrow: 'Packages',
  title: 'Three packages. Each one builds on the last.',
  body: 'Setup puts everything in place. The monthly part keeps it accurate, active and working. Both are fixed in writing before we start.',
  setupLabel: 'We set up',
  monthlyLabel: 'Every month',
  tiers: [
    {
      key: 'found',
      // Crop into the island render: asset key in A, the point to zoom on
      // (as a share of the frame), and how far in. Same camera in all three,
      // so similar zooms keep Khybi the same size across the set.
      scene: { asset: 'signalTower', x: '52%', y: '45%', zoom: 1.3 },
      name: 'Get found',
      line: 'Be on the map, and look trustworthy when people check.',
      inherits: null,
      setup: [
        'Google Business Profile claimed, verified and filled in',
        'Your pin on Google Maps',
        'A proper Facebook Page, linked to Google',
        'A simple website people can look through',
        'NFC review cards for your counter',
      ],
      monthly: ['Google upkeep: posts, photos, correct hours', 'Every review answered', 'A monthly report'],
    },
    {
      key: 'booked',
      scene: { asset: 'webDesk', x: '55%', y: '35%', zoom: 1.35 },
      name: 'Get booked',
      line: 'Customers can book or order at any hour, without waiting on a reply.',
      inherits: 'Everything in Get found, plus',
      featured: 'Our pick',
      setup: [
        'A website with online booking or ordering',
        'A chatbot that answers and books in Messenger',
        'A photo day at your place',
      ],
      monthly: ['Website care and small changes', 'Chatbot upkeep', 'Regular posts and video'],
    },
    {
      key: 'ahead',
      scene: { asset: 'haiqal', x: '50%', y: '42%', zoom: 1.4 },
      name: 'Get ahead',
      line: 'Run the business from one screen, and reach people who do not follow you yet.',
      inherits: 'Everything in Get booked, plus',
      setup: [
        'A live dashboard for bookings and sales',
        'Orders and leads logged on their own',
        'Google and Meta ads, set up to track leads',
      ],
      monthly: ['Dashboard upkeep and support', 'More content, every week', 'Ads managed and reported'],
    },
  ],
  note: 'Need only one piece? Every service below can be quoted on its own.',
}

/* ── Services (#services) ─────────────────────────────────────────────── */

/**
 * The six service groups from the map, under the three pillars of the
 * positioning line: Systems is the foundation, Marketing is local presence
 * and content, Optimization is care and monthly reporting.
 */
export const services = {
  eyebrow: 'Everything we do',
  title: 'Systems, marketing and the upkeep behind them.',
  body: 'The packages are made from these. Take any of them on their own if that is all you need.',
  pillars: [
    {
      key: 'systems',
      name: 'Systems',
      scene: { asset: 'shiek', x: '48%', y: '40%', zoom: 1.25 },
      line: 'The foundation',
      items: [
        {
          key: 'website',
          icon: 'site',
          name: 'Website',
          list: ['Mobile-first design', 'Landing pages', 'Online booking', 'Direct ordering', 'Branch finder and menu', 'Domain setup'],
        },
        {
          key: 'systems',
          icon: 'flow',
          name: 'Systems and automation',
          list: ['AI chatbot', 'Order logging', 'Lead tracking', 'Live reporting dashboard', 'Custom software'],
        },
      ],
    },
    {
      key: 'marketing',
      scene: { asset: 'nfcKiosk', x: '55%', y: '40%', zoom: 1.3 },
      name: 'Marketing',
      line: 'Be found and remembered',
      items: [
        {
          key: 'presence',
          icon: 'pin',
          name: 'Local presence and reviews',
          list: ['Google Business Profile', 'Google Maps listing', 'Facebook Page setup and linking', 'Review requests, replies and reports'],
        },
        {
          key: 'content',
          icon: 'content',
          name: 'Content management',
          list: ['Content marketing and SEO', 'Newsletters', 'Photo and video', 'Google and Meta ads'],
        },
        {
          key: 'nfc',
          icon: 'card',
          name: 'NFC and print',
          list: ['Business cards', 'Review cards', 'Counter stands', 'Custom design'],
        },
      ],
    },
    {
      key: 'optimization',
      scene: { asset: 'dave', x: '54%', y: '40%', zoom: 1.35 },
      name: 'Optimization',
      line: 'Keep it running',
      items: [
        {
          key: 'care',
          icon: 'care',
          name: 'Care and maintenance',
          list: ['Hosting', 'Backups', 'Monitoring', 'Content edits and small updates', 'Monthly reports'],
        },
      ],
    },
  ],
}
