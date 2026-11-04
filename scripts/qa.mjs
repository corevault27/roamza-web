#!/usr/bin/env node
/**
 * Static SEO / GEO / link QA over the built site (dist/). No dependencies.
 * Usage: npm run build && npm run qa
 * Checks: lang, title/description presence + uniqueness + length, single H1,
 * canonical (absolute, self-referencing), robots meta, OG tags, JSON-LD parse +
 * LocalBusiness/BreadcrumbList presence, img alt, internal links, heading jumps,
 * sitemap ↔ pages, robots.txt, llms.txt, _redirects targets, no [PENDIENTE]/
 * placeholder text, NAP consistency (one phone number only).
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(DIST);

const html = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => '/' + relative(DIST, f).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (path) => {
  const clean = decodeURI(path.split('#')[0].split('?')[0]);
  if (clean === '/') return true;
  const p = join(DIST, clean);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

const errors = [], warns = [], pages = [];
const titles = new Map(), descs = new Map();
const get = (s, re) => (s.match(re) || [])[1];
const PHONE_OK = '2722033263';

for (const f of html) {
  const s = readFileSync(f, 'utf8');
  const url = urlOf(f);
  const E = (m) => errors.push(`${url}: ${m}`);
  const W = (m) => warns.push(`${url}: ${m}`);
  const robots = get(s, /<meta name="robots" content="([^"]+)"/) || '';
  const noindex = robots.includes('noindex');
  const title = get(s, /<title>([^<]*)<\/title>/);
  const desc = get(s, /<meta name="description" content="([^"]*)"/);
  const canonical = get(s, /<link rel="canonical" href="([^"]+)"/);
  const lang = get(s, /<html lang="([^"]+)"/);
  const h1s = (s.match(/<h1[\s>]/g) || []).length;

  if (lang !== 'en-US') E(`lang="${lang}"`);
  if (!title) E('missing <title>');
  else { if (title.length > 65) W(`title ${title.length} chars`); titles.set(title, [...(titles.get(title) || []), url]); }
  if (!desc) E('missing meta description');
  else { if (desc.length < 70 || desc.length > 165) W(`description ${desc.length} chars`); descs.set(desc, [...(descs.get(desc) || []), url]); }
  if (h1s !== 1) E(`${h1s} <h1> elements`);
  if (!canonical || !/^https?:\/\//.test(canonical)) E('canonical missing or not absolute');
  else if (!url.startsWith('/404') && new URL(canonical).pathname !== url) E(`canonical path ${new URL(canonical).pathname} != ${url}`);
  for (const p of ['og:title', 'og:description', 'og:url', 'og:image']) if (!s.includes(`property="${p}"`)) E(`missing ${p}`);

  const ld = [];
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { E(`invalid JSON-LD: ${e.message}`); }
  }
  const types = ld.flatMap((x) => [].concat(x['@type']));
  if (!types.includes('LocalBusiness')) E('JSON-LD LocalBusiness missing');
  if (url !== '/' && !noindex && !url.startsWith('/404') && !types.includes('BreadcrumbList')) W('no BreadcrumbList');
  if (types.includes('AggregateRating') || /"aggregateRating"/.test(s)) E('self-serving AggregateRating found');
  for (const fq of ld.filter((x) => x['@type'] === 'FAQPage')) {
    for (const q of fq.mainEntity) if (!s.includes(q.name.replace(/&/g, '&amp;').replace(/'/g, '&#39;').slice(0, 30)) && !s.includes(q.name.slice(0, 30))) W(`FAQ schema question not visible: "${q.name.slice(0, 50)}"`);
  }

  for (const m of s.matchAll(/<img\b[^>]*>/g)) if (!/\balt(=|\s|>)/.test(m[0])) E(`img without alt: ${m[0].slice(0, 80)}`);
  for (const m of s.matchAll(/\shref="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('//')) continue;
    if (!exists(href)) E(`broken internal link ${href}`);
    else if (!/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]) && !href.split(/[?#]/)[0].endsWith('/')) W(`link without trailing slash ${href}`);
  }
  let prev = 0;
  for (const m of s.matchAll(/<h([1-6])[\s>]/g)) { const lvl = Number(m[1]); if (prev && lvl > prev + 1) W(`heading jump h${prev} -> h${lvl}`); prev = lvl; }

  const visible = s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  if (/\[PENDIENTE\]|PENDING_CLIENT|lorem ipsum|TODO/i.test(visible)) E('placeholder / pending text visible');
  for (const m of visible.matchAll(/\(?\b(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})\b/g)) {
    const n = m[1] + m[2] + m[3];
    if (n !== PHONE_OK && !/^(19|20)\d\d/.test(m[0])) W(`unexpected phone-like number ${m[0]}`);
  }
  if (/347[\s)-]*335/.test(s)) E('old phone (347) 335-1042 present');
  pages.push({ url, noindex, title });
}

for (const [t, u] of titles) if (u.length > 1) errors.push(`duplicate title "${t}" on ${u.join(', ')}`);
for (const [, u] of descs) if (u.length > 1) errors.push(`duplicate description on ${u.join(', ')}`);

// Sitemap
const smFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
const smUrls = smFiles.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
for (const u of smUrls) {
  const p = pages.find((x) => x.url === u);
  if (!p) errors.push(`sitemap URL not built: ${u}`);
  else if (p.noindex) errors.push(`sitemap contains noindex page: ${u}`);
}
for (const p of pages) if (!p.noindex && !smUrls.includes(p.url) && !p.url.startsWith('/404')) errors.push(`indexable page not in sitemap: ${p.url}`);

// robots / llms / redirects
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots) errors.push('robots.txt missing'); else if (!/Sitemap: https?:\/\//.test(robots)) errors.push('robots.txt without absolute Sitemap');
const llms = existsSync(join(DIST, 'llms.txt')) ? readFileSync(join(DIST, 'llms.txt'), 'utf8') : '';
if (!llms) errors.push('llms.txt missing');
const redirects = existsSync(join(DIST, '_redirects')) ? readFileSync(join(DIST, '_redirects'), 'utf8') : '';
if (!redirects) errors.push('_redirects missing');
for (const line of redirects.split('\n')) {
  const parts = line.trim().split(/\s+/);
  if (!line.trim() || line.startsWith('#') || parts.length < 2) continue;
  if (!exists(parts[1])) errors.push(`_redirects target not built: ${parts[1]}`);
}
for (const keep of ['/regular-cleaning/', '/airbnb-cleaning/', '/deep-cleaning/', '/move-out-in-cleaning/', '/office-cleaning/', '/construction-cleaning/', '/contact-us/', '/privacy-policy/', '/terms-conditions/', '/roamza-cleaning-services-partners-with-cleaning-for-a-reason-to-support-cancer-patients/']) {
  if (!exists(keep)) errors.push(`legacy indexed URL not preserved: ${keep}`);
}

console.log(`Pages: ${pages.length} | sitemap URLs: ${smUrls.length}`);
pages.sort((a, b) => a.url.localeCompare(b.url)).forEach((p) => console.log(`  ${p.noindex ? '[noindex]' : '         '} ${p.url}  —  ${p.title}`));
if (warns.length) console.log(`\nWarnings (${warns.length}):\n  ` + warns.join('\n  '));
if (errors.length) { console.log(`\nErrors (${errors.length}):\n  ` + errors.join('\n  ')); process.exit(1); }
console.log('\nQA passed: no errors.');
