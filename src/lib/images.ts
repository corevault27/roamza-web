import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp}', { eager: true });

/** Resolve an image by its path relative to src/assets/images (e.g. 'real/dining-area.jpg'). */
export function img(path: string): ImageMetadata {
  const mod = all[`/src/assets/images/${path}`];
  if (!mod) throw new Error(`Image not found: ${path}`);
  return mod.default;
}

/** Descriptive alt text for real job photos (location intentionally not stated). */
export const realAlt: Record<string, string> = {
  'real/entryway-hardwood-floor.jpg': 'Freshly cleaned entryway with polished hardwood floor after a Roamza cleaning',
  'real/living-room-fresh-carpet.jpg': 'Living room with freshly vacuumed carpet and tidy sofas after a Roamza cleaning',
  'real/carpet-vacuum-lines.jpg': 'Fresh vacuum lines on a living room carpet cleaned by Roamza',
  'real/stairway-hallway.jpg': 'Clean stairway and hallway with wood handrail after a Roamza home cleaning',
  'real/family-room-carpet.jpg': 'Family room with freshly vacuumed carpet and arranged furniture',
  'real/open-kitchen-quartz-counter.jpg': 'Spotless quartz kitchen counter in an open-plan home cleaned by Roamza',
  'real/wood-staircase.jpg': 'Wood staircase cleaned and dusted step by step',
  'real/sliding-door-deck-view.jpg': 'Clean sliding glass door and hardwood floor overlooking a deck',
  'real/bathroom-shower-vanity.jpg': 'Sparkling bathroom with clean shower, toilet and vanity',
  'real/bedroom-guest-ready.jpg': 'Guest-ready bedroom with made bed after a vacation rental turnover',
  'real/living-room-white-sofa.jpg': 'Bright living room with white sofa and clean floors after a regular cleaning',
  'real/dining-area.jpg': 'Clean dining table and kitchen area with wiped surfaces',
  'real/kitchen-white-cabinets.jpg': 'Kitchen with clean white cabinets, counters and stainless appliances',
  'real/entry-sitting-area.jpg': 'Tidy entry and sitting area with clean floors',
  'real/bedroom-made-bed.jpg': 'Bedroom with freshly made bed and vacuumed rug',
  'real/empty-room-move-out.jpg': 'Empty room cleaned for move-out with clean laminate floor',
  'real/bathtub-move-out.jpg': 'Scrubbed bathtub and surround during a move-out cleaning',
  'real/bathroom-vanity-granite.jpg': 'Clean bathroom vanity with granite top and mirror',
  'real/bathroom-vanity-cabinets.jpg': 'Bathroom vanity, cabinets and floor cleaned for a move-in',
  'real/empty-bedroom-carpet.jpg': 'Empty bedroom with vacuumed carpet ready for new tenants',
  'real/hardwood-room-blue-walls.jpg': 'Empty room with gleaming hardwood floors after a move-out cleaning',
  'real/hardwood-living-room-empty.jpg': 'Empty living room with shining hardwood floor, move-in ready',
  'real/hallway-move-out.jpg': 'Hallway cleaned during a move-out cleaning',
};

export const realGallery = [
  'real/open-kitchen-quartz-counter.jpg',
  'real/bathroom-shower-vanity.jpg',
  'real/living-room-white-sofa.jpg',
  'real/bedroom-guest-ready.jpg',
  'real/kitchen-white-cabinets.jpg',
  'real/hardwood-room-blue-walls.jpg',
  'real/living-room-fresh-carpet.jpg',
  'real/dining-area.jpg',
  'real/wood-staircase.jpg',
  'real/bathtub-move-out.jpg',
  'real/entryway-hardwood-floor.jpg',
  'real/sliding-door-deck-view.jpg',
];
