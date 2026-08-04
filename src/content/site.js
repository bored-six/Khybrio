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
 * the flight. It stays flat and independent of the animation so the counter can
 * advance zone-by-zone as the flight moves.
 */
export const milestones = [
  { id: 'flight', label: 'The workshop' },
  { id: 'flight', label: 'The audit' },
  { id: 'flight', label: 'Handover' },
]

export const nav = [
  // These used to jump INTO the flight at a zone, because the flight was where
  // the three lines of work and the four steps were actually explained. It is a
  // short visual beat now and the content lives in its own sections, so the nav
  // points at those instead — a link labelled "What we build" should land on
  // the section that builds the case, not partway through an animation of it.
  //
  // `hint` is the one-line answer to "what is actually down there" — it shows
  // on hover, because five abstract labels on a one-page site tell a first-time
  // visitor nothing about which one holds the thing they came for.
  {
    id: 'services',
    label: 'What we build',
    hint: 'Automation, websites and local presence',
  },
  {
    id: 'process',
    label: 'How it works',
    hint: 'Free audit to handover, about four weeks',
  },
  { id: 'automate', label: 'What we automate', hint: 'The six workflows we build most often' },
  { id: 'pricing', label: 'Packages', hint: 'What you get, and how we bill for it' },
  { id: 'faq', label: 'FAQ', hint: 'The questions we get every time' },
]

/**
 * Hero — a static section above the flight. The visual is the run log, not the
 * island: the first thing an automation buyer should see is work executing.
 */
