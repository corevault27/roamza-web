/**
 * Real Google reviews, as published on Roamza's previous website (Trustindex
 * widget, verified source: Google). Text kept as written by the reviewers.
 * Do NOT mark these up as Review/AggregateRating schema (self-serving reviews
 * are not eligible for LocalBusiness rich results).
 */
export type Review = { name: string; text: string; service?: string; lang?: 'en' | 'es'; featured?: boolean };

export const reviews: Review[] = [
  { name: 'Claudia Rodriguez', featured: true, text: 'Roamza Cleaning Services did an amazing job! Their team was professional, reliable, and paid attention to every detail. From start to finish, the communication was clear and they made the whole process stress-free. My home looks spotless and feels so fresh—it’s like brand new again.' },
  { name: 'Dale Newman', service: 'airbnb-cleaning', featured: true, text: 'Roamza has been cleaning our Airbnb for years. Not one missed day. Not one no show. Every single weekend for years. She’s the best. Most reliable cleaner.' },
  { name: 'Cesar Galvis', service: 'deep-cleaning', featured: true, text: 'I recently hired Roamza Cleaning Services for a deep clean of my home in Dallas, PA, and the results were outstanding. Every corner was spotless, and the team was professional and punctual. If you’re looking for high-quality cleaning in the Luzerne County area, I highly recommend them.' },
  { name: 'Trisanne Kerr', service: 'regular-cleaning', featured: true, text: 'I’ve been using this service for almost a year now and the job is always satisfactory. They are very professional and never hesitate to address your needs, they go above and beyond. I would definitely recommend them.' },
  { name: 'Jess Alogna', service: 'deep-cleaning', featured: true, text: 'I feel like I’m in a new house! Everything is spotless and smells super clean. The deep cleaning service is a must!' },
  { name: 'Erin Wysocki', featured: true, text: 'I was connected to them through Cleaning for a Reason during my breast cancer journey, and their kindness and professionalism truly meant so much to me. They did an incredible job—my home felt fresh, spotless, and cared for in a way that goes beyond just cleaning.' },
  { name: 'Carmen Bethania Ramirez Barrera', lang: 'es', featured: true, text: 'Estoy más que satisfecha y agradecida… ver que mi alfombra pasara de verde horrible con manchas, porque recién compré mi casa, a verse como la dejó después del proceso es algo increíble. Te recomiendo a ojos cerrados, 10/10.' },
  { name: 'Carlena Marie Semenza', text: 'Great service!' },
  { name: 'Emyrocio Morelperdomo', text: 'Good job!' },
];

export const featuredReviews = reviews.filter((r) => r.featured);
