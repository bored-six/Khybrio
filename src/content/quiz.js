/**
 * Copy for the guided chat that replaces the contact form: Khybi asks five
 * questions, takes a name and a way to reach them, then shows the package we
 * would start with and says their details are saved.
 *
 * The option `value`s are a contract with lib/recommend.js (`VALUES`); the
 * test suite fails if the two drift. Labels and wording are free to change.
 *
 * House rules as everywhere: no prices, no em dashes, no promised results.
 * The recommendation is a starting point, never a quote, and the copy says so.
 */

export const intro = {
  eyebrow: 'Book a free call',
  title: 'Answer five quick questions. See what we would set up for you.',
  body: 'Khybi asks about your business, then shows the package that fits. We save your details and one of us gets back to you within a day. No obligation.',
  greeting: 'Hi, I am Khybi. Five quick questions, then I will show you what we would set up.',
}

/** Asked in this order. `business` is context for us; it does not change the package. */
export const questions = [
  {
    id: 'business',
    ask: 'What kind of business do you run?',
    options: [
      { value: 'food', label: 'Restaurant or food' },
      { value: 'beauty', label: 'Spa, salon or beauty' },
      { value: 'health', label: 'Clinic or healthcare' },
      { value: 'stay', label: 'Resort or accommodation' },
      { value: 'travel', label: 'Tours and travel' },
      { value: 'fitness', label: 'Gym or fitness' },
      { value: 'school', label: 'School or training' },
      { value: 'auto', label: 'Auto services' },
      { value: 'professional', label: 'Professional services' },
      { value: 'events', label: 'Events' },
      { value: 'other', label: 'Something else' },
    ],
  },
  {
    id: 'maps',
    ask: 'When someone searches for you on Google Maps, what do they find?',
    options: [
      { value: 'none', label: 'Nothing. We are not there' },
      { value: 'stale', label: 'A listing, but it is old or not ours' },
      { value: 'good', label: 'A good listing with reviews' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
  {
    id: 'booking',
    ask: 'How do customers book or order from you today?',
    options: [
      { value: 'message', label: 'They message or call, then wait for a reply' },
      { value: 'walkin', label: 'They just walk in' },
      { value: 'online', label: 'They book or order online already' },
    ],
  },
  {
    id: 'branches',
    ask: 'How many branches do you have?',
    options: [
      { value: 'one', label: 'One' },
      { value: 'few', label: 'Two or three' },
      { value: 'many', label: 'Four or more' },
    ],
  },
  {
    id: 'pain',
    ask: 'What bothers you most right now?',
    options: [
      { value: 'found', label: 'Not enough new customers find us' },
      { value: 'messages', label: 'Messages and bookings pile up' },
      { value: 'numbers', label: 'I cannot see how the business is doing' },
      { value: 'reach', label: 'I want to reach more people' },
    ],
  },
]

export const details = {
  ask: 'Last one. Where can we reach you?',
  fields: {
    name: { label: 'Your name', placeholder: 'Juan Dela Cruz', autoComplete: 'name' },
    business: { label: 'Business name', placeholder: 'Your business', autoComplete: 'organization' },
    contact: { label: 'Email or mobile number', placeholder: 'you@email.com or 09XX XXX XXXX', autoComplete: 'email' },
  },
  submit: 'Show my package',
  sending: 'Saving…',
  privacy: 'We use this only to get back to you about your business.',
}

export const ui = {
  back: 'Back',
  step: (n, total) => `${n} of ${total}`,
  restart: 'Start again',
  retry: 'Try saving again',
  retrying: 'Saving…',
}

/** One sentence per reason key returned by recommend(). */
export const reasons = {
  'maps-none': 'You are not on Google Maps yet, so people searching nearby cannot find you.',
  'maps-stale': 'Your Google listing is old or not in your hands, so people may not trust what they see.',
  'maps-unsure': 'You are not sure what Google shows for you. We check that first.',
  'want-found': 'You want more new customers to find you, and Google Maps is where they look.',
  'reach-start': 'You want to reach more people. Being easy to find and trust is where that starts.',
  'branches-few': 'Each of your branches gets its own correct listing.',
  'booking-message': 'Customers message and wait for a reply. A booking site and chatbot answer at any hour.',
  'pain-messages': 'Messages and bookings pile up. The chatbot takes the first reply off your hands.',
  'listing-good': 'Your Google listing is already in good shape, so the next step is booking online.',
  'pain-numbers': 'You want to see how the business is doing. The dashboard puts bookings and sales on one screen.',
  'branches-many': 'With four or more branches, one dashboard saves you asking each branch for its numbers.',
  'basics-done': 'Your listing and online booking are already in place, so the next step is content and ads.',
  'reach-ads': 'You want to reach people who do not follow you yet. That is what the content and ads are for.',
  default: 'It covers the basics every local business needs first: being found and trusted.',
}

/** The result card, per tier. Package contents come from content/offer.js. */
export const tiers = {
  found: { scene: 'signalTower', lead: 'We would start you on' },
  booked: { scene: 'webDesk', lead: 'We would start you on' },
  ahead: { scene: 'haiqal', lead: 'We would start you on' },
}

export const result = {
  saved: (name) => `Saved. Thanks, ${name}. One of us will get back to you within a day.`,
  savedNoName: 'Saved. One of us will get back to you within a day.',
  whyLabel: 'Why this one',
  note: 'This is a starting point, not a quote. We go through it with you on the free call, and if you need less than this, we will say so.',
  seeAll: { label: 'Compare all three packages', href: '#packages' },
  // The send failed, but they still answered six questions: show the package
  // and give them a channel that works today.
  notSaved: 'We could not save your details just now. Your package is below. To book the call, email khybrio.org@gmail.com or message us on Facebook or Instagram.',
  cooldown: 'We already have your details from a few minutes ago, so nothing was sent twice. Here is your package again.',
}