export const hero = {
  eyebrow: 'Automation for small businesses',
  // "Your team is doing a computer's job" read as an accusation about the
  // staff — that they were wasteful, or replaceable. It also picked a fight
  // the FAQ then had to settle two screens later ("Will this replace our
  // staff?" — "Not in our experience, and it is not what we are selling").
  // Same insight, inverted: the people are good, the work is beneath them.
  title: ['Your best people, ', 'free of the busywork', '.'],
  sub: 'We find the repetitive work eating your week — the copy-pasting, the re-typing, the chasing — and make it run itself. Then we hand it over, documented, in your name.',
  ctas: {
    primary: { label: 'Get a free workflow audit', href: '#contact' },
    secondary: { label: 'See what we automate', href: '#automate' },
  },
  // "Built in weeks, not quarters" was a comparative promise with nothing
  // hedging it. Voice rule 3 is under-promise timing and frame it as a target,
  // so this states the target and owns the dependency instead.
  trust: ['Fixed price', 'Usually live inside four weeks', 'You own everything'],
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
  inLabel: 'The work coming in',
  outLabel: 'Out the other side',
  engineLabel: 'the Khybrio engine',
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
 * The island flight — an opening visual beat, not the page's argument.
 *
 * It ran seven zones and took ten screens of pinned scroll to do it: three
 * zones on the lines of work, three on the process. Every word of that was
 * repeated verbatim by the Services and Process sections underneath, so a
 * visitor read the same page twice and the second time was the one that
 * actually sold. Cut to three: what we build, what you do, what you get. The
 * detail belongs in sections a skimmer can scan and a search engine can read.
 *
 * Each zone carries an all-caps eyebrow, a headline with exactly one phrase in
 * the coral accent, and a one-line subhead. `hint` shows the cue on zone one.
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
      key: 'audit',
      eyebrow: 'Day 0 · The audit',
      title: ['Name your ', 'three tasks', '.'],
      sub: 'You tell us the three things you do most often. We send back a short video showing what we would automate. Free, and no call to sit through.',
      hotspot: { benefit: 'Free · No call required' },
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

/**
 * What changes for the owner — the "so what" the rest of the page never quite
 * says. Everything above this describes what we DO; this describes what is
 * different in their week afterwards.
 *
 * There are deliberately NO numbers here. Numbers would be stronger and this
 * section is where they would belong, but there are no clients to have measured
 * them on yet, and a percentage nobody measured is a lie with a decimal point
 * in it. Every line is a mechanism instead: something the build guarantees by
 * construction, which is true on day one and stays true. Replace these with
 * real figures the moment there are real figures.
 */
export const improves = {
  eyebrow: 'What we improve',
  title: 'What actually changes in your week',
  body: 'Not the tools — the tools are the boring part. This is what you notice about a month in, once the thing has been running long enough to stop being interesting.',
  items: [
    {
      title: 'Replies stop waiting on a person',
      body: 'The enquiry that used to sit until somebody opened the inbox gets answered when it lands — at 11pm, on a Sunday, mid-service — and in the same words every time.',
    },
    {
      title: 'The re-typing stops',
      body: 'Information moves between your tools on its own. Nobody copies a number from one screen to another, so nobody transposes a digit doing it at the end of a long day.',
    },
    {
      title: 'Money gets chased without anyone remembering',
      body: 'Overdue invoices and unconfirmed bookings follow themselves up on a schedule. The chasing stops depending on whether it was a quiet week.',
    },
    {
      title: 'The admin stops setting the agenda',
      body: 'Reports, reminders and month-end run on their own clock. The hours that come back land on the work that was already being neglected.',
    },
    {
      title: 'The process stops living in someone’s head',
      body: 'How it is done sits in the automation and the written walkthrough, not in whoever has been there longest. Handovers and holidays stop being events.',
    },
    {
      title: 'You end up owning an asset',
      body: 'Every account, automation and document is in your name from the first day. It keeps running whether or not we are still in the picture — it is not a subscription you rent.',
    },
  ],
}

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
      // Which island zone stands beside this line of work. The renders already
      // carry the meaning — the desk nook is the one with the code brackets —
      // so the picture argues the same point as the list next to it.
      still: 'shiek',
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
      still: 'webDesk',
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
      still: 'signalTower',
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
  body: 'Named, not vague. Pick one in the demo below — if yours is not on the list it is usually a variation of one that is, which is what the free audit is for.',
  // The console chrome around the demo. `badge` is load-bearing: these are
  // illustrative builds, and unlabelled they would read as a shipped product
  // with real activity in it.
  lab: {
    window: 'What a build looks like',
    badge: 'Example',
    menu: 'Pick a workflow',
    status: 'Runs quietly in the background',
    // Captions on the three pipeline nodes — the beats every automation has,
    // named in plain language instead of trigger/action/output.
    roles: ['When this happens', 'This runs', 'You get'],
  },
  items: [
    {
      label: 'Retail & e-commerce',
      workflow: 'Orders out of DMs and into a system',
      steps: ['New DM spotted', 'Order added to your sheet', 'Confirmation sent back'],
    },
    {
      label: 'Services & trades',
      workflow: 'Quotes and job scheduling',
      steps: ['Request comes in', 'Quote drafted from your rates', 'Job lands on the calendar'],
    },
    {
      label: 'Any business with invoices',
      workflow: 'Getting paid without chasing',
      steps: ['Due date passes', 'Polite reminder goes out', 'Payment logged when it lands'],
    },
    {
      label: 'Clinics & appointments',
      workflow: 'Bookings, forms and reminders',
      steps: ['Booking confirmed', 'Intake form sent over', 'Reminder the day before'],
    },
    {
      label: 'Offices & admin',
      workflow: 'Reports that build themselves',
      steps: ['Data pulled from your tools', 'Numbers tallied and checked', 'Report waiting on Monday'],
    },
    {
      label: 'Customer-facing teams',
      workflow: 'The first reply, instantly',
      steps: ['Message arrives', 'Instant acknowledgement', 'Handed over with context'],
    },
  ],
}

