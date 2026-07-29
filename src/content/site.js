/**
 * Copy for the MAIN page (/) — workflow automation, sold internationally, USD.
 *
 * The local Philippine offering (websites, Google Business Profile, NFC cards,
 * peso pricing) lives on its own page: see content/ph.js. Nothing in this file
 * should mention NFC cards, bundles, or the city — an overseas buyer weighing a
 * $2,900 package reads those as a novelty vendor. Location is disclosed in the
 * FAQ and the contact block, where someone actually looks for it.
 *
 * Components import from this file and nothing else, so copy edits never mean
 * touching JSX.
 */

export const brand = {
  name: 'Khybrio',
  tagline: 'We automate the work that eats your week',
  location: 'Zamboanga City, Philippines',
}

/**
 * The counter and dot trail run off this list — one entry per island zone in
 * the continuous flight. It stays flat and independent of the animation so the
 * counter can advance zone-by-zone as the single scrubbed flight moves through
 * the whole tour.
 */
export const milestones = [
  { id: 'flight', label: 'The workshop' },
  { id: 'flight', label: 'Automation' },
  { id: 'flight', label: 'Sites & booking' },
  { id: 'flight', label: 'Local presence' },
  { id: 'flight', label: 'The audit' },
  { id: 'flight', label: 'Built in parallel' },
  { id: 'flight', label: 'Handover' },
]

