#!/usr/bin/env node
/**
 * One-off asset pipeline: copies the curated client images from ../Recursos
 * (kept OUTSIDE the repo) into src/assets/images with descriptive names.
 * - auto-rotates using EXIF, then strips ALL metadata (EXIF/GPS) for client privacy
 * - caps the long edge at 2000px; Astro generates AVIF/WebP variants at build
 * Usage: npm run images
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../../Recursos/', import.meta.url));
const OUT = fileURLToPath(new URL('../src/assets/images/', import.meta.url));
const PUB = fileURLToPath(new URL('../public/', import.meta.url));
mkdirSync(OUT, { recursive: true });
mkdirSync(PUB, { recursive: true });

const W = 'iimagenes varias complemento/WhatsApp-Image-2026-03-02-at-';
const map = {
  // brand
  'Logo y certificado/Cleaning-Services-Roamza-Oficial-LOGO-1536x1536.png': 'brand/roamza-logo.png',
  'Logo y certificado/Cleaning-Services-Roamza-Oficial-LOGO-white-1446x1536.png': 'brand/roamza-logo-white.png',
  'Logo y certificado/Get-your-free-estimate.png': 'brand/licensed-bonded-insured-seal.png',
  'Logo y certificado/logp-claeaning.png': 'brand/cleaning-for-a-reason-premium-partner.png',
  // people
  'Founder-Miriam-Roamza.png': 'team/miriam-rodriguez-founder-cutout.png',
  'iimagenes varias complemento/RoamzaOwner.jpg': 'team/miriam-rodriguez-founder.jpg',
  'Team-Roamza-Cleaning.png': 'team/roamza-cleaning-team.jpg',
  'Team-Roamza-Cleaning.jpg': 'team/roamza-team-uniforms.jpg',
  'Roamza-Cleaning-home-families.jpg': 'lifestyle/family-relaxing-clean-home.jpg',
  // proof
  'Cleaning-Services-Dallas-Pensylvania-Roamza-before.jpg': 'proof/living-room-before.jpg',
  'Cleaning-Services-Dallas-Pensylvania-Roamza-after.jpg': 'proof/living-room-after.jpg',
  // real jobs (client phone photos)
  [W + '4.28.20-PM-2.jpeg']: 'real/entryway-hardwood-floor.jpg',
  [W + '4.31.03-PM-3.jpeg']: 'real/living-room-fresh-carpet.jpg',
  [W + '4.31.03-PM.jpeg']: 'real/carpet-vacuum-lines.jpg',
  [W + '4.31.54-PM-2.jpeg']: 'real/stairway-hallway.jpg',
  [W + '4.31.54-PM.jpeg']: 'real/family-room-carpet.jpg',
  [W + '4.33.13-PM-2.jpeg']: 'real/open-kitchen-quartz-counter.jpg',
  [W + '4.33.13-PM-4.jpeg']: 'real/wood-staircase.jpg',
  [W + '4.33.13-PM.jpeg']: 'real/sliding-door-deck-view.jpg',
  [W + '4.33.42-PM-1.jpeg']: 'real/bathroom-shower-vanity.jpg',
  [W + '4.33.42-PM-3.jpeg']: 'real/bedroom-guest-ready.jpg',
  [W + '4.33.42-PM-4.jpeg']: 'real/living-room-white-sofa.jpg',
  [W + '4.33.42-PM-5.jpeg']: 'real/dining-area.jpg',
  [W + '4.33.42-PM-6.jpeg']: 'real/kitchen-white-cabinets.jpg',
  [W + '4.33.42-PM-7.jpeg']: 'real/entry-sitting-area.jpg',
  [W + '4.33.42-PM.jpeg']: 'real/bedroom-made-bed.jpg',
  [W + '4.34.28-PM-1.jpeg']: 'real/empty-room-move-out.jpg',
  [W + '4.36.00-PM-1.jpeg']: 'real/bathtub-move-out.jpg',
  [W + '4.36.00-PM-2.jpeg']: 'real/bathroom-vanity-granite.jpg',
  [W + '4.36.00-PM-3.jpeg']: 'real/bathroom-vanity-cabinets.jpg',
  [W + '4.36.00-PM.jpeg']: 'real/empty-bedroom-carpet.jpg',
  [W + '4.37.53-PM-1.jpeg']: 'real/hardwood-room-blue-walls.jpg',
  [W + '4.37.53-PM-2.jpeg']: 'real/hardwood-living-room-empty.jpg',
  [W + '4.37.53-PM.jpeg']: 'real/hallway-move-out.jpg',
  // service illustrations (renders: never presented as real jobs)
  'Roamza-Cleaning-Regular-Cleaning-Kitchen.png': 'rooms/regular-kitchen.jpg',
  'Roamza-Cleaning-Regular-Cleaning-Bedrooms.png': 'rooms/regular-bedrooms.jpg',
  'Roamza-Cleaning-Regular-Cleaning-Living-Common-Areas.png': 'rooms/regular-living.jpg',
  'Roamza-Cleaning-Regular-Cleaning-Throughout-the-Home.png': 'rooms/regular-throughout.jpg',
  'Roamza-Cleaning-Signature-Deep-Cleaning-Kitchen.png': 'rooms/deep-kitchen.jpg',
  'Roamza-Cleaning-Signature-Deep-Cleaning-Bathrooms.png': 'rooms/deep-bathrooms.jpg',
  'Roamza-Cleaning-Signature-Deep-Cleaning-Bedrooms.png': 'rooms/deep-bedrooms.jpg',
  'Roamza-Cleaning-Signature-Deep-Cleaning-Living-Common-Areas.png': 'rooms/deep-living.jpg',
  'Roamza-Cleaning-Signature-Deep-Cleaning-Throughout-the-Home.png': 'rooms/deep-throughout.jpg',
  'Roamza-move-in-out-cleaning-Kitchen.png': 'rooms/move-kitchen.jpg',
  'Roamza-move-in-out-cleaning-Bathrooms.png': 'rooms/move-bathrooms.jpg',
  'Roamza-move-in-out-cleaning-Bedrooms-and-common-areas.png': 'rooms/move-bedrooms.jpg',
  'Roamza-AIRBNB-VACATION-RENTAL-TURNOVER-CLEANING-KITCHEN.png': 'rooms/airbnb-kitchen.jpg',
  'Roamza-AIRBNB-VACATION-RENTAL-TURNOVER-CLEANING-BATHROOMS.png': 'rooms/airbnb-bathrooms.jpg',
  'Roamza-AIRBNB-VACATION-RENTAL-TURNOVER-CLEANING-LIVING-AND-COMMON-AREAS.png': 'rooms/airbnb-living.jpg',
  'Roamza-AIRBNB-VACATION-RENTAL-TURNOVER-CLEANING-turnover-support.png': 'rooms/airbnb-turnover.jpg',
  'Roamza-Office-Cleaning-and-Commercial-Offices-and-Workstations.png': 'rooms/office-workstations.jpg',
  'Roamza-Office-Cleaning-and-Commercial-Common-Areas.png': 'rooms/office-common.jpg',
  'Roamza-Office-Cleaning-and-Commercial-Breadrooms-and-Kitchenettes.png': 'rooms/office-breakroom.jpg',
  'Roamza-Office-Cleaning-and-Commercial-Restrooms.png': 'rooms/office-restrooms.jpg',
  'Roamza-Office-Cleaning-and-Commercial-Post-Construction-Cleaning.png': 'rooms/post-construction.jpg',
  'Roamza-Cleaning-Office-Commercial-Cleaning.png': 'rooms/office-open-plan.jpg',
};

for (const [from, to] of Object.entries(map)) {
  const src = join(SRC, from);
  if (!existsSync(src)) { console.warn('missing', from); continue; }
  const dest = join(OUT, to);
  mkdirSync(dirname(dest), { recursive: true });
  const img = sharp(src).rotate(); // apply EXIF orientation; metadata is dropped on output by default
  if (to.endsWith('.png')) {
    await img.trim({ threshold: 1 }).resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(dest);
  } else {
    await img.flatten({ background: '#ffffff' }).resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(dest);
  }
  console.log('ok', to);
}

// favicons from the logo mark
const logo = join(SRC, 'Logo y certificado/Cleaning-Services-Roamza-Oficial-LOGO-1536x1536.png');
const mark = await sharp(logo).trim({ threshold: 1 }).toBuffer();
await sharp(mark).resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile(join(PUB, 'apple-touch-icon.png'));
await sharp(mark).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(PUB, 'icon-512.png'));
await sharp(mark).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(PUB, 'icon-192.png'));
await sharp(mark).resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(PUB, 'favicon-48.png'));
console.log('ok icons');
