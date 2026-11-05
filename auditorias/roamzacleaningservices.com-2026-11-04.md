# Auditoría final SEO + GEO: roamzacleaningservices.com

**Fecha:** 04/nov/2026

**Estado:** LOCAL. Build de producción con `SITE_URL=https://roamzacleaningservices.com`, servido con `astro preview` en el puerto 4330. Commit `a9b4a4d` en GitHub (corevault27/roamza-web).

**Negocio:** Roamza Cleaning Services LLC, limpieza residencial, de rentas vacacionales y de oficinas.
- Base: Dallas, PA 18612.
- Zona: condados de Luzerne, Lackawanna y Wyoming.
- Contacto: cotizador en vivo (HomeSuite), llamada y texto al (272) 203-3263, y email.

**Reemplaza:** la web WordPress en el mismo dominio. Hay 25 reglas 301 en `public/_redirects`.

**Sin verificar:** la sección LIVE (robots en vivo, 301 con curl, perfil de Google, Search Console y línea base de IA) queda pendiente hasta que se publique.

---

## 1. Lighthouse 13.6 (build de producción local)

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home `/` | Móvil | **72** ❌ | 100 | 100 | 100 | **5.3 s** | 0 | 0 ms |
| Home `/` | Escritorio | 90 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms |
| Servicio `/airbnb-cleaning/` | Móvil | 96 | 100 | 100 | 100 | 1.7 s | 0 | 170 ms |
| Servicio `/airbnb-cleaning/` | Escritorio | 98 | 100 | 100 | 100 | 0.7 s | 0 | 40 ms |
| Ciudad `/service-areas/scranton-pa/` | Móvil | 90 | 100 | 100 | 100 | 1.8 s | 0 | 230 ms ⚠️ |
| Ciudad `/service-areas/scranton-pa/` | Escritorio | 99 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |

**Por qué la home en móvil da 72:**
- **Elemento LCP:** el póster del video del hero (`video.hv-video`). Llega en 0.1 s, pero espera **1.76 s de render delay**.
- **FCP de 3.1 s:** el texto del hero arranca con la animación `hero-rise`, y el script principal (`Base…js`) ocupa unos 1.9 s de CPU en un móvil simulado.
- **Widget de HomeSuite:** el iframe en el HTML suma unos 280 KB de JS de terceros (vendor-pdf 157 KB, vendor 76 KB, react 43 KB) en la carga inicial.
- **Video de 360p (357 KB):** se descarga después del evento load. No es el LCP, pero compite con lo demás en conexiones lentas.

**axe-core (WCAG 2 A/AA):** 0 violaciones en 9 páginas a 1440 px y en 5 a 375 px, medido el 04/nov sin animaciones. Ninguna página tiene desbordamiento horizontal.

---

## 2. Checklist A–H

### A. Rastreo e indexación
| | Punto | Evidencia |
|---|---|---|
| ✅ | robots.txt correcto | `Allow: /`, `Disallow: /thank-you/` y el sitemap declarado. |
| ⚠️ | Bots de IA | Están permitidos GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot y Google-Extended. Bingbot y Applebot entran por `*`, pero no aparecen explícitos. |
| ✅ | Sitemap | `sitemap-index.xml` con 29 URLs indexables. Excluye la 404 y /thank-you/. |
| ✅ | Canonical | Absoluto y correcto en las 29 páginas públicas. |
| ✅ | noindex | Solo en /404 y /thank-you/. |
| ✅ | Barra final | `trailingSlash: 'always'`. |
| ⚠️ | www y HTTPS | Dependen de Netlify y del DNS. Verificar en vivo. |
| ✅ | 404 propia | `404.html`; Netlify la sirve con estado 404. Verificar en vivo. |
| ⚠️ | 301 de WordPress | Hay 25 reglas, pero faltan `page-sitemap.xml`, `post-sitemap.xml` y `/es/*` si existían. Las URLs comerciales conservan su slug. **No están probadas en vivo.** |
| ✅ | Contenido en el HTML | Todo el texto está en el HTML estático (Astro). |
| ❌ | Deploy previews de Netlify | `netlify.toml` no tiene un contexto `deploy-preview` ni `branch-deploy` con `X-Robots-Tag: noindex`. La URL `*.netlify.app` quedaría indexable. |