export const process = {
  eyebrow: 'How it works',
  title: 'Four steps — and you can stop after the first.',
  body: 'The audit is free and self-contained. If you take the video and build it yourself, that is a fine outcome. The timings below are what we aim for — they hold as long as we can get at the tools, which is the part that usually decides the pace.',
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
  eyebrow: 'The packages',
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
  cta: { label: 'Get your free audit', href: '#contact' },
  footnote:
    'Every engagement starts with the free audit — three tasks, a short video back, no call. You get a fixed, itemized quote before anything begins, and we will tell you honestly if the smallest package is all you need.',
}

/**
 * Re-pointed at the work. It used to open with "who are you and where are you
 * based" and spend half its length on the company; a visitor at this depth has
 * already decided they like the idea and is now asking what it would actually
 * be like, so the questions are about the build.
 *
 * The location question STAYS, and stays for a reason. The About section that
 * used to disclose it is gone from this page, and an overseas buyer weighing
 * $2,900 is entitled to know they are hiring a remote team before they email,
 * not after. Burying it would convert slightly better and be the wrong call.
 *
 * Payment and access questions also stay: they read as admin, but they are the
 * highest-intent questions on the page — nobody asks how to pay for something
 * they are not buying.
 */
/**
 * Who this is not for — the page's only moment of pushing back.
 *
 * Voice rule 7 is "push back on flawed requests rather than quietly shipping
 * them", and until now the page did that nowhere: every section argued for the
 * sale. For a vendor with no case studies, naming the buyer you would turn away
 * is the cheapest trust available — it is the one claim a liar has no incentive
 * to make. It also does real qualifying work, since the audit is free and
 * unsuitable leads cost actual hours.
 *
 * Every line has to be one we would genuinely honour on a call. If we would
 * take the money anyway, it does not belong here.
 */
export const notFor = {
  eyebrow: 'Before you send it',
  title: 'When we are the wrong call',
  body: 'The audit is free, so there is no cost to finding out. But it is a faster answer for everyone if one of these is you.',
  items: [
    {
      title: 'The process changes every week',
      body: 'Automation locks in a way of doing something. If the way is still moving, we would be hardening a decision you have not made yet — and you would be paying us to rebuild it next month.',
    },
    {
      title: 'The task needs judgement, not speed',
      body: 'Pricing an awkward job, reading whether a customer is about to walk, deciding who to hire. We can move the information around it faster; we cannot make the call, and anyone who says they can is selling you something else.',
    },
    {
      title: 'You want a headcount cut',
      body: 'What this replaces is the re-typing, not the person doing it. If the brief is fewer staff, the numbers will disappoint you and we would rather say that now than after an invoice.',
    },
    {
      title: 'It happens twice a year',
      body: 'A build has to earn its cost back in time saved. Something you do at month-end for twenty minutes probably never will — write it down properly instead and keep your money.',
    },
  ],
}

