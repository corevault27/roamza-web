/**
 * Service areas. Rollout in waves (see docs/SEO-PLAN.md):
 *  - status 'published' → gets its own page + sitemap entry
 *  - status 'draft'     → listed (text only) on its county hub until local evidence exists
 * Publish gate for a city: ≥2 unique local evidence items (real job, local review,
 * property types served, operational detail) + unique intro + local FAQs.
 * Coordinates are approximate town centers, used only for the schematic map.
 */
export type CountySlug = 'luzerne-county' | 'lackawanna-county' | 'wyoming-county';

export type City = {
  slug: string;
  name: string;
  county: CountySlug;
  lat: number;
  lng: number;
  wave: 1 | 2 | 3;
  status: 'published' | 'draft';
  focus?: ('residential' | 'airbnb' | 'commercial')[];
  page?: {
    title: string;
    description: string;
    h1: string;
    answer: string;
    intro: string[];
    localProof: string[];
    homes: string;
    services: string[];
    faqs: { q: string; a: string }[];
    nearby: string[];
  };
};

export const counties: Record<CountySlug, { name: string; seat: string; title: string; description: string; h1: string; answer: string; intro: string[] }> = {
  'luzerne-county': {
    name: 'Luzerne County',
    seat: 'Wilkes-Barre',
    title: 'Cleaning Services in Luzerne County, PA | Roamza',
    description: 'House, deep, move-out, Airbnb, office and post-construction cleaning across Luzerne County, PA — Dallas, Wilkes-Barre, Kingston, Mountain Top and more.',
    h1: 'Cleaning Services Across Luzerne County, PA',
    answer: 'Roamza Cleaning Services is a locally owned cleaning company based in Dallas, Luzerne County. We provide regular house cleaning, Signature Deep Cleaning, move-in/move-out, Airbnb turnover, office and post-construction cleaning from the Back Mountain to the Wyoming Valley and Mountain Top.',
    intro: [
      'Luzerne County is home base. Our team started in Dallas and the Back Mountain, and today we clean homes, rentals and workplaces in communities across the county — from lake homes around Harveys Lake to busy households in Wilkes-Barre, Kingston and the West Side, and family neighborhoods in Mountain Top.',
      'Every visit follows the same checklist-driven standard, whichever town you live in. You can see an estimated price in under 15 seconds, and our team answers requests within 15 minutes, 7 days a week.',
    ],
  },
  'lackawanna-county': {
    name: 'Lackawanna County',
    seat: 'Scranton',
    title: 'Cleaning Services in Lackawanna County, PA | Roamza',
    description: 'House, deep, move-out, Airbnb and office cleaning in Lackawanna County — Scranton, Clarks Summit, Dunmore, Old Forge and Moosic. Instant online quote.',
    h1: 'Cleaning Services in Lackawanna County, PA',
    answer: 'Roamza Cleaning Services brings its home, rental and commercial cleaning to Lackawanna County, including Scranton, Clarks Summit, Dunmore, Old Forge and Moosic. Services include regular and deep house cleaning, move-in/move-out, Airbnb turnovers and office cleaning, with instant online estimates.',
    intro: [
      'From Scranton’s city neighborhoods and downtown offices to the residential streets of Clarks Summit, Dunmore, Old Forge and Moosic, Lackawanna County households and businesses can book the same Roamza standard we deliver in Luzerne County.',
      'We also partner with Cleaning for a Reason to donate home cleanings to people undergoing cancer treatment in Luzerne and Lackawanna Counties.',
    ],
  },
  'wyoming-county': {
    name: 'Wyoming County',
    seat: 'Tunkhannock',
    title: 'Cleaning Services in Wyoming County, PA | Roamza',
    description: 'Home, deep, move-out and vacation rental cleaning in Wyoming County, PA, including Tunkhannock. Locally owned team from nearby Dallas, PA.',
    h1: 'Cleaning Services in Wyoming County, PA',
    answer: 'Roamza Cleaning Services serves Wyoming County, PA, including Tunkhannock, from our base in nearby Dallas in the Back Mountain. Homeowners and rental owners can book regular, deep, move-in/move-out and vacation rental turnover cleaning.',
    intro: [
      'Wyoming County borders the Back Mountain, so Tunkhannock and nearby communities are a natural part of our service area. Request an online estimate to confirm availability for your address and preferred schedule.',
    ],
  },
};

