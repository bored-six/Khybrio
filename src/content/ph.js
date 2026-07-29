/**
 * Copy for the LOCAL page (/ph) — Philippine market, pesos, Zamboanga-first.
 *
 * This is the page you link from Facebook, put on a calling card, and send to
 * a prospect after the Maps demo. Google Business Profile leads, because that
 * is the gap a Facebook Page genuinely does not fill and the one an owner can
 * verify on their own phone in sixty seconds.
 *
 * Prices are quoted on a call, not posted — local budgets vary far more than
 * the fixed overseas packages do. See content/site.js for the main page.
 */

export const brand = {
  name: 'Khybrio',
  tagline: 'Makikita ka na sa Google. Get found. Get trusted.',
  location: 'Zamboanga City, Philippines',
}

export const nav = [
  { id: 'services', label: 'Ano ang gagawin namin' },
  { id: 'reviews', label: 'Google reviews' },
  { id: 'process', label: 'Paano' },
  { id: 'pricing', label: 'Presyo' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Para sa mga negosyo sa Zamboanga',
  title: ['Hinahanap ka nila. ', 'Wala ka doon', '.'],
  sub: 'Kapag may naghanap ng tindahan mo sa Google Maps at wala ka — pumunta sila sa kalaban. Hindi kasi mas maganda sila. Nasa mapa lang sila, ikaw hindi.',
  ctas: {
    primary: { label: 'Libreng check ng listing mo', href: '#contact' },
    secondary: { label: 'Tingnan ang serbisyo', href: '#services' },
  },
  trust: ['Libreng 15-minute check', 'Sa iyo ang lahat', 'Walang lock-in'],
}

/**
 * The Maps gap, stated three ways. Deliberately does NOT tell the owner their
 * Facebook Page is bad — for a lot of shops here the Page genuinely works, and
 * arguing with that is what used to lose the deal. The pitch is that Maps is a
 * different surface the Page does not reach, which is verifiable on the spot.
 */
export const problem = {
  eyebrow: 'Ang totoong problema',
  title: 'Maganda ang Facebook Page mo. Hindi siya lumalabas sa Google.',
  items: [
    {
      title: 'Iba ang Google, iba ang Facebook.',
      body: 'Kapag nag-search sila ng “hardware near me” o “dentist Zamboanga”, hindi lumalabas ang Facebook Page. Ibang lugar iyon — at doon ka wala.',
    },
    {
      title: 'Nasa mapa na ang kalaban mo.',
      body: 'May 40 reviews, may litrato, tama ang oras. Ikaw — wala, o mali ang address, o isang malabong litrato noong 2019.',
    },
    {
      title: 'Reviews ang nagpapataas.',
      body: 'Ito ang pinakamalaking dahilan kung bakit may nauuna sa Maps. At ito rin ang madalas hindi nagagawa ng maliliit na negosyo.',
    },
  ],
}

export const services = {
  eyebrow: 'Ano ang gagawin namin',
  title: 'Apat na serbisyo. Google muna.',
  body: 'Hindi namin sasabihin na kailangan mo lahat. Sasabihin namin sa libreng call kung ano talaga ang kulang sa iyo — kahit isa lang iyon.',
  items: [
    {
      n: '01',
      icon: 'pin',
      name: 'Google Business Profile',
      body: 'I-claim, i-verify at kumpletuhin ang listing mo — kategorya, oras, address, litrato — para lumabas ka kapag may naghanap malapit sa iyo.',
      points: ['Claim & verify', 'Tamang oras at pin', 'Litrato at kategorya', 'Ayusin ang mali'],
    },
    {
      n: '02',
      icon: 'star',
      name: 'Reviews (buwanan)',
      body: 'Kami ang bahala sa pagkuha ng review — kasama na ang libreng tap card o counter stand. Ito ang nagpapataas sa Maps.',
      points: ['Libreng tap card', 'Counter stand', 'Follow-up para sa staff', 'Sinasagot ang reviews'],
    },
    {
      n: '03',
      icon: 'globe',
      name: 'Website & booking',
      body: 'Mabilis, mobile-first, at may silbi — tumatanggap ng booking o inquiry, hindi lang pang-porma.',
      points: ['Bilis kahit mahina ang signal', 'Booking at inquiry form', 'Contact na madaling pindutin', 'Sa iyo ang domain'],
    },
    {
      n: '04',
      icon: 'workflow',
      name: 'Automation',
      body: 'Ang paulit-ulit na trabaho — pag-encode ng order, paghabol ng bayad, pagpapaalala — pinapagana namin nang kusa.',
      points: ['Order mula sa Messenger', 'Paalala sa booking', 'Habol sa hindi bayad', 'Report na kusang gawa'],
    },
  ],
}

/**
 * The review service, its own section. The card is the mechanism and it is
 * free — what is sold is the reviews and the ranking. Charging for the card
 * invites the "a printed QR does the same thing for free" objection, and that
 * objection is correct, so the offer is built so it never comes up.
 */
export const reviews = {
  eyebrow: 'Ang pinakamalakas na serbisyo',
  title: 'Hindi namin binebenta ang card. Ang reviews ang binebenta namin.',
  body: 'Libre ang tap card at ang counter stand — kasama na iyon. Ang binabayaran mo ay ang buwanang trabaho: kunin ang review, sagutin ang review, at itaas ang ranking mo sa Maps.',
  points: [
    { label: 'Ang card', value: 'Isang tap, diretso sa review page mo. Libre, kasama na.' },
    { label: 'Ang produkto', value: 'Tumataas na bilang ng totoong Google review, buwan-buwan.' },
    { label: 'Ang resulta', value: 'Lumalabas ka kapag may naghanap ng kategorya mo malapit sa iyo.' },
  ],
  note: 'Hindi lahat ng telepono ay tumatap — may ibang paraan kami para makuha pa rin ang review. Ang punto ay ang review, hindi ang gadget.',
}

export const process = {
  eyebrow: 'Paano ito gumagana',
  title: 'Tatlong hakbang. Libre ang una.',
  body: 'Walang bayad at walang obligasyon sa unang hakbang. Kung sabihin naming hindi mo kailangan, sasabihin namin.',
  steps: [
    {
      n: '01',
      when: 'Libre',
      name: 'Tingnan natin',
      body: 'Hahanapin namin ang negosyo mo sa Google Maps habang kaharap ka. Makikita mo mismo kung nasaan ka — at kung nasaan ang kalaban mo. Labinlimang minuto lang.',
    },
    {
      n: '02',
      when: 'Mga isang linggo',
      name: 'Aayusin namin',
      body: 'Listing, litrato, oras, at kung kailangan, website at automation. Mga isang linggo kapag kumpleto na ang litrato at detalye mo.',
    },
    {
      n: '03',
      when: 'Buwan-buwan',
      name: 'Patuloy na pagtaas',
      body: 'Kung kukunin mo ang review service, tuloy-tuloy ang pagkuha at pagsagot ng review. Puwedeng itigil anumang buwan.',
    },
  ],
}

export const pricing = {
  eyebrow: 'Presyo',
  title: 'Sasabihin namin sa call. Hindi sa poster.',
  body: 'Iba-iba ang kailangan ng bawat tindahan, kaya hindi kami naglalagay ng presyo dito na mali para sa kalahati ng magbabasa. Libre ang unang usapan at may malinaw na quote bago magsimula.',
  reassurances: [
    'Sa iyo ang lahat ng gagawin namin',
    'Walang lock-in na kontrata',
    'Libreng call — totoong payo kahit hindi ka bumili',
  ],
  tiers: [
    {
      name: 'Google muna',
      label: 'Simula',
      body: 'Para sa tindahang wala pa o hindi pa tama sa Google Maps.',
      features: [
        'Google Business Profile, claimed at verified',
        'Tamang oras, address at kategorya',
        'Litrato at unang mga post',
        'Ayusin ang maling listing',
      ],
      featured: false,
    },
    {
      name: 'Google + reviews',
      label: 'Pinakamadalas kunin',
      body: 'Ang buwanang serbisyo — dito nangyayari ang pagtaas sa Maps.',
      features: [
        'Lahat ng nasa “Google muna”',
        'Libreng tap card at counter stand',
        'Buwanang pagkuha ng review',
        'Sinasagot ang bawat review',
        'Buwanang isang-pahinang report',
      ],
      featured: true,
    },
    {
      name: 'Buong setup',
      label: 'Kumpleto',
      body: 'Kapag kailangan din ng website at automation.',
      features: [
        'Lahat ng nasa “Google + reviews”',
        'Website na may booking o inquiry form',
        'Automation ng paulit-ulit na trabaho',
        'Sa pangalan mo ang domain at accounts',
      ],
      featured: false,
    },
  ],
  cta: { label: 'Kunin ang libreng check', href: '#contact' },
  footnote:
    'Libre ang unang 15 minuto — at sasabihin namin nang tapat kung hindi mo kailangan lahat. May malinaw at nakalistang quote bago magsimula ang kahit ano.',
}

export const about = {
  eyebrow: 'Sino kami',
  title: 'Tatlong taga-Zamboanga na napagod manood ng magagandang tindahan na hindi nakikita.',
  body: 'Palagi na lang ganoon ang nakikita namin sa siyudad — barberya na may pila sa labas pero walang pin sa mapa, panaderya na dalawang taon nang tahimik ang Facebook Page, klinika na natatalo sa kalaban na mas mababa ang serbisyo pero mas maganda ang listing. Hindi mahal at hindi komplikado ang tools para ayusin iyon. Hindi lang talaga ito naipaliwanag nang malinaw sa maliit na negosyo, ng taong kayang kausapin. Kaya kami na ang gumawa.',
  points: [
    { label: 'Taga-rito', value: 'Zamboanga City — at tumatanggap kami ng trabaho kahit saan sa Mindanao.' },
    { label: 'Tatlo lang kami', value: 'Walang account manager, walang pasa-pasa, walang paikot-ikot.' },
    { label: 'Diretsong salita', value: 'Ipapaliwanag namin ang ginagawa namin at kung bakit — walang mabigat na termino.' },
  ],
}

export const faq = {
  eyebrow: 'Bago mo pa itanong',
  title: 'Ang mga tanong na palaging naitatanong',
  items: [
    {
      q: 'May Facebook Page na ako. Kailangan ko pa ba ito?',
      a: 'Maganda ang Facebook Page — huwag mo iyang tanggalin. Pero hindi siya lumalabas sa Google Maps. Magkaibang lugar iyon: ang Page para sa mga kilala ka na, ang Maps para sa mga naghahanap pa lang. Ang inaayos namin ay iyong pangalawa.',
    },
    {
      q: 'Magkano ba talaga?',
      a: 'Depende sa kung ano ang kulang sa iyo — minsan listing lang, minsan pati website. Kaya hindi kami naglalagay ng presyo dito na mali para sa kalahati ng magbabasa. Libre ang 15-minutong usapan at may malinaw na quote sa dulo. Walang pilitan.',
    },
    {
      q: 'Gaano katagal?',
      a: 'Mga isang linggo sa parte namin, kapag kumpleto na ang litrato at detalye mo. Ang hindi namin kontrolado ay ang verification ng Google — puwedeng umabot ng isa hanggang dalawang linggo iyon mag-isa. Sasabihin namin kung nasaan na, hindi ka namin ipapahula.',
    },
    {
      q: 'Sino ang may-ari ng website at ng profile?',
      a: 'Ikaw, buo. Ang domain, ang site, ang Google Business Profile, ang Facebook Page — nakapangalan lahat sa iyo at ibibigay sa iyo. Kung umalis ka sa amin, walang mawawala at walang mapapatay.',
    },
    {
      q: 'Paano kayo kumukuha ng review? Legal ba?',
      a: 'Hinihingi namin ang review sa totoong customer pagkatapos ng totoong transaksyon — sa pamamagitan ng tap card, counter stand o follow-up message. Hindi kami bumibili ng review at hindi kami gumagawa ng peke. Bawal iyon sa Google at mabilis mabura ang listing na nahuhuli — kaya hindi namin ginagawa.',
    },
    {
      q: 'Ano ang mangyayari pagkatapos?',
      a: 'Walang masisira kahit wala kang gawin. Ang buwanang review service ay dagdag lang na puwede mong itigil anumang oras — hindi iyon kondisyon ng setup.',
    },
  ],
}

export const contact = {
  eyebrow: 'Magsimula tayo',
  title: 'Sabihin mo kung ano ang binebenta mo. Sasabihin namin kung ano ang kulang.',
  body: 'Sapat na ang maikling mensahe. Sasagutin ka namin sa kahit alin dito na ginagamit mo.',
  submitLabel: 'Ipadala',
  // PLACEHOLDER — same Formspree endpoint as the main page. Paste it in
  // content/site.js and set this to match, or import it from there.
  formEndpoint: null,
  fields: {
    name: { label: 'Pangalan mo', placeholder: 'Juan Dela Cruz' },
    business: { label: 'Pangalan ng negosyo', placeholder: 'Tindahan mo' },
    contact: { label: 'Email o mobile number', placeholder: '09XX XXX XXXX' },
    message: {
      label: 'Ano ang binebenta mo?',
      placeholder: 'Ilang pangungusap lang, sapat na.',
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
  eyebrow: 'Ang team',
  title: 'Kilalanin mo kami',
  body: 'Tatlo lang kami — kaya alam mo palagi kung sino ang kausap mo. Walang account manager, walang paikot-ikot.',
  members: [
    {
      name: 'Shiek Abdurahman',
      initials: 'SA',
      photo: 'shiek',
      role: 'Developer',
      accent: 'var(--color-teal-deep)',
      bio: 'Siya ang gumagawa ng bawat website at automation, pati ang teknikal na bahagi — mula sa unang linya ng code hanggang sa hosting.',
      focus: ['Website', 'Automation', 'Hosting'],
    },
    {
      name: 'Dave Calio',
      initials: 'DC',
      photo: 'dave',
      role: 'Unang kausap & onboarding',
      accent: 'var(--color-teal-bright)',
      bio: 'Siya ang madalas mong unang makakausap. Ipapakita niya sa iyo mismo ang listing mo sa Maps — walang mabigat na termino.',
      focus: ['Unang kausap', 'Maps check', 'Onboarding'],
    },
    {
      name: 'Haiqal Munjalin',
      initials: 'HM',
      photo: 'haiqal',
      role: 'Marketing & sales',
      accent: 'var(--color-coral)',
      bio: 'Siya ang humahawak ng presentation at follow-through, mula sa unang usapan hanggang sa malinaw na kasunduan.',
      focus: ['Presentation', 'Scoping', 'Follow-through'],
    },
  ],
}

// Interactive tap-card demo. Kept on the local page only — the card is a
// mechanism for collecting reviews here, not a product line.
export const nfcDemo = {
  eyebrow: 'Ang tap card',
  title: 'Isang tap. Nasa kanila na.',
  body: 'Isang tap at nasa telepono na nila ang review page, website, socials at number mo — walang app, walang type. I-hover ang card para makita.',
  rows: [
    { icon: 'star', label: 'Review page mo' },
    { icon: 'globe', label: 'yourbusiness.ph' },
    { icon: 'facebook', label: 'facebook.com/yourbiz' },
    { icon: 'phone', label: '+63 9XX XXX XXXX' },
  ],
}

export const mascot = {
  eyebrow: 'Kilalanin si Khybi',
  title: ['Hi, si ', 'Khybi', '.'],
  body: 'Siya ang gabay mo sa pahinang ito. Kung saan mo siya makita, may itinuturo siyang bagay na makakatulong para makita at mapagkatiwalaan ang negosyo mo.',
  points: ['Gabay sa buong serbisyo', 'Lumalabas kung saan mahalaga', 'Panig sa iyo palagi'],
}

export const footer = {
  blurb:
    'Google Business Profile, reviews, website at automation para sa mga negosyo sa Zamboanga City at buong Mindanao.',
  altPage: { label: 'International — automation in USD', href: '../' },
}