export const faq = {
  eyebrow: 'Before you ask',
  title: 'What we build, and what it takes',
  items: [
    {
      q: 'What can you actually automate?',
      a: 'Anything that follows a rule and happens often enough to be annoying — an order arriving, an invoice going overdue, a booking needing a reminder, a form that should have become a contact. If you can say it as "when this happens, someone does that", it can usually be built. What we cannot automate is judgement: pricing an awkward job, calming an unhappy customer, deciding who to hire. We will tell you when something is judgement wearing a process costume.',
    },
    {
      q: 'How do you decide what to automate first?',
      a: 'By volume first, annoyance second. You name the three tasks you repeat most, we watch them happen once on a call, and we start with the one that costs the most hours for the least thinking. That one has to be working before anything else gets touched — a build that tries to fix five things at once fails in five places.',
    },
    {
      q: 'Do we have to change the software we use?',
      a: 'Almost never, and we would push back if you suggested it. The whole point is to connect what you already use — your inbox, your spreadsheet, your booking tool, your accounting software. Migrating you to something new is a different project with a much worse risk profile, and we will say so if someone proposes it.',
    },
    {
      q: 'How do we know it works before it replaces anything?',
      a: 'Because nothing switches off until it has proven itself. The automation runs alongside your current process, on real data, while somebody still does it the old way — so you can compare the two outputs before you trust one. If it disagrees with the human, we fix it before it is load-bearing.',
    },
    {
      q: 'Will this replace our staff?',
      a: 'Not in our experience, and it is not what we are selling. What it replaces is the part of their day spent re-typing things a computer could have moved. Most owners use the time back for work that was already being neglected — the follow-ups, the quotes, the customers who got a slow reply. If your goal is a headcount cut, we are probably the wrong people.',
    },
    {
      q: 'What happens if an automation breaks?',
      a: 'You get documentation and a recorded walkthrough, and every account is in your name — so any competent person can pick it up, including one who is not us. Automations also fail loudly rather than silently: if something stops, you get told rather than finding out from a customer. The managed plan covers monitoring and fixes if you would rather not think about it, but nothing is built so that you need us.',
    },
    {
      q: 'What do you need from us?',
      a: 'To start: the three tasks you repeat most. After that, one call where we watch the work happen, and access to the tools involved. Roughly two to three hours of your time across the whole build — most of the delay in a project like this is waiting on access, so the faster that arrives the faster it ships.',
    },
    {
      q: 'How do payments work?',
      a: 'Fixed price, agreed in writing before anything starts. Half up front, half on handover. Bank transfer or Wise, invoiced in USD. The managed plan is billed monthly and can be cancelled whenever you like — it is not a lock-in and it is not a condition of the build.',
    },
    {
      q: 'Where are you based?',
      a: 'Zamboanga City, Philippines — three of us, working with small businesses in Australia, New Zealand, the US, Canada, the UK and elsewhere. We work your time zone for calls and are reachable by email and message the rest of the time. Being remote is why the pricing is what it is.',
    },
  ],
}

export const contact = {
  eyebrow: 'Get started',
  title: 'Tell us the three things you do most often.',
  body: 'That is the whole audit. Send your three most repeated tasks and we send back a short video showing what we would automate — free, no call, no obligation.',
  submitLabel: 'Send us your three',
  /**
   * What the visitor sees if they submit before the endpoint is wired. It has
   * to name a channel that works TODAY and stay in the site's voice — this is
   * the last thing a lead reads before they give up, at the end of the only
   * conversion path on the page.
   */
  /**
   * Shown when someone submits again inside the cooldown. Reads as reassurance
   * rather than an accusation — nearly everyone who sees it is a real person
   * who was not certain the first one sent.
   */
  cooldownNote:
    'That one is already with us — no need to send it twice. Give us a few hours to come back to you, and message us on Facebook or Instagram if something urgent changed.',
  fallbackNote:
    'Our form is having a moment — send your three straight to khybrio.org@gmail.com, or message us on Facebook or Instagram. Same reply, same free audit.',
  /**
   * PLACEHOLDER — paste the Formspree endpoint here (it looks like
   * 'https://formspree.io/f/xxxxxxxx') and both pages start submitting.
   *
   * Formspree needs no code change: Contact.jsx already POSTs JSON with
   * `Accept: application/json`, which is exactly its AJAX contract. Web3Forms
   * is the fallback if the free tier (50/month) ever runs out, but it wants an
   * `access_key` in the body, so that one is not a drop-in. Netlify Forms
   * cannot work at all from GitHub Pages.
   *
   * Until this is set, every CTA on the page dead-ends into `fallbackNote`.
   */
  formEndpoint: 'https://formspree.io/f/xrpzzyre',
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

export const footer = {
  blurb:
    'Workflow automation, booking systems and local presence for small businesses everywhere.',
  // Discreet on purpose. Overseas visitors should not be routed to the peso
  // page, but an entirely unlinked page is invisible to search and impossible
  // to find. Remove this if you would rather /ph stay strictly link-only.
  altPage: { label: 'Philippines — websites, Google & tap cards', href: 'ph/' },
}