export const nav = [
  // `flightProgress` jumps into the flight at a zone; `zoneRange` lights the
  // pill coral while that zone band is the one on screen. The fractions are
  // zone-centres over the seven zones: 1.5/7 for the work, 4.5/7 for the process.
  { id: 'flight', label: 'What we build', flightProgress: 0.2143, zoneRange: [1, 3] },
  { id: 'flight', label: 'How it works', flightProgress: 0.6429, zoneRange: [4, 6] },
  { id: 'automate', label: 'What we automate' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
]

/**
 * Hero — a static section above the flight. The visual is the run log, not the
 * island: the first thing an automation buyer should see is work executing.
 */
export const hero = {
  eyebrow: 'Automation for small businesses',
  title: ['Your team is doing a ', "computer's job", '.'],
  sub: 'We find the repetitive work eating your week — the copy-pasting, the re-typing, the chasing — and make it run itself. Then we hand it over, documented, in your name.',
  ctas: {
    primary: { label: 'Get a free workflow audit', href: '#contact' },
    secondary: { label: 'See what we automate', href: '#automate' },
  },
  trust: ['Fixed price', 'Built in weeks, not quarters', 'You own everything'],
}

/**
 * The hero's interactive panel: pick a job, watch it run.
 *
 * The visitor choosing which task to watch is the point — it rehearses the ask
 * the whole page builds to ("name your three tasks") before anyone has to fill
 * in a form. It auto-cycles until the first click, then follows the visitor.
 *
 * The `Example` badge is not decoration and must not be removed: these are
 * illustrative flows with illustrative hand-timings, and without the badge the
 * panel reads as measured results from real clients.
 */
export const runLog = {
  badge: 'Example',
  hint: 'Pick the one that sounds like your week',
  automatedLabel: 'Runs in',
  byHandLabel: 'By hand',
  flows: [
    {
      key: 'orders',
      label: 'Orders',
      trigger: 'An order arrives in Messenger',
      steps: ['Read the message', 'Add the row to your sheet', 'Send the confirmation'],
      time: '1.8s',
      byHand: '6 min, about 40 times a day',
    },
    {
      key: 'invoices',
      label: 'Invoices',
      trigger: 'An invoice hits 14 days overdue',
      steps: ['Spot the unpaid one', 'Email the reminder', 'Log that it went out'],
      time: '0.9s',
      byHand: '12 min, every week',
    },
    {
      key: 'enquiries',
      label: 'Enquiries',
      trigger: 'Someone submits your enquiry form',
      steps: ['Create the contact', 'File it where you look', 'Notify whoever replies'],
      time: '1.2s',
      byHand: '8 min, per enquiry',
    },
    {
      key: 'bookings',
      label: 'Bookings',
      trigger: 'A booking gets confirmed',
      steps: ['Update the calendar', 'Schedule the reminder', 'Send the details over'],
      time: '1.4s',
      byHand: '5 min, per booking',
    },
    {
      key: 'reports',
      label: 'Month-end',
      trigger: 'The month closes',
      steps: ['Collect the receipts', 'Categorize the expenses', 'Build the report'],
      time: '2.1s',
      byHand: '45 min, every month-end',
    },
  ],
}

/**
 * The continuous flight: seven island zones scrubbed as one take, re-cut from
 * the old bundle-and-crew tour to the automation story. Zones 2–4 are the three
 * lines of work; zones 5–7 are the process beats. Each zone carries an all-caps
 * eyebrow, a headline with exactly one phrase in the coral accent, and a
 * one-line subhead. `hint` shows the scroll cue only on the first zone.
 */
export const flight = {
  hint: 'Scroll to fly in',
  zones: [
    {
      key: 'open',
      eyebrow: 'What we build',
      title: ['Three lines of work. ', 'One workshop', '.'],
      rotations: ['One workshop', 'One team', 'One invoice', 'No handoffs'],
      sub: 'Automation leads, because it is the part that pays for itself. The other two exist to feed it.',
    },
    {
      key: 'automation',
      eyebrow: '01 · Workflow automation',
      title: ['The work that ', 'runs itself', '.'],
      sub: 'Tool-to-tool connections, automated messaging, scheduled reports — and data entry removed at the source rather than sped up.',
      hotspot: { benefit: 'Tool to tool, no copy-paste' },
    },
    {
      key: 'sites',
      eyebrow: '02 · Websites & booking',
      title: ['A site that ', 'does something', '.'],
      sub: 'Booking and enquiry systems, forms and intake, payments and confirmations — feeding the automations behind it. Not a brochure.',
      hotspot: { benefit: 'Takes bookings, not compliments' },
    },
    {
      key: 'local',
      eyebrow: '03 · Local presence',
      title: ['Found where they ', 'search', '.'],
      sub: 'Google Business Profile set up properly, map and hours and categories fixed, a review flow that runs on its own.',
      hotspot: { benefit: 'Right pin, right hours, real reviews' },
    },
    {
      key: 'audit',
      eyebrow: 'Day 0 · The audit',
      title: ['Name your ', 'three tasks', '.'],
      sub: 'You tell us the three things you do most often. We send back a short video showing what we would automate. Free, and no call to sit through.',
      hotspot: { benefit: 'Free · No call required' },
    },
    {
      key: 'parallel',
      eyebrow: 'Week 1–3 · Build',
      title: ['Nothing switches off until it is ', 'proven', '.'],
      sub: 'The automation runs alongside your current process, on real data, until it has earned the right to replace it.',
      hotspot: { benefit: 'Runs in parallel, on real data' },
    },
    {
      key: 'handover',
      eyebrow: 'Week 3–4 · Handover',
      title: ['Documented, and ', 'in your name', '.'],
      sub: 'Every account, every automation, a written walkthrough. If you never speak to us again, it keeps running.',
      hotspot: { benefit: 'Every account in your name' },
      ctas: {
        primary: { label: 'See pricing', href: '#pricing' },
        secondary: { label: 'Get your free audit', href: '#contact' },
      },
    },
  ],
}

// Count-up strip. Every figure here is a term of the offer — something we
// control and can be held to — not a performance statistic we would have to
// have measured on clients we do not have yet.
export const stats = [
  { value: 1, suffix: ' workflow', label: 'the smallest thing we build — start with the worst task' },
  { value: 4, suffix: ' weeks', label: 'first call to handover, at the outside' },
  { value: 3, suffix: ' tasks', label: 'all we need to start — name your most repeated' },
  { value: 100, suffix: '%', label: 'yours — accounts, docs and automations' },
]

export const problem = {
  eyebrow: 'Where the week goes',
  title: 'Three places the hours quietly disappear',
  items: [
    {
      title: 'The same message, again',
      body: 'Price, hours, availability, directions — typed out by hand forty times a day, and typed slightly differently every time.',
    },
    {
      title: 'The copy-paste tax',
      body: 'Information re-typed from one tool into another. Every re-type is a chance to get a digit wrong, and nobody finds out until it matters.',
    },
    {
      title: 'The chasing',
      body: 'Unpaid invoices, unconfirmed bookings, follow-ups that only happen when somebody remembers to remember.',
    },
  ],
}

export const services = {
  eyebrow: 'What we do',
  title: 'Three lines of work. Automation leads.',
  body: 'Automation comes first because it is the part that pays for itself. A site that captures the work and a profile that brings it in are what keep it fed.',
  items: [
    {
      n: '01',
      icon: 'workflow',
      name: 'Workflow automation',
      body: 'We map what your team actually repeats, then build it away — so the work happens whether or not anyone remembers to do it.',
      points: [
        'Tool-to-tool connections',
        'Automated messaging and replies',
        'Scheduled reports and reminders',
        'Data entry removed at the source',
      ],
    },
    {
      n: '02',
      icon: 'globe',
      name: 'Websites & booking',
      body: 'A site that does something — takes bookings, captures enquiries, feeds the automations behind it. Not a brochure.',
      points: [
        'Booking and enquiry systems',
        'Online forms and intake',
        'Payments and confirmations',
        'Fast on mobile data',
      ],
    },
    {
      n: '03',
      icon: 'pin',
      name: 'Local presence',
      body: 'The listing people actually find you through, set up the way Google expects, with a review flow that keeps running.',
      points: [
        'Google Business Profile setup',
        'Map, hours and category fixes',
        'Review collection flow',
        'Listing consistency',
      ],
    },
  ],
}

/**
 * Named workflows. This section is the difference between "we do automation"
 * reading as a specialism and reading as vague — so every entry has to be a
 * job somebody recognises as their own, not a capability.
 */
export const automate = {
  eyebrow: 'What we automate',
  title: 'Six workflows we build most often',
  body: 'Named, not vague. If yours is not on this list it is usually a variation of one that is — which is what the free audit is for.',
  items: [
    { label: 'Retail & e-commerce', workflow: 'Orders out of DMs and into a system' },
    { label: 'Services & trades', workflow: 'Quotes and job scheduling' },
    { label: 'Any business with invoices', workflow: 'Getting paid without chasing' },
    { label: 'Clinics & appointments', workflow: 'Bookings, forms and reminders' },
    { label: 'Offices & admin', workflow: 'Reports that build themselves' },
    { label: 'Customer-facing teams', workflow: 'The first reply, instantly' },
  ],
}

export const process = {
  eyebrow: 'How it works',
  title: 'Four steps — and you can stop after the first.',
  body: 'The audit is free and self-contained. If you take the video and build it yourself, that is a fine outcome.',
  steps: [
    {
      n: '01',
      when: 'Day 0',
      name: 'The audit',
      body: 'You name your three most repeated tasks. We send back a short video showing what we would automate and roughly what it would give you back. Free, and there is no call to sit through.',
    },
    {
      n: '02',
      when: 'Day 1–3',
      name: 'Map the work',
      body: 'One call where we watch how the task actually happens — not how the process document says it happens. The gap between those two is usually where the time goes.',
    },
    {
      n: '03',
      when: 'Week 1–3',
      name: 'Build and run in parallel',
      body: 'The automation runs alongside your current process on real data. Nothing switches off until it has been proven on your own work, not on a demo.',
    },
    {
      n: '04',
      when: 'Week 3–4',
      name: 'Hand over',
      body: 'Documentation, a recorded walkthrough, and every account in your name. If you never speak to us again, it keeps running.',
    },
  ],
}

export const pricing = {
  eyebrow: 'What you get',
  title: 'Three packages. You pick the shape.',
  body: 'What each one costs depends on how many tools your work touches and what state they are in, so the number comes on the call rather than off a poster. It is a fixed price either way — agreed in writing before anything starts, with no hourly billing and no scope that quietly grows once you have committed.',
  reassurances: [
    'Fixed price, agreed up front',
    'You own every account and automation',
    'Managed plan cancels anytime',
  ],
  tiers: [
    {
      name: 'One workflow',
      label: 'Start here',
      body: 'Pick the task that annoys you most. We automate that one thing, end to end.',
      features: [
        'One workflow, fully built',
        'Runs in parallel until proven',
        'Documentation and walkthrough',
        'Accounts in your name',
        '30 days of fixes included',
      ],
      featured: false,
    },
    {
      name: 'Operations package',
      label: 'Most scope',
      body: 'When admin has quietly become a full-time job that nobody was hired for.',
      features: [
        'Up to five connected workflows',
        'Tools wired together end to end',
        'Scheduled reports and reminders',
        'Documentation and walkthrough',
        'Accounts in your name',
        '60 days of fixes included',
      ],
      featured: true,
    },
    {
      name: 'Site + automation',
      label: 'Front door too',
      body: 'When the front door needs rebuilding as well as the back office.',
      features: [
        'Everything in the operations package',
        'Booking or enquiry site, built to feed it',
        'Payments and confirmations wired up',
        'Google Business Profile set up',
        'Accounts in your name',
      ],
      featured: false,
    },
  ],
  managed: {
    name: 'Managed plan',
    unit: 'Optional · monthly · cancel anytime',
    body: 'Optional, and never a condition of the build. Add it to any package or leave it — what we hand over keeps running either way.',
    features: [
      'Monitoring and fixes',
      'Small changes as you need them',
      'One new workflow per quarter',
      'Cancel anytime',
    ],
  },
  /**
   * Says plainly that the offer is new. This converts better than implying a
   * track record we do not have, and unlike an implied one it cannot come apart
   * later when a client asks for references.
   */
  founding: {
    label: 'Founding clients',
    title: 'Five spots, 35% off',
    body: 'This offer is new, and pretending otherwise would show. The first five clients get 35% off any package, in exchange for a case study and a testimonial once it is working. That is the whole trade — and if it does not work, you owe us neither.',
  },
  cta: { label: 'Get your free audit', href: '#contact' },
  footnote:
    'Every engagement starts with the free audit — three tasks, a short video back, no call. You get a fixed, itemized quote before anything begins, and we will tell you honestly if the smallest package is all you need.',
}

export const about = {
  eyebrow: 'Who you’re dealing with',
  title: 'Three people. You talk to the one building it.',
  body: 'No account managers, no handoffs between a salesperson who promised it and a builder who never heard about it. The person who maps your workflow is the person who builds it and the person who hands it over. That is the entire advantage of being small, and we would rather keep it than grow out of it.',
  points: [
    { label: 'Small on purpose', value: 'Three of us. You always know exactly who you are talking to.' },
    { label: 'You own it', value: 'Every account, automation and document is registered in your name.' },
    { label: 'Plain language', value: 'We explain what we are doing and why, without the jargon.' },
  ],
}

export const faq = {
  eyebrow: 'Before you ask',
  title: 'The questions we get every time',
  items: [
    {
      q: 'Who are you and where are you based?',
      a: 'We are a three-person team based in Zamboanga City, Philippines, working with small businesses in Australia, New Zealand, the US, Canada and the UK. We work in your time zone for calls and we are reachable by email and message the rest of the time. Being remote is why the pricing is what it is.',
    },
    {
      q: 'Do we have to change the software we use?',
      a: 'Almost never, and we would push back if you suggested it. The whole point is to connect what you already use — your inbox, your spreadsheet, your booking tool, your accounting software. Migrating you to something new is a different project with a much worse risk profile, and we will say so if someone proposes it.',
    },
    {
      q: 'What if it breaks when you’re not around?',
      a: 'You get documentation and a recorded walkthrough, and every account is in your name — so any competent person can pick it up, including one who is not us. Automations also fail loudly rather than silently: if something stops, you get told rather than finding out from a customer. The managed plan covers monitoring and fixes if you would rather not think about it, but nothing is built so that you need us.',
    },
    {
      q: 'Will this replace our staff?',
      a: 'Not in our experience, and it is not what we are selling. What it replaces is the part of their day spent re-typing things a computer could have moved. Most owners use the time back for work that was already being neglected — the follow-ups, the quotes, the customers who got a slow reply. If your goal is a headcount cut, we are probably the wrong people.',
    },
    {
      q: 'How do payments work?',
      a: 'Fixed price, agreed in writing before anything starts. Half up front, half on handover. Bank transfer or Wise, invoiced in USD. The managed plan is billed monthly and can be cancelled whenever you like — it is not a lock-in and it is not a condition of the build.',
    },
    {
      q: 'What do you need from us?',
      a: 'To start: the three tasks you repeat most. After that, one call where we watch the work happen, and access to the tools involved. Roughly two to three hours of your time across the whole build — most of the delay in a project like this is waiting on access, so the faster that arrives the faster it ships.',
    },
  ],
}

export const contact = {
  eyebrow: 'Get started',
  title: 'Tell us the three things you do most often.',
  body: 'That is the whole audit. Send your three most repeated tasks and we send back a short video showing what we would automate — free, no call, no obligation.',
  submitLabel: 'Send us your three',
  /**
   * PLACEHOLDER — paste the Formspree endpoint here (it looks like
   * 'https://formspree.io/f/xxxxxxxx') and both pages start submitting. Until
   * it is set the form tells the visitor it is not connected rather than
   * quietly dropping their message.
   */
  formEndpoint: null,
  fields: {
    name: { label: 'Your name', placeholder: 'Alex Chen' },
    business: { label: 'Business name', placeholder: 'Your business' },
    contact: { label: 'Email', placeholder: 'you@yourbusiness.com' },
    message: {
      label: 'The three things you do most often',
      placeholder: 'e.g. re-typing orders from Messenger into a spreadsheet, chasing unpaid invoices, sending booking reminders.',
    },
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

export const team = {
  eyebrow: 'Behind the work',
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
      bio: 'Builds every automation and site we ship, plus the technical side of the handover — from the first mapped workflow to the documentation you keep.',
      focus: ['Automation', 'Web development', 'Handover & docs'],
    },
    {
      name: 'Dave Calio',
      initials: 'DC',
      photo: 'dave',
      role: 'First contact & onboarding',
      accent: 'var(--color-teal-bright)',
      bio: 'Usually the first person you meet. Walks owners through what the audit found and what it would actually change — in plain terms, no jargon.',
      focus: ['First contact', 'Workflow audits', 'Onboarding'],
    },
    {
      name: 'Haiqal Munjalin',
      initials: 'HM',
      photo: 'haiqal',
      role: 'Marketing & sales',
      accent: 'var(--color-coral)',
      bio: 'Runs proposals and follow-through, from the first conversation all the way to a signed, clearly-scoped agreement.',
      focus: ['Proposals', 'Scoping', 'Follow-through'],
    },
  ],
}

export const footer = {
  blurb:
    'Workflow automation, booking systems and local presence for small businesses in Australia, New Zealand, the US, Canada and the UK.',
  // Discreet on purpose. Overseas visitors should not be routed to the peso
  // page, but an entirely unlinked page is invisible to search and impossible
  // to find. Remove this if you would rather /ph stay strictly link-only.
  altPage: { label: 'Philippines — websites, Google & tap cards', href: 'ph/' },
}
