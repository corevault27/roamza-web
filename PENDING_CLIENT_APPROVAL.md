# Pendientes de confirmar con Roamza (Miriam) — no publicados en la web

Estado al 04/nov/2026. Todo lo de esta lista está **fuera** de la interfaz pública, o desactivado mediante `flags` en `src/data/business.ts`.

| # | Tema | Situación actual en la web | Acción |
|---|---|---|---|
| 1 | **Horario comercial exacto** | Solo se dice "7 days a week". Sin `openingHours` en el schema | Pedir el horario. Al recibirlo, poner `flags.showOpeningHours` y añadirlo al schema |
| 2 | **Política de cancelación / reprogramación** y qué pasa con el depósito de $50 | Los Terms dicen "se confirman al reservar" | Pedir la política y añadirla a Terms y FAQ |
| 3 | **Same-day / emergency cleaning** | No se menciona | Confirmar si se ofrece |
| 4 | **Duración típica** de cada servicio | No se publica (pregunta GEO "cuánto tarda") | Pedir rangos aproximados por tipo de casa |
| 5 | **Precios o rangos** | Sin precios: solo FastQuote | Si se aprueban, crear la guía "cost of house cleaning in Luzerne County" |
| 6 | **Condiciones del descuento de primera limpieza** | Solo "Ask about our first cleaning discount" | Confirmar las condiciones |
| 7 | **Apellido de la fundadora** | Notion y nombre de archivo: *Miriam Rodriguez*. El post de 2026 decía *Miriam Elliott*. La web usa "Miriam Rodriguez" (About y schema) y "Miriam" en la cita del post | **Confirmar el nombre público correcto** |
| 8 | **Email público** `info@roamzacleaningservices.com` | Publicado como email principal | Verificar que el buzón recibe correo (si no, cambiar a gmail en `business.ts`) |
| 9 | **Teléfono nuevo (272) 203-3263** | Web actualizada al nuevo número (antes (347) 335-1042), incluido WhatsApp | Confirmar que el GBP, redes y directorios usan (272) 203-3263 y que WhatsApp funciona en ese número (consistencia NAP) |
| 10 | **Ciudad de cada foto real** | Alt genérico, sin ciudad | Si Miriam indica la ciudad de cada trabajo, usarlas como evidencia local en las páginas de ciudad |
| 11 | **Evidencias locales para la Ola 2** (Harveys Lake, Clarks Summit, Pittston, Plains, Forty Fort, Nanticoke) | Aparecen como texto en los hubs de condado (`status: 'draft'`) | Por ciudad: trabajos con foto, reseñas o tipo de propiedad. Luego pasar a `published` y redactar `page` |
| 12 | **Back Mountain Chamber**: URL oficial | Se enlaza `backmountainchamber.org` solo en el schema (`memberOf`) | Verificar la URL |
| 13 | **Revisión legal** de Privacy Policy y Terms | Plantilla estándar redactada con datos confirmados | Revisión por parte del cliente o un abogado |
| 14 | **Landing `/vsl-cleaning-services/`** | Redirección 301 a `/` | Confirmar si se usa en anuncios: en ese caso, recrearla con `noindex` |
| 16 | **Atención en español** | No se afirma (ni en web ni en schema) | Confirmar si el equipo atiende en español → añadir `knowsLanguage` y mención visible |
| 15 | **Reseñas**: el texto completo procede del widget de la web vieja (Trustindex/Google) | Se publican 9 reseñas con nombre | Confirmar el permiso para mostrarlas, o sustituirlas por un widget oficial |
