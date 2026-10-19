/**
 * Copy and data for the studio revamp: the hero and the five offer sections.
 *
 * Source of truth is .claude/specs/offer.md. Nothing here may add to it,
 * rename it, or bring back anything on its "Removed" list (reviews retainer,
 * managed plan, bundles, the free audit, social media, logos, USD, Taglish).
 *
 * House rules for every string in this file:
 *   - No prices. Every package ends in a free call where the quote happens.
 *   - No em dashes, no hype words. Plain sentences.
 *   - Anything illustrative carries an "Example" badge in the component.
 *     The badge is load-bearing (BUSINESS.md, voice rule 2).
 *   - Hedge what we do not control: Google's verification timing is theirs,
 *     "almost any modern phone", never a promised ranking.
 *
 * Components import from here directly, not through the content context.
 */

/** The one place every package and section ends up. */
export const quoteCta = { label: 'Get a quote on a free call', href: '#contact' }

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: 'Based in Zamboanga City',
  // The coral phrase cannot wrap: the squiggle is one SVG under it. At the
  // hero's smallest size (2.4rem) "small businesses." measures about 290px,
  // inside a 375px phone's 335px column. Keep it this short if rewritten.
  title: ['A digital services studio for ', 'small businesses', '.'],
  sub: 'We build websites, set up Google Business Profiles and automate the jobs you repeat every day. Take one service or several. Each one is quoted on a free call, at a fixed price agreed before we start.',
  ctas: {
    primary: { label: 'Book a free call', href: '#contact' },
    secondary: { label: 'See what we do', href: '#services' },
  },
  trust: ['Fixed price, agreed in writing', 'No hourly billing', 'You own everything'],
  // The hero's card: one customer passing through all three services. It is
  // a story, not a menu (the menu is the next section), and it is invented,
  // so the badge stays.
  journey: {
    title: 'One customer, start to finish',
    badge: 'Example',
    steps: [
      {
        key: 'google',
        tag: 'Google profile',
        title: 'They find you on Google Maps',
        preview: { name: 'Your Business', line: 'Open today until 6 PM' },
      },
      {
        key: 'site',
        tag: 'Website',
        title: 'They book a time on your site',
        preview: { day: 'Sat', time: '10:00 AM', button: 'Book' },
      },
      {
        key: 'flow',
        tag: 'Automation',
        title: 'The confirmation sends itself',
        preview: { message: 'Booked for Saturday, 10:00 AM. See you then.', logged: 'Added to your calendar' },
      },
    ],
  },
}

/* ── Services overview (#services) ────────────────────────────────────── */

export const servicesOverview = {
  eyebrow: 'What we do',
  title: 'Three services, each one sold on its own.',
  body: 'Pick the one you need now. Every job is quoted on a free call and fixed in writing before we start. Everything we set up is in your name: the domain, the site, the profile and the accounts.',
  tiles: {
    websites: {
      n: '01',
      name: 'Websites',
      href: '#websites',
      line: 'Three packages, from a small site that gets you contacted to one that takes bookings and payments.',
      // Page counts straight from the package table. Drawn as a bar of pages.
      tiers: [
        { name: 'Starter', pages: 3, caption: '1 to 3 pages' },
        { name: 'Standard', pages: 6, caption: 'Up to 6' },
        { name: 'Premium', pages: 10, caption: 'Up to 10' },
      ],
      link: 'See the packages',
    },
    google: {
      n: '02',
      name: 'Google Business Profile',
      href: '#google',
      line: 'Five jobs that get your listing right on Google Search and Maps.',
      bracket: 'All five together is Google muna',
      link: 'See the five',
    },
    automation: {
      n: '03',
      name: 'Workflow automation',
      href: '#automation',
      line: 'The jobs you repeat, set to run on their own.',
      rows: [
        { name: 'One workflow', nodes: 1 },
        { name: 'Operations package', nodes: 5 },
      ],
      link: 'See the six workflows',
    },
    addOns: {
      name: 'Add-ons',
      href: '#add-ons',
      line: 'Extras on top of any package, sorted by effort. Plus NFC cards and counter stands.',
      chips: ['Small', 'Medium', 'Large', 'NFC card', 'NFC stand'],
      link: 'See the add-ons',
    },
  },
}

/* ── Website packages (#websites) ─────────────────────────────────────── */

