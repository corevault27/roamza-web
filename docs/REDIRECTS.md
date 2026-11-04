# URL vieja → URL nueva (WordPress → Astro)

Inventario tomado del sitemap público (`/wp-sitemap.xml`) y de GSC (diagnóstico del 29/oct/2026).
**Ninguna URL comercial cambió de slug.** Las redirecciones de la tabla viven en `public/_redirects` (Netlify).

| URL vieja | Estado en GSC | URL nueva | Tipo |
|---|---|---|---|
| `/` | Indexada | `/` | Se conserva |
| `/regular-cleaning/` | Indexada | `/regular-cleaning/` | Se conserva |
| `/airbnb-cleaning/` | Indexada | `/airbnb-cleaning/` | Se conserva |
| `/deep-cleaning/` | Indexada | `/deep-cleaning/` | Se conserva |
| `/move-out-in-cleaning/` | Indexada | `/move-out-in-cleaning/` | Se conserva |
| `/office-cleaning/` | Indexada | `/office-cleaning/` | Se conserva |
| `/construction-cleaning/` | Indexada | `/construction-cleaning/` | Se conserva |
| `/contact-us/` | Indexada | `/contact-us/` | Se conserva |
| `/privacy-policy/` | — | `/privacy-policy/` | Se conserva (texto actualizado) |
| `/terms-conditions/` | — | `/terms-conditions/` | Se conserva (texto actualizado) |
| `/roamza-cleaning-services-partners-with-cleaning-for-a-reason-to-support-cancer-patients/` | — | Mismo slug | Se conserva |
| `/special-offer/` | **404** en GSC | `/get-a-quote/` | 301 |
| `/house-cleaning/` | Enlace interno roto en la web vieja | `/regular-cleaning/` | 301 |
| `/vsl-cleaning-services/` | Landing | `/` | 301 (**PENDIENTE**: confirmar uso en anuncios) |
| `/category/*` | Taxonomía | `/resources/` | 301 |
| `/author/*` | Archivo de autor | `/about/` | 301 |
| `/feed/`, `/comments/feed/` | RSS | `/` | 301 |
| `/wp-sitemap.xml`, `/wp-sitemap-*`, `/sitemap.xml`, `/sitemap_index.xml` | Sitemaps de WordPress | `/sitemap-index.xml` | 301 |
| `/wp-admin/*`, `/wp-login.php`, `/ojnivvtmxcwc/*` (subcarpeta de WordPress) | Técnicas | `/` | 301 |
| `/contact/`, `/airbnb`, `/move-in-cleaning/`, `/move-out-cleaning/`, `/post-construction-cleaning/`, `/commercial-cleaning/` | Variantes probables | Página equivalente | 301 (preventivas) |

## URLs nuevas (no existían)
- `/cleaning-services/` · `/get-a-quote/` · `/about/` · `/faq/` · `/thank-you/` (noindex)
- `/service-areas/` y `/service-areas/{luzerne-county, lackawanna-county, wyoming-county}/`
- `/service-areas/{dallas-pa, wilkes-barre-pa, kingston-pa, shavertown-pa, mountain-top-pa, scranton-pa}/`
- `/resources/` y 3 guías
- `/llms.txt` · `/robots.txt` · `/sitemap-index.xml`

## Tras el despliegue (Joan)
1. Enviar `https://roamzacleaningservices.com/sitemap-index.xml` en GSC; hoy no hay ningún sitemap enviado.
2. Inspeccionar e indexar la home, los 6 servicios y las 6 ciudades.
3. Comprobar con `curl -I` cada fila 301 de la tabla.
4. Configurar `www → apex` en Netlify.
