# Plan SEO + GEO — Roamza Cleaning Services

**Base:** diagnóstico de la semana 1 (29/oct/2026). Search Console registró 30 clics, 1.560 impresiones, CTR 1,9 % y posición media 46,1. Había 11 páginas indexadas, 5 sin indexar y ningún sitemap enviado. GA4 (`www.roamzacleaningservices.com`) recibe datos, pero sin eventos clave.
**Consultas visibles:** house cleaning · commercial cleaning · roamza · office cleaning services kingston pa · dallas cleaners.

> Regla Helice: planificado ≠ ejecutado ≠ publicado ≠ indexado ≠ medido. No prometer posiciones.

## 1. Arquitectura (modelo Gigi's: una página por intención)

| Intención | URL | Keyword principal |
|---|---|---|
| Marca + local general | `/` | house & office cleaning Dallas PA |
| Recurrente | `/regular-cleaning/` | house cleaning Dallas PA · recurring house cleaning |
| Limpieza profunda | `/deep-cleaning/` | deep cleaning service Luzerne County |
| Mudanzas | `/move-out-in-cleaning/` | move out cleaning Wilkes-Barre / Scranton |
| Airbnb | `/airbnb-cleaning/` | airbnb cleaning Harveys Lake / Wilkes-Barre |
| Comercial | `/office-cleaning/` | office cleaning Kingston PA · commercial cleaning Wilkes-Barre |
| Post-obra | `/construction-cleaning/` | post construction cleaning Luzerne County |
| Comparativa | `/cleaning-services/` | cleaning services NEPA |
| Condados | `/service-areas/{county}/` | cleaning services Luzerne / Lackawanna / Wyoming County |
| Ciudades (Ola 1) | `/service-areas/{city}-pa/` | house cleaning {city} PA |
| GEO / informacional | `/resources/*` | regular vs deep cleaning · move out cleaning checklist · airbnb turnover checklist |

## 2. Ciudades por olas (respuesta al correo de Miriam)
El GBP está en Dallas y el ranking en Maps depende de la cercanía. Las ciudades más lejanas se ganan con **páginas orgánicas útiles**. Cada ciudad tiene `status` en `src/data/areas.ts`.

| Ola | Ciudades | Estado |
|---|---|---|
| **1 (lanzamiento)** | Dallas · Wilkes-Barre · Kingston · Shavertown/Back Mountain · Mountain Top · Scranton | **Publicadas** |
| **2 (meses 2–3)** | Harveys Lake (Airbnb) · Clarks Summit · Pittston · Plains · Forty Fort · Nanticoke | Draft (listadas en el hub del condado) |
| **3 (según evidencia)** | Wyoming · West Wyoming · Exeter · Swoyersville · Edwardsville · Luzerne · Larksville · Plymouth · Duryea · Ashley · Nuangola · Lehman · Old Forge · Moosic · Dunmore · Tunkhannock | Draft |

**Puerta de calidad para publicar una ciudad:**
- Al menos 2 evidencias locales únicas (trabajo real con foto, reseña de esa ciudad, tipo de propiedad atendida o detalle operativo).
- Intro propia y FAQs locales.
- Nunca texto plantilla cambiando solo el nombre.

## 3. Técnico implementado (estado: ejecutado en local, NO publicado)
- Canonical absoluto y `trailingSlash` en todas las páginas, title y description únicos, una H1 por página. Lo verifica `npm run qa`.
- JSON-LD:
  - `LocalBusiness` + `HomeAndConstructionBusiness` con NAP, `areaServed`, `founder`, `sameAs`, `memberOf`, `hasOfferCatalog` y `ReserveAction`.
  - `Service` en cada servicio y ciudad; `FAQPage` donde las FAQ son visibles; `BreadcrumbList`; `Person`; `Article`; `AboutPage`; `ContactPage`.
  - **Sin** `AggregateRating`/`Review` autodeclarados y **sin** `openingHours` (pendiente).
- `sitemap-index.xml` sin `/thank-you/` ni `/404`; las ciudades en draft no se generan.
- `robots.txt` permite los rastreadores de IA (OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended).
- `/llms.txt` generado desde los mismos datos que la web.
- `_redirects` con 301 para todas las URLs viejas; se conservan los slugs comerciales.
- Rendimiento:
  - HTML estático, CSS inline (unos 43 KB) y JS propio de unos 10 KB, sin librerías.
  - Imágenes WebP responsivas, LCP con `fetchpriority=high` y fuentes precargadas.
  - FastQuote (iframe) se carga bajo demanda y no bloquea la carga.
- Accesibilidad: axe-core WCAG 2.2 AA sin violaciones en 31 páginas × 3 anchos.

## 4. GEO (GET CHOSEN: Found → Understood → Trusted → Chosen → Actionable)
- **Understood:** cada página abre con un bloque de respuesta directa (qué, dónde, para quién y cómo reservar) y las guías llevan un recuadro "Quick answer".
- **Trusted:**
  - Hechos verificables en texto visible: About con su tabla "at a glance", reseñas reales con nombre y alianzas.
  - Credenciales: Licensed, Bonded & Insured.
  - Cifras confirmadas: 500+ familias, 5.0 en Google, respuesta en 15 minutos y 7 días a la semana.
- **Actionable:** FastQuote (estimación en 15 segundos), tel, sms, WhatsApp, formulario y depósito de $50 explicado.
- **Fuente única:** `src/data/business.ts`, para que no haya contradicciones entre la web, el schema y `llms.txt`.

## 5. Tareas de Joan tras el despliegue (en orden)
1. Desplegar en Netlify siguiendo los SOP (GitHub → Netlify, dominio sin tocar DNS y migración de WordPress sin perder correos).
2. GSC: verificar la propiedad de **dominio** (hoy solo hay propiedad con prefijo de URL), enviar `sitemap-index.xml` y solicitar la indexación de las 13 URLs clave.
3. GA4: instalar la propiedad `www.roamzacleaningservices.com` y marcar como eventos clave `quote_start`, `call_click`, `sms_click`, `whatsapp_click`, `email_click` y `form_submit`. Ya se envían a `dataLayer` mediante `data-track`.
4. GBP: confirmar teléfono (347) 335-1042, servicios y zonas de servicio, y enlazar a `/` con UTM.
5. Activar el formulario de Netlify Forms (`contact`) y la notificación por email.
6. Medir a los 28 y 56 días, comparando con el periodo equivalente: impresiones, clics y posición por página y consulta.
7. Ola 2: recoger las evidencias de Miriam y publicar Harveys Lake y Clarks Summit primero.