export const websites = {
  eyebrow: 'Websites',
  title: 'Pick a package and watch the site come together.',
  body: 'Every site is fast on mobile data, with the domain and hosting set up in your name. The packages differ in how much the site does for you.',
  pickerLabel: 'Choose a website package',
  tiers: [
    {
      key: 'starter',
      name: 'Starter',
      pages: 3,
      pagesLabel: '1 to 3 pages',
      line: 'A small site that tells people who you are and makes it easy to reach you.',
      addsLabel: 'What you get',
      adds: [
        'Fast on mobile, domain and hosting set up in your name',
        'Contact buttons',
        'An inquiry form',
      ],
    },
    {
      key: 'standard',
      name: 'Standard',
      pages: 6,
      pagesLabel: 'Up to 6 pages',
      line: 'Everything in Starter, plus a booking system and your Google profile linked.',
      addsLabel: 'Adds to Starter',
      adds: ['A booking system', 'One automation tied to the site', 'Your Google profile linked'],
    },
    {
      key: 'premium',
      name: 'Premium',
      pages: 10,
      pagesLabel: 'Up to 10 pages',
      line: 'Everything in Standard, and customers can pay online and get confirmed on the spot.',
      addsLabel: 'Adds to Standard',
      adds: ['Payments and confirmations', 'Up to three automations tied to the site'],
    },
  ],
  table: {
    caption: 'All three, side by side',
    featureHeader: 'What is included',
    rows: [
      { label: 'Pages', values: ['1 to 3', 'Up to 6', 'Up to 10'] },
      { label: 'Fast on mobile, domain and hosting set up in your name', values: [true, true, true] },
      { label: 'Contact buttons', values: [true, true, true] },
      { label: 'Inquiry form', values: [true, true, true] },
      { label: 'Booking system', values: [false, true, true] },
      { label: 'Payments and confirmations', values: [false, false, true] },
      { label: 'Automations tied to the site', values: [false, '1', 'Up to 3'] },
      { label: 'Google profile linked', values: [false, true, true] },
    ],
    yes: 'Included',
    no: 'Not included',
  },
  note: 'The domain and hosting are in your name. You pay their yearly fees directly to the provider.',
  // The assembling site mock. Invented content, always badged.
  mock: {
    badge: 'Example',
    url: 'yourbusiness.com',
    name: 'Your Business',
    line: 'Open Monday to Saturday, 8 AM to 6 PM',
    buttons: ['Call', 'Message'],
    form: { title: 'Send an inquiry', fields: ['Name', 'Message'], button: 'Send' },
    booking: {
      title: 'Book a time',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      times: ['9:00', '10:00', '2:00'],
      button: 'Book this time',
    },
    payment: { title: 'Pay to confirm', steps: ['Time picked', 'Paid online', 'Confirmed'] },
    pages: ['Home', 'About', 'Contact', 'Services', 'Gallery', 'Booking', 'FAQ', 'Menu', 'Team', 'Location'],
    empty: {
      booking: 'Booking system: Standard and Premium',
      payment: 'Payments and confirmations: Premium',
      dock: 'Google link and automations: Standard and Premium',
    },
    google: 'Linked to your Google profile',
    automations: ['New booking goes on your calendar', 'Payment sends a receipt', 'Reminder the day before'],
  },
}

/* ── Google Business Profile (#google) ────────────────────────────────── */

export const google = {
  eyebrow: 'Google Business Profile',
  title: 'Be on the map, with the details right.',
  body: 'When people nearby search for what you sell, your Google listing is often the first thing they see. These five jobs get it right. Take all five as one package, Google muna, or only the ones you need.',
  items: [
    {
      key: 'claim',
      title: 'Claim and verify',
      body: 'We claim the listing so you control it, then take it through Google’s verification. Google decides how long that step takes.',
    },
    {
      key: 'details',
      title: 'Hours, address and category',
      body: 'The right opening hours, the pin in the right place, and the category people actually search for.',
    },
    {
      key: 'photos',
      title: 'Photos',
      body: 'Your photos added and arranged, so people can see the place before they visit.',
    },
    {
      key: 'posts',
      title: 'First posts',
      body: 'Your first updates posted, so the listing looks active from day one.',
    },
    {
      key: 'merge',
      title: 'Fix or merge wrong listings',
      body: 'Old duplicates and wrong pins fixed or merged, so nobody lands on the wrong one.',
    },
  ],
  muna: {
    name: 'Google muna',
    line: 'All five, done together.',
    on: 'All five on',
    off: 'Switch on all five',
  },
  pickNote: 'Or take them item by item. Tap any of the five.',
  listLabel: 'The five Google profile jobs',
  card: {
    badge: 'Example',
    name: 'Your Business',
    unclaimed: 'Own this business?',
    claimed: 'Claimed and verified',
    category: 'Bakery',
    address: 'Zamboanga City',
    hours: 'Open · Closes 6 PM',
    noDetails: 'No hours, address or category',
    noPhotos: 'No photos yet',
    postTitle: 'Now taking weekend orders',
    postMeta: 'Posted this week',
    noPosts: 'No updates yet',
    duplicate: 'Two listings found. One has an old address.',
    merged: 'One listing, the right one.',
  },
}

/* ── Workflow automation (#automation) ────────────────────────────────── */

