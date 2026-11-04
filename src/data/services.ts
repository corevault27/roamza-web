/**
 * Services: task lists come verbatim-in-substance from Roamza's own service
 * pages (confirmed by Helice, Nov 2026). Never add tasks that are not listed here.
 * Slugs keep the indexed WordPress URLs (no redirects needed).
 */
export type Room = { name: string; image: string; tasks: string[] };
export type Faq = { q: string; a: string };
export type Service = {
  slug: string;
  name: string;
  short: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  heroLine: string;
  answer: string;
  hero: string; // real job photo
  card: string; // illustration
  audience: string[];
  highlights: { title: string; text: string }[];
  rooms: Room[];
  roomsIntro?: string;
  addOns?: string[];
  addOnsNote?: string;
  notIncluded?: string;
  process?: string;
  faqs: Faq[];
  related: string[];
  serviceType: string;
};

const addOnNote = 'Add-on services must be requested in advance so we can allow enough time for your appointment. Additional charges may apply.';

export const services: Service[] = [
  {
    slug: 'regular-cleaning',
    name: 'Regular Cleaning',
    navLabel: 'Regular House Cleaning',
    short: 'Recurring house cleaning for busy homes that want to stay consistently clean — weekly, bi-weekly, every 3 weeks or monthly.',
    title: 'Regular House Cleaning in Dallas, PA | Roamza',
    description: 'Recurring house cleaning in Dallas, PA and Luzerne County — weekly, bi-weekly, every 3 weeks or monthly. Background-checked team. Get a price in 15 seconds.',
    h1: 'Regular House Cleaning in Dallas, PA & Luzerne County',
    eyebrow: 'Recurring home cleaning',
    heroLine: 'A clean home. More time for you.',
    answer: 'Roamza’s Regular Cleaning is a recurring house cleaning service for homes in Dallas, PA and across Luzerne, Lackawanna and Wyoming Counties. A trained, background-checked team cleans your kitchen, bathrooms, bedrooms and living areas on a weekly, bi-weekly, every-3-weeks or monthly schedule. You can get an estimated price online in under 15 seconds.',
    hero: 'real/living-room-white-sofa.jpg',
    card: 'rooms/regular-living.jpg',
    audience: ['Busy families and working professionals', 'Homeowners who want to stop spending weekends cleaning', 'Anyone who wants to feel “caught up” every week'],
    highlights: [
      { title: 'Real reliability', text: 'We show up on time, every time. No more missed appointments.' },
      { title: 'Professional team', text: 'Trained, background-checked cleaners who treat your home with respect.' },
      { title: 'Easy communication', text: 'Need to reschedule? Just call or text us. We make it simple.' },
      { title: 'Your frequency', text: 'Weekly, bi-weekly, every 3 weeks or monthly — we adapt to your lifestyle.' },
    ],
    rooms: [
      { name: 'Kitchen', image: 'rooms/regular-kitchen.jpg', tasks: ['Countertops and accessible surfaces cleaned', 'Sink and faucet cleaned', 'Backsplash cleaned', 'Exterior of cabinets and cabinet handles wiped down', 'Exterior of refrigerator, stove/range and appliances cleaned', 'Microwave cleaned inside and outside', 'Tables and chairs wiped down', 'Trash removed and liner replaced', 'Floors vacuumed and mopped'] },
      { name: 'Bathrooms', image: 'rooms/deep-bathrooms.jpg', tasks: ['Sink, faucet and vanity cleaned', 'Mirrors cleaned', 'Shower and/or bathtub cleaned', 'Toilet cleaned and disinfected, including exterior and behind the toilet', 'Accessible surfaces dusted and wiped', 'Cabinet exteriors and handles wiped down', 'Trash removed and liner replaced', 'Floors vacuumed and mopped'] },
      { name: 'Bedrooms', image: 'rooms/regular-bedrooms.jpg', tasks: ['Accessible furniture and surfaces dusted', 'Nightstands and dressers wiped down', 'Underneath beds cleaned when reachable without moving furniture', 'Mirrors cleaned', 'Floors vacuumed and/or mopped'] },
      { name: 'Living & common areas', image: 'rooms/regular-living.jpg', tasks: ['Furniture and accessible surfaces dusted', 'Tables and décor dusted', 'Glass doors cleaned', 'Sofa cushions and pillows arranged', 'Rugs vacuumed', 'Floors vacuumed and mopped'] },
      { name: 'Throughout the home', image: 'rooms/regular-throughout.jpg', tasks: ['Door handles and frequently touched areas wiped down', 'Window sills and accessible interior window frames wiped (without opening windows)', 'Blinds lightly dusted', 'Trash removed and liners replaced', 'Floors vacuumed and mopped, including under furniture when reachable without moving it'] },
    ],
    addOns: ['Inside refrigerator cleaning', 'Inside oven cleaning', 'Interior window cleaning', 'Detailed baseboard cleaning', 'Detailed doors and door frames', 'Detailed blinds cleaning', 'Ceiling fans and accessible light fixtures', 'Sofa vacuuming', 'Organization services', 'Bed linen changes (upon request and availability)'],
    addOnsNote: addOnNote,
    faqs: [
      { q: 'How often can Roamza clean my home?', a: 'You can choose weekly, bi-weekly, every 3 weeks or monthly visits. Pick the frequency that fits your home and schedule when you request your quote.' },
      { q: 'What is the difference between Regular Cleaning and Signature Deep Cleaning?', a: 'Regular Cleaning keeps a home consistently clean on a recurring schedule. Signature Deep Cleaning includes everything in Regular Cleaning plus detailed work such as baseboards, doors and door frames, blinds, ceiling fans and cleaning behind or under appliances and furniture when safe. Many homes start with a deep clean and continue with regular visits.' },
      { q: 'Can I add extra tasks like the inside of the fridge or oven?', a: 'Yes. Inside refrigerator, inside oven, interior windows, detailed baseboards, blinds, ceiling fans, sofa vacuuming, organization and linen changes are available as add-ons. Request them in advance; additional charges may apply.' },
      { q: 'How do I get a price for regular cleaning?', a: 'Use the Fast Quote tool on our website to see an estimated price in under 15 seconds, or call or text (272) 203-3263. A $50 deposit secures your booking.' },
    ],
    related: ['deep-cleaning', 'move-out-in-cleaning', 'airbnb-cleaning'],
    serviceType: 'House cleaning',
  },
  {
    slug: 'deep-cleaning',
    name: 'Signature Deep Cleaning',
    navLabel: 'Signature Deep Cleaning',
    short: 'Detailed top-to-bottom cleaning for first-time visits, seasonal resets or homes that need extra attention.',
    title: 'Deep Cleaning Service in Luzerne County, PA | Roamza',
    description: 'Signature Deep Cleaning in Dallas, Wilkes-Barre, Kingston and across Luzerne County: baseboards, blinds, fans, behind appliances and more. Instant quote online.',
    h1: 'Signature Deep Cleaning in Luzerne County, PA',
    eyebrow: 'Top-to-bottom reset',
    heroLine: 'A deeper clean. A fresher home.',
    answer: 'Signature Deep Cleaning is Roamza’s most detailed home cleaning. It includes everything in Regular Cleaning plus baseboards, doors and door frames, blinds, ceiling fans, interior window frames and cleaning behind and under appliances and furniture when it is safe to move them. It is ideal for a first visit, a seasonal reset or a home that needs extra attention, and is available across Luzerne, Lackawanna and Wyoming Counties.',
    hero: 'real/open-kitchen-quartz-counter.jpg',
    card: 'rooms/deep-kitchen.jpg',
    audience: ['First-time clients before starting recurring service', 'Seasonal and spring resets', 'Homes before or after guests, holidays or events', 'Homes that have not been professionally cleaned in a while'],
    roomsIntro: 'Includes everything in our Regular Cleaning, plus:',
    highlights: [
      { title: 'Everything in Regular, plus more', text: 'Baseboards, doors, blinds, fans and fixtures are already included.' },
      { title: 'Behind and underneath', text: 'Appliances and furniture are moved when safe and accessible.' },
      { title: 'Perfect first visit', text: 'Start with a deep clean, then keep it that way with regular visits.' },
      { title: 'Background-checked team', text: 'Trained professionals who respect your home.' },
    ],
    rooms: [
      { name: 'Kitchen', image: 'rooms/deep-kitchen.jpg', tasks: ['Detailed cleaning of cabinet exteriors, handles and edges', 'Detailed backsplash cleaning', 'Stove/range and surrounding areas deep cleaned', 'Range hood exterior thoroughly cleaned and degreased', 'Exterior of refrigerator and appliances detailed', 'Behind and underneath refrigerator and stove cleaned — appliances moved when safe and accessible', 'Microwave thoroughly cleaned inside and outside', 'Doors, door frames and baseboards cleaned'] },
      { name: 'Bathrooms', image: 'rooms/deep-bathrooms.jpg', tasks: ['Detailed cleaning and disinfecting of shower and/or bathtub', 'Detailed cleaning around faucets, fixtures and vanity', 'Toilet thoroughly cleaned, including exterior, base and behind the toilet', 'Cabinet exteriors and handles detailed', 'Doors, door frames and baseboards cleaned'] },
      { name: 'Bedrooms', image: 'rooms/deep-bedrooms.jpg', tasks: ['Detailed dusting of furniture and accessible surfaces', 'Beds moved when safe and possible to clean underneath', 'Doors, door frames and baseboards cleaned', 'Blinds cleaned', 'Accessible ceiling fans and light fixtures cleaned'] },
      { name: 'Living & common areas', image: 'rooms/deep-living.jpg', tasks: ['Detailed dusting of furniture, décor and accessible surfaces', 'Sofas vacuumed, including accessible areas beneath cushions', 'Sofas and movable furniture moved when safe to clean underneath', 'Interior windows, frames and dividers cleaned', 'Blinds, doors, door frames and baseboards cleaned', 'Accessible ceiling fans and light fixtures cleaned'] },
      { name: 'Throughout the home', image: 'rooms/deep-throughout.jpg', tasks: ['Accessible cobwebs removed', 'Detailed baseboards, doors and door frames', 'Blinds, interior window frames and sills', 'Ceiling fans and accessible light fixtures', 'Detailed vacuuming and mopping'] },
    ],
    addOns: ['Inside refrigerator', 'Inside oven', 'Interior cabinet cleaning', 'Sofa vacuuming', 'Interior window glass cleaning', 'Bed linen changes', 'Home organization', 'Additional specialty cleaning requests'],
    addOnsNote: addOnNote,
    faqs: [
      { q: 'What does Signature Deep Cleaning include that regular cleaning does not?', a: 'Detailed baseboards, doors and door frames, blinds, accessible ceiling fans and light fixtures, interior window frames and sills, cobweb removal, degreasing the range hood exterior, and cleaning behind and under appliances, beds and sofas when they can be moved safely.' },
      { q: 'When should I book a deep clean?', a: 'A deep clean is a great first visit before recurring service, a seasonal reset, or a refresh for a home that needs extra attention — for example before hosting guests or after a busy season.' },
      { q: 'Are ceiling fans, blinds and baseboards included?', a: 'Yes. Ceiling fans, blinds, baseboards and doors and door frames are already included in Signature Deep Cleaning.' },
      { q: 'Can I add the inside of my oven or refrigerator?', a: 'Yes. Inside refrigerator, inside oven, interior cabinets, interior window glass and other add-ons can be requested in advance; additional charges may apply.' },
    ],
    related: ['regular-cleaning', 'move-out-in-cleaning', 'construction-cleaning'],
    serviceType: 'Deep cleaning',
  },
  {
    slug: 'move-out-in-cleaning',
    name: 'Move-In / Move-Out Cleaning',
    navLabel: 'Move-In / Move-Out Cleaning',
    short: 'Detailed cleaning for empty or mostly empty homes, timed around your moving day.',
    title: 'Move-Out & Move-In Cleaning in Luzerne County | Roamza',
    description: 'Move-in and move-out cleaning in Dallas, Wilkes-Barre, Kingston, Scranton and nearby: inside cabinets, baseboards, appliances and more. Get a fast quote online.',
    h1: 'Move-In & Move-Out Cleaning in Luzerne & Lackawanna Counties',
    eyebrow: 'Moving made easier',
    heroLine: 'Moving day, without the stress.',
    answer: 'Roamza’s Move-In / Move-Out Cleaning prepares empty or mostly empty homes for the next chapter. We clean inside empty cabinets and drawers, appliances’ exteriors, the inside of the microwave, bathrooms, baseboards, doors, blinds, window sills and floors, and coordinate with your moving day. It is designed for tenants, homeowners, landlords and property managers in Luzerne and Lackawanna Counties.',
    hero: 'real/empty-room-move-out.jpg',
    card: 'rooms/move-kitchen.jpg',
    audience: ['Tenants moving out who want to meet landlord standards', 'New homeowners who want a sanitized home before unpacking', 'Landlords and property managers between tenants', 'Sellers preparing a home for listing or closing'],
    highlights: [
      { title: 'Security deposit protection', text: 'We clean to meet the standards of landlords and property managers.' },
      { title: 'Sanitized for your arrival', text: 'Move into a home that is disinfected and ready for your family.' },
      { title: 'Flexible scheduling', text: 'We coordinate with your moving day so the house is ready on time.' },
      { title: 'Background-checked pros', text: 'Reliable professionals you can trust in an empty property.' },
    ],
    rooms: [
      { name: 'Kitchen', image: 'rooms/move-kitchen.jpg', tasks: ['Countertops and backsplash cleaned', 'Sink and faucet cleaned', 'Exterior of appliances cleaned', 'Inside of microwave cleaned', 'Cabinet exteriors cleaned', 'Inside empty cabinets and drawers cleaned', 'Detailed stovetop and range hood cleaning', 'Baseboards, doors and door frames cleaned', 'Floors vacuumed and mopped'] },
      { name: 'Bathrooms', image: 'rooms/move-bathrooms.jpg', tasks: ['Toilets cleaned and disinfected', 'Bathtub and/or shower cleaned', 'Shower glass cleaned', 'Sinks, faucets, vanity and mirrors cleaned', 'Empty cabinets and drawers cleaned', 'Baseboards, doors and door frames cleaned', 'Floors vacuumed and mopped'] },
      { name: 'Bedrooms & common areas', image: 'rooms/move-bedrooms.jpg', tasks: ['Accessible surfaces dusted', 'Cobwebs removed', 'Baseboards, doors and door frames cleaned', 'Blinds cleaned', 'Interior window sills and frames cleaned', 'Accessible ceiling fans and light fixtures cleaned', 'Floors vacuumed and mopped'] },
    ],
    notIncluded: 'Move-In / Move-Out Cleaning is designed for empty or mostly empty properties. Heavy debris removal, hauling, carpet shampooing, exterior window cleaning and specialty restoration are not included.',
    faqs: [
      { q: 'Does the home need to be empty for a move-out cleaning?', a: 'Move-In / Move-Out Cleaning is designed for empty or mostly empty properties so we can reach inside cabinets, drawers and every room.' },
      { q: 'Do you clean inside cabinets and drawers?', a: 'Yes. Inside empty cabinets and drawers are cleaned in the kitchen and bathrooms.' },
      { q: 'What is not included in move-out cleaning?', a: 'Heavy debris removal, hauling, carpet shampooing, exterior window cleaning and specialty restoration are not included.' },
      { q: 'Can you schedule the cleaning around my moving day?', a: 'Yes. We coordinate with your moving day so the home is ready on time. We are available 7 days a week and respond to requests within 15 minutes.' },
    ],
    related: ['deep-cleaning', 'construction-cleaning', 'regular-cleaning'],
    serviceType: 'Move-out cleaning',
  },
  {
    slug: 'airbnb-cleaning',
    name: 'Airbnb & Vacation Rental Turnover Cleaning',
    navLabel: 'Airbnb & Vacation Rental Cleaning',
    short: 'Reliable turnover cleaning, staging and property reporting between guests for Airbnb and short-term rentals.',
    title: 'Airbnb & Vacation Rental Cleaning in NEPA | Roamza',
    description: 'Airbnb and vacation rental turnover cleaning in Harveys Lake, Wilkes-Barre, Scranton and Luzerne County: staging, restocking and damage reporting for hosts.',
    h1: 'Airbnb & Vacation Rental Turnover Cleaning in Northeastern PA',
    eyebrow: 'For hosts & property managers',
    heroLine: 'Guest-ready. Every stay.',
    answer: 'Roamza provides turnover cleaning for Airbnb, VRBO and other short-term and vacation rentals in Luzerne, Lackawanna and Wyoming Counties. Between guests we clean every room, reset beds and towels, stage the space, restock owner-provided supplies and report visible damage or low supplies to the host. Recurring turnover service starts with a walkthrough or property review.',
    hero: 'real/bedroom-guest-ready.jpg',
    card: 'rooms/airbnb-living.jpg',
    audience: ['Airbnb and VRBO hosts', 'Vacation rental owners around Harveys Lake and the Back Mountain', 'Property managers with multiple short-term rentals', 'Owners of furnished mid-term rentals'],
    highlights: [
      { title: 'Quick turnovers', text: 'We work with your booking calendar to help ensure the property is ready before the next check-in.' },
      { title: 'Linen & towel service', text: 'Linen changes and laundry can be arranged depending on your property’s turnover needs.' },
      { title: 'Restocking support', text: 'We restock owner-provided toiletries, paper products, coffee and guest essentials and tell you when supplies run low.' },
      { title: 'Damage reporting', text: 'A visual inspection after every departure, with visible damage or maintenance concerns reported to the host.' },
    ],
    rooms: [
      { name: 'Kitchen', image: 'rooms/airbnb-kitchen.jpg', tasks: ['Countertops and accessible surfaces cleaned', 'Sink and faucet cleaned', 'Exterior of appliances cleaned', 'Inside of microwave cleaned', 'Stovetop cleaned', 'Exterior of cabinets wiped', 'Floors vacuumed and mopped', 'Trash emptied'] },
      { name: 'Bathrooms', image: 'rooms/airbnb-bathrooms.jpg', tasks: ['Toilet cleaned and disinfected', 'Shower and/or bathtub cleaned', 'Sink, faucet and vanity cleaned', 'Mirrors cleaned', 'Towels reset as instructed', 'Floors vacuumed and mopped', 'Trash emptied'] },
      { name: 'Bedrooms', image: 'rooms/regular-bedrooms.jpg', tasks: ['Linens changed when included in the property service agreement', 'Beds made and reset', 'Accessible surfaces dusted', 'Floors vacuumed and mopped', 'Room presentation reset for incoming guests'] },
      { name: 'Living & common areas', image: 'rooms/airbnb-living.jpg', tasks: ['Accessible surfaces dusted', 'Floors and rugs vacuumed', 'Hard floors mopped', 'Cushions and furniture arranged', 'Space reset for guest arrival'] },
      { name: 'Turnover support', image: 'rooms/airbnb-turnover.jpg', tasks: ['Visual inspection after guest departure', 'Visible damage or maintenance concerns reported', 'Host notified of missing or low supplies', 'Owner-provided guest supplies restocked', 'Property-specific instructions followed', 'Final staging for guest arrival'] },
    ],
    process: 'Airbnb and vacation rental services require a walkthrough or property review before recurring turnover service begins, so we understand the property setup, linen process, supplies and host-specific instructions.',
    faqs: [
      { q: 'Do you change linens and towels between guests?', a: 'Yes. Towels are reset as instructed, and linen changes are done when included in your property service agreement. Laundry service can be arranged depending on the property’s turnover needs.' },
      { q: 'Can you restock supplies for my guests?', a: 'Yes. We restock owner-provided toiletries, paper products, coffee and other guest essentials, and notify you when supplies are missing or running low.' },
      { q: 'What happens if a guest damages something?', a: 'After every departure our team performs a visual inspection and reports visible damage or maintenance concerns to the host.' },
      { q: 'How do I start turnover service for my rental?', a: 'Recurring turnover service starts with a walkthrough or property review so we can learn the setup, linen process, supplies and your specific instructions. Call or text (272) 203-3263 or request a quote online.' },
    ],
    related: ['deep-cleaning', 'regular-cleaning', 'office-cleaning'],
    serviceType: 'Vacation rental turnover cleaning',
  },
  {
    slug: 'office-cleaning',
    name: 'Office & Commercial Cleaning',
    navLabel: 'Office & Commercial Cleaning',
    short: 'Customized cleaning plans for offices, workspaces, breakrooms and restrooms.',
    title: 'Office Cleaning in Kingston & Wilkes-Barre, PA | Roamza',
    description: 'Office and commercial cleaning in Kingston, Wilkes-Barre, Dallas, Scranton and Luzerne County. Customized plans after a walkthrough. Licensed, bonded & insured.',
    h1: 'Office & Commercial Cleaning in Luzerne & Lackawanna Counties',
    eyebrow: 'For local businesses',
    heroLine: 'A workplace that makes a lasting impression.',
    answer: 'Roamza cleans offices and commercial spaces in Kingston, Wilkes-Barre, Dallas, Scranton and across Luzerne and Lackawanna Counties. Plans cover workstations, common areas, entries, breakrooms and restrooms, including high-touch points and restocking owner-provided supplies. Frequency and scope are customized after a walkthrough of your facility.',
    hero: 'rooms/office-open-plan.jpg',
    card: 'rooms/office-workstations.jpg',
    audience: ['Professional and medical offices', 'Small businesses and retail spaces', 'Property managers and building owners', 'Shared workspaces and community spaces'],
    highlights: [
      { title: 'Customized cleaning plans', text: 'Frequency and scope are built around your facility’s needs.' },
      { title: 'High-touch sanitizing', text: 'Door handles, light switches and elevator buttons are part of the plan.' },
      { title: 'Restroom sanitation', text: 'Fixtures cleaned and disinfected, supplies restocked on request.' },
      { title: 'Licensed, bonded & insured', text: 'A local, background-checked team you can trust after hours.' },
    ],
    rooms: [
      { name: 'Offices & workstations', image: 'rooms/office-workstations.jpg', tasks: ['Accessible desks, monitors and surfaces dusted', 'Accessible work surfaces wiped', 'High-touch areas cleaned (door handles, light switches, elevator buttons)', 'Trash and recycling emptied, liners replaced', 'Carpets and rugs vacuumed', 'Hard floors mopped'] },
      { name: 'Common areas & entries', image: 'rooms/office-common.jpg', tasks: ['Accessible furniture and surfaces dusted', 'Tables and shared surfaces cleaned', 'Entry areas cleaned', 'Floors vacuumed and mopped', 'Trash emptied'] },
      { name: 'Breakrooms & kitchenettes', image: 'rooms/office-breakroom.jpg', tasks: ['Countertops cleaned and disinfected', 'Sink and faucet cleaned', 'Exterior of appliances wiped (fridges, microwaves, coffee makers)', 'Inside of microwave cleaned', 'Tables and chairs wiped', 'Trash emptied', 'Floors vacuumed and mopped'] },
      { name: 'Restrooms', image: 'rooms/office-restrooms.jpg', tasks: ['Toilets and urinals cleaned and disinfected', 'Sinks and faucets cleaned', 'Mirrors cleaned', 'Dispensers and accessible surfaces wiped', 'Trash emptied', 'Floors vacuumed and mopped', 'Owner-provided paper products and soap restocked as requested'] },
    ],
    process: 'Commercial services require a walkthrough before pricing so we can evaluate the facility, cleaning scope, frequency, access requirements and any special instructions.',
    faqs: [
      { q: 'How is commercial cleaning priced?', a: 'Commercial services are priced after a walkthrough, so we can evaluate your facility, cleaning scope, frequency, access requirements and any special instructions.' },
      { q: 'Can you clean on a schedule that fits my business?', a: 'Yes. Service frequency and scope are customized to your facility. Roamza teams are available 7 days a week.' },
      { q: 'Do you restock restroom supplies?', a: 'Yes. We restock owner-provided paper products and hand soap on request.' },
      { q: 'Is Roamza insured for commercial work?', a: 'Yes. Roamza Cleaning Services is licensed, bonded and insured, and our team is background-checked.' },
    ],
    related: ['construction-cleaning', 'deep-cleaning', 'airbnb-cleaning'],
    serviceType: 'Commercial cleaning',
  },
  {
    slug: 'construction-cleaning',
    name: 'Post-Construction Cleaning',
    navLabel: 'Post-Construction Cleaning',
    short: 'From construction dust to move-in ready, for homeowners, contractors and remodelers.',
    title: 'Post-Construction Cleaning in Luzerne County, PA | Roamza',
    description: 'Post-construction and renovation cleaning in Dallas, Wilkes-Barre, Mountain Top and Luzerne County: dust removal, trim, windows, cabinets and floors.',
    h1: 'Post-Construction Cleaning in Luzerne County, PA',
    eyebrow: 'After the build or remodel',
    heroLine: 'From dust to move-in ready.',
    answer: 'Roamza’s Post-Construction Cleaning removes accessible construction dust and gets new builds and remodels ready to live or work in. Work can include walls, trim, doors, baseboards, window sills and tracks, empty cabinets and closets, bathrooms, countertops, floors and light adhesive residue. Every project starts with a walkthrough or project review to set the final scope and price.',
    hero: 'real/hardwood-living-room-empty.jpg',
    card: 'rooms/post-construction.jpg',
    audience: ['Homeowners after a remodel or renovation', 'General contractors and builders', 'Remodelers handing over a finished project', 'Commercial spaces after a build-out'],
    highlights: [
      { title: 'Customized scope', text: 'Every project is different; we review it before giving the final scope and price.' },
      { title: 'Detail work', text: 'Trim, tracks, sills, cabinets and closets — the places dust hides.' },
      { title: 'Contractor-friendly', text: 'A clean handover that reflects the quality of your work.' },
      { title: 'Background-checked team', text: 'Professionals you can trust on site.' },
    ],
    rooms: [
      { name: 'Surfaces & dust', image: 'rooms/post-construction.jpg', tasks: ['Accessible construction dust removed', 'Detailed dusting of walls and accessible surfaces', 'Doors, door frames, trim and baseboards cleaned', 'Final detailed cleaning of accessible surfaces'] },
      { name: 'Windows & cabinets', image: 'rooms/deep-throughout.jpg', tasks: ['Window sills, tracks and frames cleaned', 'Interior window glass cleaned when included in the quote', 'Empty cabinets, drawers and closets cleaned', 'Labels, stickers and light adhesive residue removed when safely removable'] },
      { name: 'Kitchens, baths & floors', image: 'rooms/deep-kitchen.jpg', tasks: ['Countertops and backsplashes cleaned', 'Sinks and fixtures cleaned', 'Bathrooms cleaned', 'Detailed vacuuming', 'Hard floors mopped'] },
    ],
    roomsIntro: 'Post-construction cleaning may include:',
    notIncluded: 'Large construction debris, hazardous materials, paint removal, hardened grout or cement removal and specialty restoration are not included unless specifically evaluated and approved in advance.',
    process: 'Every post-construction project is different. We perform a walkthrough or project review before providing the final scope and price.',
    faqs: [
      { q: 'What does post-construction cleaning include?', a: 'Removal of accessible construction dust, detailed dusting of walls and surfaces, trim, doors and baseboards, window sills, tracks and frames, empty cabinets and closets, countertops, sinks, bathrooms, detailed vacuuming and mopping, and removal of light adhesive residue when safe.' },
      { q: 'Do you remove construction debris?', a: 'Large construction debris, hazardous materials, paint removal and hardened grout or cement removal are not included unless evaluated and approved in advance.' },
      { q: 'How is post-construction cleaning priced?', a: 'We do a walkthrough or project review first, then provide the final scope and price for your project.' },
      { q: 'Do you work with contractors?', a: 'Yes. We serve contractors, remodelers and homeowners across Luzerne County and nearby areas.' },
    ],
    related: ['move-out-in-cleaning', 'deep-cleaning', 'office-cleaning'],
    serviceType: 'Post-construction cleaning',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)!;