export const cities: City[] = [
  // ---------- WAVE 1 · published ----------
  {
    slug: 'dallas-pa', name: 'Dallas', county: 'luzerne-county', lat: 41.3362, lng: -75.9636, wave: 1, status: 'published', focus: ['residential', 'airbnb', 'commercial'],
    page: {
      title: 'House Cleaning in Dallas, PA | Roamza Cleaning Services',
      description: 'Locally owned house cleaning in Dallas, PA and the Back Mountain: regular, deep, move-out, Airbnb and office cleaning. 5.0 on Google. Instant quote.',
      h1: 'House Cleaning Services in Dallas, PA',
      answer: 'Roamza Cleaning Services is based in Dallas, PA. Our local, background-checked team provides regular house cleaning, Signature Deep Cleaning, move-in/move-out, Airbnb turnover, office and post-construction cleaning throughout Dallas and the Back Mountain, with estimates online in under 15 seconds. Neighbors searching for house cleaners or a maid service in Dallas reach the same local team.',
      intro: [
        'Dallas is where Roamza began, and it is still our home base. That means the team cleaning your home is local — we are not a franchise and not a call center — and Dallas, Dallas Township and the surrounding Back Mountain are the areas we know best.',
        'Families here often book recurring visits so weekends stay free, start with a Signature Deep Cleaning for a seasonal reset, or call us before a move. Local businesses rely on us for office cleaning built around their hours.',
      ],
      localProof: ['Roamza is headquartered in Dallas, PA 18612.', '“I recently hired Roamza Cleaning Services for a deep clean of my home in Dallas, PA, and the results were outstanding.” — Cesar Galvis, Google review', 'Member of the Back Mountain Chamber.', 'Cleaning for a Reason partner serving Dallas and the Back Mountain.'],
      homes: 'Single-family homes, lake and vacation properties, apartments and small offices across Dallas Borough, Dallas Township and nearby Back Mountain communities.',
      services: ['regular-cleaning', 'deep-cleaning', 'move-out-in-cleaning', 'airbnb-cleaning', 'office-cleaning'],
      faqs: [
        { q: 'Is Roamza a local Dallas, PA company?', a: 'Yes. Roamza Cleaning Services is locally owned and based in Dallas, PA 18612. We are not a franchise or a call center.' },
        { q: 'Do you clean in the Back Mountain outside Dallas?', a: 'Yes. We serve Dallas, Shavertown, Harveys Lake and nearby Back Mountain communities, along with the rest of Luzerne County.' },
        { q: 'How quickly can I get a cleaning price in Dallas?', a: 'Use Fast Quote online for an estimate in under 15 seconds, or call or text (272) 203-3263. We respond within 15 minutes, 7 days a week.' },
      ],
      nearby: ['shavertown-pa', 'kingston-pa', 'wilkes-barre-pa'],
    },
  },
  {
    slug: 'wilkes-barre-pa', name: 'Wilkes-Barre', county: 'luzerne-county', lat: 41.2459, lng: -75.8813, wave: 1, status: 'published', focus: ['residential', 'airbnb', 'commercial'],
    page: {
      title: 'Cleaning Services in Wilkes-Barre, PA | Roamza',
      description: 'House, deep, move-out, Airbnb and office cleaning in Wilkes-Barre, PA by a local, background-checked team. 5.0 on Google. Get a price in 15 seconds.',
      h1: 'Cleaning Services in Wilkes-Barre, PA',
      answer: 'Roamza Cleaning Services cleans homes, rentals and offices in Wilkes-Barre, PA, the Luzerne County seat. Services include recurring house cleaning, Signature Deep Cleaning, move-in/move-out cleaning for tenants and landlords, Airbnb turnovers and commercial cleaning, booked online with an instant estimate.',
      intro: [
        'Wilkes-Barre mixes historic homes, apartments, student rentals near the universities and a busy downtown — so our requests here range from weekly house cleaning to move-out cleans between leases and turnovers for short-term rentals.',
        'For offices and storefronts, we build a cleaning plan after a walkthrough so the scope and schedule match how your business runs.',
      ],
      localProof: ['Wilkes-Barre is listed in Roamza’s core service area.', 'Cleaning for a Reason partner donating cleanings to patients in Wilkes-Barre.', 'Move-in/move-out and turnover cleaning built for rentals and multi-unit properties.'],
      homes: 'Historic single-family homes, duplexes, apartments, student and short-term rentals, offices and storefronts.',
      services: ['move-out-in-cleaning', 'regular-cleaning', 'airbnb-cleaning', 'office-cleaning', 'deep-cleaning'],
      faqs: [
        { q: 'Do you offer move-out cleaning for Wilkes-Barre apartments and rentals?', a: 'Yes. Our Move-In / Move-Out Cleaning is designed for empty or mostly empty homes and apartments, including inside cabinets and drawers, appliances’ exteriors, bathrooms, baseboards and floors.' },
        { q: 'Can you clean my office in Wilkes-Barre?', a: 'Yes. Commercial cleaning is customized after a walkthrough of your space, covering workstations, common areas, breakrooms and restrooms.' },
        { q: 'Do you clean Airbnbs in Wilkes-Barre?', a: 'Yes. We provide turnover cleaning, staging, restocking of owner-provided supplies and damage reporting for short-term rentals.' },
      ],
      nearby: ['kingston-pa', 'mountain-top-pa', 'dallas-pa'],
    },
  },
  {
    slug: 'kingston-pa', name: 'Kingston', county: 'luzerne-county', lat: 41.2620, lng: -75.8966, wave: 1, status: 'published', focus: ['commercial', 'residential'],
    page: {
      title: 'Office & House Cleaning in Kingston, PA | Roamza',
      description: 'Office cleaning and house cleaning in Kingston, PA and the West Side: customized commercial plans, recurring and deep home cleaning. Instant estimate online.',
      h1: 'Office & House Cleaning in Kingston, PA',
      answer: 'Roamza Cleaning Services provides office and commercial cleaning and residential house cleaning in Kingston, PA and nearby West Side communities such as Forty Fort, Edwardsville and Swoyersville. Commercial plans are customized after a walkthrough; home cleaning is available weekly, bi-weekly, every 3 weeks or monthly.',
      intro: [
        'Kingston sits on the West Side of the Wyoming Valley, between the Back Mountain and Wilkes-Barre. Its mix of professional offices, small businesses and established neighborhoods makes it one of the places where we do both commercial and residential work.',
        'Business owners get a cleaning plan based on a walkthrough of their facility; homeowners can pick a recurring schedule or start with a deep clean.',
      ],
      localProof: ['Kingston is listed in Roamza’s core service area.', 'Kingston businesses already search for Roamza’s office cleaning services.', 'Short drive from our Dallas base through the Back Mountain.'],
      homes: 'Professional offices, small businesses, single-family homes and apartments across Kingston and the West Side.',
      services: ['office-cleaning', 'regular-cleaning', 'deep-cleaning', 'move-out-in-cleaning'],
      faqs: [
        { q: 'Do you offer office cleaning in Kingston, PA?', a: 'Yes. We clean offices and commercial spaces in Kingston with a plan customized after a walkthrough: workstations, high-touch points, common areas, breakrooms and restrooms.' },
        { q: 'Do you also clean homes in Kingston?', a: 'Yes. Regular Cleaning, Signature Deep Cleaning and Move-In / Move-Out Cleaning are all available in Kingston and nearby West Side towns.' },
        { q: 'Which nearby towns do you serve?', a: 'Forty Fort, Edwardsville, Swoyersville, Luzerne, Wyoming, Larksville and Plymouth are all within our Luzerne County service area.' },
      ],
      nearby: ['wilkes-barre-pa', 'dallas-pa', 'shavertown-pa'],
    },
  },
  {
    slug: 'shavertown-pa', name: 'Shavertown', county: 'luzerne-county', lat: 41.3187, lng: -75.9388, wave: 1, status: 'published', focus: ['residential', 'airbnb'],
    page: {
      title: 'House Cleaning in Shavertown & the Back Mountain | Roamza',
      description: 'Recurring, deep and move-out house cleaning in Shavertown, Trucksville, Lehman and the Back Mountain, PA. Local team from Dallas. Price in 15 seconds.',
      h1: 'House Cleaning in Shavertown & the Back Mountain, PA',
      answer: 'Roamza Cleaning Services provides house cleaning in Shavertown and the Back Mountain, including Trucksville, Lehman, Harveys Lake and Dallas. Our local team offers recurring cleaning, Signature Deep Cleaning, move-in/move-out cleaning and vacation rental turnovers, minutes from our Dallas base.',
      intro: [
        'Shavertown is our neighbor. Being based in Dallas, the Back Mountain is where our team spends much of its week — which is why families here can count on the same faces and the same standard visit after visit.',
        'Many Back Mountain households choose bi-weekly or every-3-weeks cleaning, and lake-area owners use our turnover service for weekend guests.',
      ],
      localProof: ['Neighboring community to Roamza’s Dallas headquarters.', 'Member of the Back Mountain Chamber.', 'Cleaning for a Reason partner serving the Back Mountain.'],
      homes: 'Family homes, newer developments, lake and vacation properties across Shavertown, Trucksville, Lehman and Harveys Lake.',
      services: ['regular-cleaning', 'deep-cleaning', 'airbnb-cleaning', 'move-out-in-cleaning'],
      faqs: [
        { q: 'Which Back Mountain communities do you serve?', a: 'Shavertown, Dallas, Trucksville, Lehman, Harveys Lake and the surrounding Back Mountain communities.' },
        { q: 'Can I keep the same cleaning schedule every month?', a: 'Yes. Choose weekly, bi-weekly, every 3 weeks or monthly. Need to reschedule? Just call or text us.' },
        { q: 'Do you clean lake houses and vacation rentals?', a: 'Yes. We provide turnover cleaning for vacation rentals, including staging, restocking owner-provided supplies and damage reporting.' },
      ],
      nearby: ['dallas-pa', 'kingston-pa', 'wilkes-barre-pa'],
    },
  },
  {
    slug: 'mountain-top-pa', name: 'Mountain Top', county: 'luzerne-county', lat: 41.1690, lng: -75.8774, wave: 1, status: 'published', focus: ['residential'],
    page: {
      title: 'House Cleaning & Maid Service in Mountain Top, PA | Roamza',
      description: 'Recurring house cleaning, Signature Deep Cleaning and move-in/move-out cleaning in Mountain Top, PA. Background-checked local team. Instant quote online.',
      h1: 'House Cleaning in Mountain Top, PA',
      answer: 'Roamza Cleaning Services offers house cleaning in Mountain Top, PA, including recurring cleaning (weekly, bi-weekly, every 3 weeks or monthly), Signature Deep Cleaning and move-in/move-out cleaning. Our local, background-checked team is licensed, bonded and insured, and estimates are available online in under 15 seconds.',
      intro: [
        'Mountain Top’s neighborhoods are full of busy family homes — exactly the kind of household our Regular Cleaning was designed for. Instead of spending weekends catching up, you come home to the same clean standard every visit.',
        'New to the area? A move-in cleaning gets your home sanitized before the boxes arrive, and a deep clean is the best first visit before recurring service.',
      ],
      localProof: ['Cleaning for a Reason partner donating cleanings to patients in Mountain Top.', 'Recurring and deep cleaning designed for family homes.', 'Part of Roamza’s Luzerne County service area.'],
      homes: 'Single-family homes and growing households in Mountain Top and the surrounding townships.',
      services: ['regular-cleaning', 'deep-cleaning', 'move-out-in-cleaning'],
      faqs: [
        { q: 'Do you offer recurring house cleaning in Mountain Top?', a: 'Yes. Choose weekly, bi-weekly, every 3 weeks or monthly cleaning for your Mountain Top home.' },
        { q: 'What is the best first service for a new client?', a: 'Most homes start with Signature Deep Cleaning, which covers baseboards, blinds, fans and behind appliances, then continue with Regular Cleaning.' },
        { q: 'How do I book?', a: 'Get an estimate online in under 15 seconds and secure your date with a $50 deposit, or call or text (272) 203-3263.' },
      ],
      nearby: ['wilkes-barre-pa', 'kingston-pa', 'dallas-pa'],
    },
  },
  {
    slug: 'scranton-pa', name: 'Scranton', county: 'lackawanna-county', lat: 41.4090, lng: -75.6624, wave: 1, status: 'published', focus: ['residential', 'airbnb', 'commercial'],
    page: {
      title: 'House & Office Cleaning Services in Scranton, PA | Roamza',
      description: 'House, deep, move-out, Airbnb and office cleaning in Scranton, PA and Lackawanna County. 5.0 on Google, licensed, bonded & insured. Instant estimate.',
      h1: 'Cleaning Services in Scranton, PA',
      answer: 'Roamza Cleaning Services provides residential, rental and commercial cleaning in Scranton, PA and Lackawanna County. Services include recurring house cleaning, Signature Deep Cleaning, move-in/move-out cleaning, Airbnb and vacation rental turnovers and office cleaning, with online estimates in under 15 seconds.',
      intro: [
        'Scranton is the anchor of our Lackawanna County service area. Its city neighborhoods, rentals and downtown offices create demand for everything we do — from recurring home cleaning to move-out cleans between tenants and customized office plans.',
        'Through our partnership with Cleaning for a Reason, we also donate cleanings to qualifying people undergoing cancer treatment in Scranton.',
      ],
      localProof: ['Scranton is listed in Roamza’s core service area.', 'Cleaning for a Reason partner donating cleanings to patients in Scranton.', 'Commercial plans customized after a walkthrough.'],
      homes: 'Single-family homes, multi-unit rentals, apartments, short-term rentals and offices across Scranton.',
      services: ['regular-cleaning', 'move-out-in-cleaning', 'airbnb-cleaning', 'office-cleaning', 'deep-cleaning'],
      faqs: [
        { q: 'Does Roamza serve Scranton and Lackawanna County?', a: 'Yes. We serve Scranton and nearby Lackawanna County communities including Clarks Summit, Dunmore, Old Forge and Moosic.' },
        { q: 'Can you clean rental units between tenants in Scranton?', a: 'Yes. Move-In / Move-Out Cleaning covers inside empty cabinets and drawers, bathrooms, kitchens, baseboards, blinds and floors.' },
        { q: 'Do you offer commercial cleaning in Scranton?', a: 'Yes. We start with a walkthrough to define scope and frequency, then build a plan for your workplace.' },
      ],
      nearby: ['wilkes-barre-pa', 'kingston-pa', 'dallas-pa'],
    },
  },

  // ---------- WAVE 2 · draft (listed on county hubs) ----------
  { slug: 'harveys-lake-pa', name: 'Harveys Lake', county: 'luzerne-county', lat: 41.3829, lng: -76.0249, wave: 2, status: 'draft', focus: ['airbnb', 'residential'] },
  { slug: 'clarks-summit-pa', name: 'Clarks Summit', county: 'lackawanna-county', lat: 41.4887, lng: -75.7085, wave: 2, status: 'draft', focus: ['residential'] },
  { slug: 'pittston-pa', name: 'Pittston', county: 'luzerne-county', lat: 41.3259, lng: -75.7893, wave: 2, status: 'draft', focus: ['residential', 'commercial'] },
  { slug: 'plains-pa', name: 'Plains', county: 'luzerne-county', lat: 41.2754, lng: -75.8510, wave: 2, status: 'draft', focus: ['airbnb', 'commercial'] },
  { slug: 'forty-fort-pa', name: 'Forty Fort', county: 'luzerne-county', lat: 41.2790, lng: -75.8783, wave: 2, status: 'draft', focus: ['residential'] },
  { slug: 'nanticoke-pa', name: 'Nanticoke', county: 'luzerne-county', lat: 41.2051, lng: -76.0049, wave: 2, status: 'draft', focus: ['residential'] },

  // ---------- WAVE 3 · draft ----------
  { slug: 'wyoming-pa', name: 'Wyoming', county: 'luzerne-county', lat: 41.3118, lng: -75.8374, wave: 3, status: 'draft' },
  { slug: 'west-wyoming-pa', name: 'West Wyoming', county: 'luzerne-county', lat: 41.3201, lng: -75.8460, wave: 3, status: 'draft' },
  { slug: 'exeter-pa', name: 'Exeter', county: 'luzerne-county', lat: 41.3206, lng: -75.8190, wave: 3, status: 'draft' },
  { slug: 'swoyersville-pa', name: 'Swoyersville', county: 'luzerne-county', lat: 41.2915, lng: -75.8752, wave: 3, status: 'draft' },
  { slug: 'edwardsville-pa', name: 'Edwardsville', county: 'luzerne-county', lat: 41.2698, lng: -75.9166, wave: 3, status: 'draft' },
  { slug: 'luzerne-pa', name: 'Luzerne', county: 'luzerne-county', lat: 41.2851, lng: -75.9027, wave: 3, status: 'draft' },
  { slug: 'larksville-pa', name: 'Larksville', county: 'luzerne-county', lat: 41.2451, lng: -75.9307, wave: 3, status: 'draft' },
  { slug: 'plymouth-pa', name: 'Plymouth', county: 'luzerne-county', lat: 41.2403, lng: -75.9446, wave: 3, status: 'draft' },
  { slug: 'duryea-pa', name: 'Duryea', county: 'luzerne-county', lat: 41.3443, lng: -75.7385, wave: 3, status: 'draft' },
  { slug: 'ashley-pa', name: 'Ashley', county: 'luzerne-county', lat: 41.2101, lng: -75.8966, wave: 3, status: 'draft' },
  { slug: 'nuangola-pa', name: 'Nuangola', county: 'luzerne-county', lat: 41.1590, lng: -75.9743, wave: 3, status: 'draft' },
  { slug: 'lehman-pa', name: 'Lehman', county: 'luzerne-county', lat: 41.3168, lng: -76.0257, wave: 3, status: 'draft' },
  { slug: 'old-forge-pa', name: 'Old Forge', county: 'lackawanna-county', lat: 41.3712, lng: -75.7349, wave: 3, status: 'draft' },
  { slug: 'moosic-pa', name: 'Moosic', county: 'lackawanna-county', lat: 41.3534, lng: -75.7380, wave: 3, status: 'draft' },
  { slug: 'dunmore-pa', name: 'Dunmore', county: 'lackawanna-county', lat: 41.4198, lng: -75.6324, wave: 3, status: 'draft' },
  { slug: 'tunkhannock-pa', name: 'Tunkhannock', county: 'wyoming-county', lat: 41.5387, lng: -75.9466, wave: 3, status: 'draft' },
];

export const publishedCities = cities.filter((c) => c.status === 'published');
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const citiesIn = (county: CountySlug) => cities.filter((c) => c.county === county);
export const cityUrl = (c: City) => `/service-areas/${c.slug}/`;