export const automation = {
  eyebrow: 'Workflow automation',
  title: 'Pick the jobs that run themselves.',
  body: 'Start with one workflow, or connect up to five as the Operations package. Tap the ones that sound like your week.',
  packages: [
    {
      key: 'one',
      name: 'One workflow',
      line: 'The one job that takes the most of your time, built end to end.',
      slots: 1,
    },
    {
      key: 'ops',
      name: 'Operations package',
      line: 'Up to five workflows, connected so they hand work to each other.',
      slots: 5,
    },
  ],
  boardLabel: 'The six workflows',
  max: 5,
  capNote: 'Five is the most one package connects.',
  emptyNote: 'Pick a workflow to see where it fits.',
  fitOne: '1 workflow picked: that fits the One workflow package.',
  fitOps: (n) => `${n} workflows picked: that fits the Operations package.`,
  demo: {
    badge: 'Example',
    lead: 'What it looks like once it runs',
    roles: ['When this happens', 'This runs', 'You get'],
  },
  workflows: [
    {
      key: 'orders',
      short: 'Orders',
      name: 'Orders from DMs and Messenger into a system',
      steps: ['A customer orders in Messenger', 'The order lands in your sheet', 'They get a confirmation back'],
    },
    {
      key: 'quotes',
      short: 'Quotes',
      name: 'Quotes and job scheduling',
      steps: ['A job request comes in', 'A quote is drafted from your rates', 'The job goes on your calendar'],
    },
    {
      key: 'invoices',
      short: 'Invoices',
      name: 'Invoice reminders and payment chasing',
      steps: ['An invoice passes its due date', 'A polite reminder goes out', 'The payment is logged when it lands'],
    },
    {
      key: 'bookings',
      short: 'Bookings',
      name: 'Bookings, forms and reminders',
      steps: ['A booking is confirmed', 'The intake form goes out', 'A reminder goes out the day before'],
    },
    {
      key: 'reports',
      short: 'Reports',
      name: 'Scheduled reports',
      steps: ['The week closes', 'Numbers are pulled from your tools', 'The report is waiting on Monday'],
    },
    {
      key: 'reply',
      short: 'First reply',
      name: 'Instant first reply',
      steps: ['A message arrives', 'A first reply goes out right away', 'It reaches you with the details'],
    },
  ],
}

/* ── Add-ons (#add-ons) ───────────────────────────────────────────────── */

export const addOns = {
  eyebrow: 'Add-ons',
  title: 'Extras, sorted by how long they take.',
  body: 'Add any of these on top of a package. Each one sits in a band by effort, and every add-on in a band costs the same.',
  samePrice: 'One price for any of these',
  cta: 'Ask about add-ons on a free call',
  // `ticks` is how much ruler each band gets: longer work, more ruler.
  bands: [
    {
      key: 'small',
      name: 'Small',
      effort: 'Under about an hour',
      ticks: 2,
      items: [
        'Google Maps embed',
        'Messenger or WhatsApp button',
        'Social links',
        'Extra form field',
        'Google Analytics setup',
      ],
    },
    {
      key: 'medium',
      name: 'Medium',
      effort: 'Half a day to a day',
      ticks: 3,
      items: ['Extra page', 'Extra form that emails you'],
    },
    {
      key: 'large',
      name: 'Large',
      effort: 'Several days to build',
      ticks: 4,
      items: ['Booking system on Starter', 'Payments on Standard', 'Extra automation workflow'],
    },
  ],
  physical: {
    eyebrow: 'Things you can hold',
    title: 'Two NFC pieces, made for your business.',
    body: 'Handed to you, ready to use. Each one has its own fixed price, separate from the bands above. Works with almost any modern phone.',
    badge: 'Example',
    card: {
      name: 'Custom NFC card',
      line: 'Made for your business. One tap opens any platform you choose.',
      pickLabel: 'Pick where the card opens',
      face: { name: 'Your Business', hint: 'Tap to connect' },
      destinations: [
        { key: 'google', label: 'Google', url: 'Your Business on Google' },
        { key: 'facebook', label: 'Facebook', url: 'facebook.com/yourbusiness' },
        { key: 'instagram', label: 'Instagram', url: 'instagram.com/yourbusiness' },
        { key: 'tiktok', label: 'TikTok', url: 'tiktok.com/@yourbusiness' },
        { key: 'website', label: 'Website', url: 'yourbusiness.com' },
        { key: 'menu', label: 'Menu', url: 'yourbusiness.com/menu' },
      ],
      opens: 'Opens',
    },
    stand: {
      name: 'NFC stand',
      line: 'Sits on your counter. One tap opens your Google review page.',
      face: { name: 'Your Business', hint: 'Tap to review us' },
      screen: { title: 'Review Your Business', field: 'Share your experience', button: 'Post' },
      tap: 'Tap the stand',
      opens: 'Opens your Google review page',
    },
  },
}
