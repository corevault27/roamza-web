/**
 * JSON-LD builders. Every value comes from src/data so structured data always
 * matches visible text. No AggregateRating/Review (self-serving), no
 * openingHours until hours are confirmed.
 */
import { business, SITE_URL } from '../data/business';
import { publishedCities, counties } from '../data/areas';
import { services, type Service, type Faq } from '../data/services';

export const abs = (path: string) => new URL(path, SITE_URL).toString();
const ORG_ID = abs('/#organization');
const SITE_ID = abs('/#website');

export function areaServed() {
  return [
    ...Object.values(counties).map((c) => ({ '@type': 'AdministrativeArea', name: `${c.name}, PA` })),
    ...publishedCities.map((c) => ({ '@type': 'City', name: `${c.name}, PA` })),
  ];
}

export function organization(logoUrl: string, imageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': ORG_ID,
    name: business.name,
    legalName: business.legalName,
    slogan: business.tagline,
    description:
      'Locally owned cleaning company in Dallas, PA providing regular house cleaning, Signature Deep Cleaning, move-in/move-out, Airbnb and vacation rental turnover, office and commercial, and post-construction cleaning across Luzerne, Lackawanna and Wyoming Counties.',
    url: abs('/'),
    telephone: business.phone.e164,
    email: business.email,
    logo: logoUrl,
    image: imageUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.base.locality,
      addressRegion: business.base.region,
      postalCode: business.base.postalCode,
      addressCountry: business.base.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    areaServed: areaServed(),
    founder: { '@type': 'Person', name: business.founder.name, jobTitle: business.founder.role },
    sameAs: Object.values(business.social),
    memberOf: business.affiliations.map((a) => ({ '@type': 'Organization', name: a.name, url: a.url })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/${s.slug}/`) },
      })),
    },
    potentialAction: { '@type': 'ReserveAction', target: abs('/get-a-quote/'), name: 'Get a Fast Quote' },
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: business.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function serviceSchema(s: Service, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(path) + '#service',
    name: s.name,
    serviceType: s.serviceType,
    description: s.answer,
    url: abs(path),
    provider: { '@id': ORG_ID },
    areaServed: areaServed(),
    offers: {
      '@type': 'Offer',
      url: abs('/get-a-quote/'),
      description: `Instant online estimate. A $${business.deposit} deposit secures the booking.`,
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function personSchema(imageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: business.founder.name,
    jobTitle: business.founder.role,
    image: imageUrl,
    worksFor: { '@id': ORG_ID },
    homeLocation: { '@type': 'Place', name: 'Dallas, PA' },
  };
}

export function articleSchema(opts: { headline: string; description: string; path: string; image: string; datePublished: string; dateModified?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: abs(opts.path),
  };
}
