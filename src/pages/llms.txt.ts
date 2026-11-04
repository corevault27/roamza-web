import type { APIRoute } from 'astro';
import { business } from '../data/business';
import { services } from '../data/services';
import { counties, cities, publishedCities, cityUrl } from '../data/areas';
import { generalFaqs } from '../data/faqs';

/** /llms.txt — plain-language summary for AI assistants (generated from the same data as the site). */
export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).toString();
  const c = business.claims;
  const body = `# ${business.name}

> ${business.legalName} is a locally owned cleaning company based in ${business.base.locality}, ${business.base.regionName} ${business.base.postalCode} (${business.base.county}). Founded and led by ${business.founder.name}, with ${business.yearsExperience} years of experience. It provides residential, vacation rental and commercial cleaning across Luzerne, Lackawanna and Wyoming Counties in northeastern Pennsylvania.

## Key facts
- Phone / text / WhatsApp: ${business.phone.display}
- Email: ${business.email}
- Instant online estimate: ${u('/get-a-quote/')} (price in under ${c.quoteSeconds} seconds; $${business.deposit} deposit secures a booking)
- Response time promise: ${c.responseMinutes} minutes; teams available ${c.daysPerWeek} days a week
- Recurring frequencies: ${business.frequencies.join(', ')}
- Licensed, bonded & insured; trained, background-checked team; satisfaction guaranteed
- Trusted by ${c.families}+ local families; ${c.rating.toFixed(1)}-star rating on Google (${c.reviewCount}+ reviews): ${business.social.google}
- Locally owned: not a franchise, not a call center
- Community: Premium Partner of Cleaning for a Reason (free cleanings for cancer patients); member of the Back Mountain Chamber

## Services
${services.map((s) => `- [${s.name}](${u(`/${s.slug}/`)}): ${s.short}`).join('\n')}
- Also: ${business.otherServices.join('; ')}
- Not offered: landscaping, yard work, pest control, plumbing, electrical, handyman services

## Service areas
${Object.entries(counties).map(([slug, co]) => `- [${co.name}](${u(`/service-areas/${slug}/`)}): ${cities.filter((x) => x.county === slug).map((x) => x.name).join(', ')}`).join('\n')}
- Local pages: ${publishedCities.map((x) => `[${x.name}, PA](${u(cityUrl(x))})`).join(', ')}

## Frequently asked questions
${generalFaqs.map((f) => `- **${f.q}** ${f.a}`).join('\n')}

## Main pages
- [Home](${u('/')})
- [All cleaning services](${u('/cleaning-services/')})
- [Get a Fast Quote](${u('/get-a-quote/')})
- [About](${u('/about/')})
- [Service areas](${u('/service-areas/')})
- [Resources & checklists](${u('/resources/')})
- [FAQ](${u('/faq/')})
- [Contact](${u('/contact-us/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
