/**
 * SINGLE SOURCE OF TRUTH for business facts (NAP, claims, links).
 * Every page, the footer and all JSON-LD read from here so humans,
 * Google and AI assistants never see contradicting data.
 * Status of each fact is tracked in /PENDING_CLIENT_APPROVAL.md.
 */
export const SITE_URL = (import.meta.env.SITE_URL as string | undefined) ?? 'https://roamzacleaningservices.com';

export const business = {
  name: 'Roamza Cleaning Services',
  legalName: 'Roamza Cleaning Services LLC',
  tagline: 'Your Space, Our Cleaning Mission',
  founder: { name: 'Miriam Rodriguez', role: 'Owner & Founder' },
  yearsExperience: 10,
  phone: { display: '(347) 335-1042', e164: '+13473351042', sms: 'sms:+13473351042', tel: 'tel:+13473351042' },
  whatsapp: 'https://wa.me/13473351042',
  email: 'info@roamzacleaningservices.com',
  base: { locality: 'Dallas', region: 'PA', regionName: 'Pennsylvania', postalCode: '18612', country: 'US', county: 'Luzerne County' },
  geo: { lat: 41.3362, lng: -75.9636 },
  counties: ['Luzerne County', 'Lackawanna County', 'Wyoming County'],
  social: {
    facebook: 'https://www.facebook.com/ROAMZACleaningServices/',
    instagram: 'https://www.instagram.com/roamzacleaning_services/',
    tiktok: 'https://www.tiktok.com/@roamzacleaningservices',
    google: 'https://maps.google.com/?cid=157043092894109933',
  },
  frequencies: ['Weekly', 'Bi-weekly', 'Every 3 weeks', 'Monthly'],
  deposit: 50,
  claims: {
    families: 500,
    rating: 5.0,
    reviewCount: 35,
    responseMinutes: 15,
    quoteSeconds: 15,
    daysPerWeek: 7,
  },
  badges: ['Licensed, Bonded & Insured', 'Satisfaction Guaranteed', 'Background-Checked Team', 'Flexible Scheduling'],
  affiliations: [
    { name: 'Cleaning for a Reason', detail: 'Premium Partner', url: 'https://cleaningforareason.org/' },
    { name: 'Back Mountain Chamber', detail: 'Member', url: 'https://www.backmountainchamber.org/' },
  ],
  otherServices: ['Before & after party cleaning', 'Home organization services'],
  // HomeSuite Pro FastQuoted widget (official embed supplied by Helice, Nov 2026).
  fastQuote: {
    org: 'org-hs_tvhqt0Ni3yauV4oU0EWO',
    src: 'https://widget.homesuitepro.com/?org=org-hs_tvhqt0Ni3yauV4oU0EWO&api=https%3A%2F%2Ffastquoted.homesuitepro.com',
    bridge: 'https://widget.homesuitepro.com/fastquoted-bridge.js',
  },
  agency: { name: 'Helice Digital Solutions LLC', url: 'https://heliceds.com/' },
} as const;

/** Feature flags for content that depends on client confirmation. */
export const flags = {
  showOpeningHours: false, // exact hours pending
  showPrices: false, // no approved price ranges yet
};