### B. On-page (31 páginas revisadas)
| | Punto | Evidencia |
|---|---|---|
| ✅ | Titles | Todos únicos, de 41 a 60 caracteres. |
| ⚠️ | Títulos cortos | Scranton (42), Mountain Top (43), Privacy (41) y Contacto (45) tienen margen para añadir keyword y ciudad. |
| ✅ | Meta descriptions | Únicas, de 133 a 164 caracteres. |
| ✅ | H1 | Un solo H1 en todas las páginas. |
| ✅ | lang | `en-US`. |
| ✅ | URLs | Cortas, en minúscula, con guiones. Se conservaron las del WordPress. |
| ✅ | alt | 0 imágenes sin alt. Las decorativas usan `alt=""`. |
| ✅ | Breadcrumbs | Visibles y con `BreadcrumbList`. |
| ⚠️ | Open Graph | Falta `og:image:alt` en todas las páginas. El `og:image` es la foto del equipo en JPG; confirmar que mide 1200×630. |
| ✅ | Favicon, manifest y theme-color | Presentes: SVG, 48 px, apple-touch 180 y webmanifest. |

### C. Schema
| | Punto | Evidencia |
|---|---|---|
| ✅ | LocalBusiness | `["LocalBusiness","HomeAndConstructionBusiness"]` con `@id`, dirección, geo, `areaServed` (3 condados y ciudades), OfferCatalog y ReserveAction. |
| ⚠️ | Horario | Sin `openingHours`, a la espera de confirmar el horario (pendiente #1). |
| ✅ | Service | Presente en cada página de servicio. |
| ✅ | FAQPage | Presente donde hay FAQ visible. |
| ✅ | BreadcrumbList | Presente en las páginas internas. |
| ✅ | Person | Miriam, la fundadora. |
| ✅ | Sin reseñas autopromocionales | 0 `Review` y 0 `AggregateRating`. Las reseñas se muestran solo como texto atribuido a Google. |
| ⚠️ | sameAs | Incluye Facebook, Instagram, TikTok y el CID de Google Maps. Falta BBB, Yelp y la Back Mountain Chamber si existen. |
| ⚠️ | Validación externa | Rich Results Test y validator.schema.org quedan pendientes; necesitan la URL pública. |
| ⚠️ | Teléfono | Ya es `+12722033263`. Confirmar que Google Business muestra el mismo número. |

### D. Rendimiento
| | Punto | Evidencia |
|---|---|---|
| ❌ | Home móvil | 72 de rendimiento y LCP de 5.3 s (ver sección 1). |
| ✅ | Servicio y ciudad | Entre 90 y 99. |
| ⚠️ | TBT en ciudad móvil | 230 ms, por el JS de efectos. |
| ✅ | CLS | 0 en todas las páginas medidas. |
| ✅ | Imágenes | WebP con srcset y lazy-load. Ninguna de más de 200 KB, salvo el póster del hero (65 KB). |
| ✅ | Video | `preload="none"`, póster, arranque tras el evento load, y pausa con reduce motion o ahorro de datos. |
| ⚠️ | Terceros en la carga | El iframe de HomeSuite se carga desde el inicio en la home y en /get-a-quote/. Se decidió así para que el cotizador aparezca inmediato. |
| ✅ | Cache | `/_astro/*` con caché inmutable de 1 año. Netlify comprime con Brotli. |

### E. Accesibilidad
| | Punto | Evidencia |
|---|---|---|
| ✅ | Lighthouse y axe | 100 en las 6 mediciones de Lighthouse y 0 violaciones en axe. |
| ✅ | Teclado | Enlace "skip to content" (`#main`) y foco visible. |
| ✅ | Pausa | Botón "Pause video" en el video en bucle y pausa en el marquee (WCAG 2.2.2). |
| ✅ | Reduce motion | Se respeta `prefers-reduced-motion`. |
| ✅ | Formularios | N/A: se quitó el formulario de Contacto. |

### F. Contenido y E-E-A-T
| | Punto | Evidencia |
|---|---|---|
| ✅ | Páginas de servicio | 6 páginas de servicio con 1.390 a 1.510 palabras cada una. |
| ✅ | Páginas de ciudad | 6 de ciudad y 3 de condado con intro, FAQ y contexto local propios. Sin doorway: no hay páginas servicio × ciudad. |
| ⚠️ | Ola 2 de ciudades | Las 6 ciudades restantes siguen en borrador hasta tener evidencia local. |
| ✅ | Enlaces internos | Cada servicio enlaza a sus ciudades, cada ciudad a sus servicios, y cada condado a sus ciudades. Todas las páginas están a 3 clics o menos. |
| ❌ | Sinónimos del rubro | "maid service", "house cleaners" y "housekeeping" no aparecen en ninguna página. Solo está "cleaning company" (41 veces). |
| ✅ | Bloques de respuesta | Cada servicio responde qué es, para quién, qué incluye, cómo empezar y qué determina el precio. |
| ⚠️ | Precio y duración | Sin precios ni duración por servicio (pendientes #4 y #5). |
| ✅ | Experiencia | Fotos reales del equipo y de trabajos, galería real, antes/después, 10 años y la historia de la fundadora en About. |
| ⚠️ | Permiso de reseñas | Las 9 reseñas con nombre siguen pendientes de permiso (pendiente #15). |
| ⚠️ | Apellido de la fundadora | ¿Rodriguez o Elliott? (pendiente #7). |
| ✅ | NAP | Mismo nombre y teléfono en header, footer, Contacto, schema y `llms.txt`. QA bloquea el número viejo. |
| ✅ | CTA | Cotizador en vivo, llamada y texto, con barra móvil fija ("Live quote", llamar y texto). Sin WhatsApp ni formulario, como se pidió. |
| ⚠️ | Etiquetas de CTA | El header todavía dice "Get a Fast Quote" y el resto del sitio "Get my live quote". |
| ⚠️ | Página de Contacto | 144 palabras. Es suficiente para contactar, pero no aporta contenido. |

### G. GEO / AEO
| | Punto | Evidencia |
|---|---|---|
| ✅ | Respuestas directas | Respuesta de 1–2 frases al inicio de cada página y FAQ reales con schema. |
| ✅ | Datos citables | 15 min de respuesta, 7 días, depósito de $50, 500+ familias, 10 años y 3 condados. Hay comparativas en tabla (regular vs. deep). |
| ✅ | llms.txt | Se genera desde los datos del sitio (53 líneas: servicios, ciudades, guías y contacto). |
| ✅ | Bots de IA | Permitidos. |
| ✅ | Entidad | Nombre, fundadora y ciudad consistentes. |
| ⚠️ | Fechas visibles | La fecha de actualización solo aparece en las guías. |
| ❌ | Bing | Sin Bing Webmaster ni IndexNow; se hace al publicar. |
| ❌ | Answer share | Sin medir; se necesita la web publicada. |

### H. Fuera de la web
Todo queda ⚠️ pendiente de la publicación y del acceso del cliente:
- Google Business Profile: teléfono nuevo, categorías, zonas y enlace con UTM.
- Reseñas: ritmo y respuestas.
- Citaciones con NAP idéntico: Yelp, BBB, Bing Places, Apple, Angi, Nextdoor y la Back Mountain Chamber.
- Search Console: propiedad de dominio y sitemap.
- Bing Webmaster.
- GA4 con eventos `call_click`, `sms_click`, `quote_start` y `quote_widget_loaded`, ya preparados en el código.
- Rastreo del sitio publicado.

✅ Privacy y Terms están en el footer. ⚠️ Sus textos esperan revisión legal.

---

## 3. Mapa de visibilidad GET CHOSEN (estado local)

| Capa | Nota | Evidencia |
|---|---|---|
| FOUND | **2/5** | El sitio es técnicamente indexable: sitemap, canonical y robots correctos, y 301 preparadas. Todavía no está publicado ni probado en vivo, y no se conoce la posición en el mapa. |
| UNDERSTOOD | **4/5** | 6 servicios, 9 páginas de ciudad o condado, schema completo y `llms.txt`. Faltan los sinónimos del rubro. |
| TRUSTED | **3/5** | 5.0★ y 35+ reseñas, licencia/bond/seguro, 10 años, fundadora visible y NAP unificado. Falta confirmar el permiso de las reseñas, el apellido, BBB/Yelp en `sameAs` y el teléfono nuevo en Google Business. |
| CHOSEN | **3/5** | Contenido local propio, fotos reales, cotizador de 15 s y respuesta en 15 min. Sin precios ni duración, y sin línea base en IA. |
| ACTIONABLE | **4/5** | Cotizador en el hero, llamada y texto en todas las páginas y barra móvil. Queda pendiente confirmar que el (272) 203-3263 está en Google Business y que alguien responde los textos. |

---

## 4. Correcciones por impacto

### P1, antes de publicar
1. **Home móvil por encima de 85 en rendimiento.** Hay tres palancas:
   - Que el texto del hero no espere a `hero-rise`: animación solo con translate desde el primer frame, o sin animación en móvil.
   - Aligerar o diferir el JS de efectos en móvil (hoy unos 1.9 s de CPU simulada).
   - Valorar si el iframe de HomeSuite se carga al primer scroll o interacción en móvil, manteniéndolo inmediato en escritorio.
   - Volver a medir con PageSpeed una vez publicada.
2. **Noindex en deploy previews y branch deploys de Netlify.** Contextos en `netlify.toml` con `X-Robots-Tag: noindex`, para que `*.netlify.app` no compita con el dominio.
3. **Probar las 301 en vivo el mismo día del cambio.** Comprobar con curl las URLs viejas y los sitemaps de WordPress (`page-sitemap.xml`, `post-sitemap.xml`; faltan en `_redirects`).

### P2, primeras semanas
4. **Sinónimos del rubro.** Añadir "maid service", "house cleaners" y "housekeeping" de forma natural en la home, en Regular cleaning y en las páginas de ciudad. Por ejemplo: "house cleaners in Dallas, PA". Sin crear páginas nuevas ni canibalizar.
5. **Títulos cortos.** Ampliar Scranton, Mountain Top y Contacto con servicio + ciudad + marca, hasta 50–60 caracteres.
6. **Etiquetas de CTA.** Usar la misma en todo el sitio: el header pasaría a "Get my live quote".
7. **`og:image:alt`** en todas las páginas, y comprobar que la imagen OG es de 1200×630.
8. **TBT en ciudad móvil (230 ms).** Revisar el JS de efectos que corre en todas las páginas.

### P3, mejora continua
9. **robots.txt:** declarar Bingbot y Applebot explícitamente (cosmético).
10. **Contacto:** añadir más contenido útil, por ejemplo horario cuando se confirme o tiempos de respuesta por canal.
11. **Fechas visibles:** "Last updated" en las páginas de servicio cuando cambien precios o políticas.
12. **sameAs:** añadir BBB, Yelp y la Chamber cuando se confirmen.
13. **Ola 2 de ciudades:** publicarlas cuando haya evidencia local.

---

## 5. Qué pedirle al cliente
- **Leads:** de dónde vienen (Google, Maps, Facebook, referidos) y si hay clientes de habla hispana.
- **Teléfono nuevo:** confirmar que el (272) 203-3263 ya está en Google Business, Facebook, Yelp y los directorios, y quién responde llamadas y textos.
- **Acceso:** a Google Business Profile, Search Console (o permiso para crearla) y el dominio/DNS para publicar.
- **Datos del negocio:** el apellido público correcto, el horario, la política de cancelación y el depósito, la duración típica de cada servicio y si quiere publicar precios o rangos.
- **Reseñas:** permiso para mostrar las 9 con nombre y un plan para pedirlas tras cada servicio.
- **Perfiles externos:** BBB, Yelp, Angi, Nextdoor y la Back Mountain Chamber, si existen, para `sameAs` y las citaciones.
- **Evidencia local:** la ciudad de cada foto y los trabajos por ciudad para la Ola 2.
- **Email:** verificar que `info@roamzacleaningservices.com` recibe correo.
- **Lista de URLs viejas con tráfico** (Search Console del WordPress), para cerrar las 301.

---

## 6. Pendiente para la auditoría LIVE
- **Archivos en vivo:** robots.txt, sitemap, llms.txt, 404 real, http→https y www.
- **Redirecciones:** curl de las URLs viejas.
- **Rendimiento:** Lighthouse y PageSpeed sobre la URL pública, comparado con local.
- **Validación de schema:** Rich Results Test y validator.schema.org.
- **Fuera de la web:** Google Business (teléfono, categorías, zonas), reseñas, BBB/Yelp, NAP y los 3 competidores del mapa en "house cleaning Dallas PA", "maid service Wilkes-Barre" y "cleaning service Scranton".
- **Search Console:** sitemap, indexación, consultas, páginas y países.
- **Línea base de IA:** las mismas 5 preguntas en ChatGPT y Perplexity, en ventana nueva:
  1. "best house cleaning service in Dallas PA"
  2. "recommend 3 cleaning companies in Wilkes-Barre PA"
  3. "who does Airbnb turnover cleaning near Harveys Lake PA"
  4. "move out cleaning Scranton PA"
  5. "maid service Back Mountain PA"
