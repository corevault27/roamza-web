# DESIGN.md — Roamza Cleaning Services

Ficha de diseño (Registro de webs Helice · fila 1)

| Categoría | Elección | Razón |
|---|---|---|
| **Arquetipo** | Editorial cálido + bloque documental de trabajos reales | La tipografía display protagonista (Fraunces) da un aire premium y cercano; las fotos reales de WhatsApp aportan prueba y autenticidad. |
| **Hero** | Split asimétrico: H1 editorial a la izquierda; collage de capas a la derecha (foto del equipo con máscara de tejado + foto de trabajo real + tarjeta lanzadora de FastQuote + sello *Licensed/Bonded/Insured*) | Mantiene la conversión del hero con cotizador de la web vieja sin cargar el iframe en el primer pantallazo (LCP). |
| **Header** | Barra con CTA persistente y teléfono, que se compacta al hacer scroll. En móvil, barra inferior fija con Call · Text · Get a Fast Quote y menú a pantalla completa tipo cortina | Negocio local de servicio, usado sobre todo desde el móvil. |
| **Patrones (7)** | 1) Lista editorial numerada de servicios con imagen que sigue al cursor · 2) "Room by room": media fija + checklist que cambia (barrido tipo paño, barra de progreso, ticks) · 3) Antes/después con deslizador (demo automática una vez) · 4) Mapa SVG de zonas (anillos de 10/20/30 mi desde Dallas, pins en forma de tejado, rutas dibujadas) · 5) Proceso de 3 pasos con línea que se dibuja con el scroll · 6) Marquee de reseñas reales de Google (con pausa) · 7) FAQ en acordeón animado | Cada patrón explica algo: qué incluye, prueba, cobertura, cómo reservar. |
| **Nivel de movimiento** | 2 alto (funcional e interactivo) | Efectos decorativos profesionales sin WebGL. JS propio de unos 10 KB (unos 4 KB gzip), sin librerías. |
| **Firma** | La línea del tejado de la casita del logo: máscara superior de las fotos, pins del mapa y favicon | Sale del oficio y del logo. **Prohibida** la estrella o chispa de 4 puntas (✦), la iconografía "IA". |

## Paleta (tokens en `src/styles/global.css`)

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `lime` | `#77B900` | Fondo del CTA principal (texto navy) | navy sobre lime ≈ 6:1 ✔ |
| `lime-600` | `#4B7A00` | Texto de acento pequeño | sobre blanco ≈ 5:1 ✔ |
| — | `#5F9400` | Solo texto grande (palabra "cleaning" del hero) | ≈ 3.7:1 ✔ (texto grande) |
| `royal` | `#1D0BF0` | Azul del wordmark: enlaces, foco, eyebrows | sobre blanco ≈ 8:1 ✔ |
| `navy` | `#150E75` | Títulos, secciones oscuras, footer | sobre blanco ≈ 14:1 ✔ |
| `ink` | `#17153A` | Texto de cuerpo | ✔ |
| `muted` | `#4B4970` | Texto secundario | ≈ 8:1 ✔ |
| `sky` / `cloud` / `linen` | `#D5E7F7` / `#F4F8FD` / `#F7F5F0` | Fondos alternos | — |

Validado con axe-core (WCAG 2.2 AA + best practices) en las 31 páginas, a 1280, 768 y 375 px.

## Tipografía
- **Fraunces Variable** (variante *soft*, SOFT 60) para los títulos.
- **Instrument Sans Variable** para el texto.
- Ambas autoalojadas con @fontsource y precargadas.
- No repite las fuentes de otras webs Helice: Bricolage + Figtree (Pro Help), Manrope, Archivo y Poppins/Montserrat.

## Efectos (catálogo §11.1 del prompt maestro) y dónde están
- **Hero:** collage con parallax suave, tilt al cursor (solo escritorio), entrada del H1 con transform (seguro para el LCP), subrayado SVG dibujado y luz de "ventana" con gradiente radial.
- **CTA principal:** brillo de "recién limpio" en hover y efecto magnético en escritorio.
- **Servicios:** números con contorno que se rellenan, subrayado lima animado y vista previa flotante que sigue al cursor.
- **Room by room:** media fija con barrido `clip-path`, barra de progreso, botones para saltar a cada habitación y checklist que se marca.
- **Antes/después:** handle accesible (`input range`), brillo sobre el lado "after" y demostración automática una sola vez.
- **Cifras reales animadas:** 500+, 5.0, 15 min y 7 days.
- **Proceso:** línea SVG que se dibuja con el scroll y pasos que se encienden.
- **Mapa:** rutas dibujadas, pins que pulsan y panel informativo al pasar el cursor o al enfocar.
- **Galería real:** scroll lateral con snap, elevación y zoom al pasar el cursor.
- **Reseñas:** marquee lento con botón de pausa; se detiene en hover y en foco.
- **FAQ:** acordeón con altura animada; el "+" rota hasta "×".
- **CTA final:** gradiente de luz que deriva lentamente y spotlight que sigue al cursor.
- **Navegación:** View Transitions entre páginas y barra de progreso de lectura en las guías.

**Reglas:**
- Todo es mejora progresiva: sin JS o con `prefers-reduced-motion` se ve completo y estático. Hay un fallback que revela el contenido a los 4,5 s.
- Solo se animan `transform`, `opacity` y `clip-path`.
- Los efectos de cursor solo se activan en `(hover:hover) and (pointer:fine)`.

## Imágenes
- **`src/assets/images/real/`:** 23 fotos reales de trabajos (WhatsApp). Se les quitan los metadatos EXIF/GPS con `scripts/prepare-images.mjs`. Los textos alternativos no indican la ciudad.
- **`rooms/`:** renders por habitación. Se usan solo como ilustración y se aclara así en la sección "Room by room".
- **`team/`, `brand/`, `proof/`:** material del cliente.
- Astro genera WebP responsivo. La carpeta `../Recursos` (436 MB, incluido el volcado de WordPress) **no** entra en el repo.
