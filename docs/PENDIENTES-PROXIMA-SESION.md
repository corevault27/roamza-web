# Pendientes para retomar (anotado el 05/nov/2026)

La web está publicada en https://roamzacleaningservices.com (Netlify ← GitHub `corevault27/roamza-web`, rama `main`).

## Necesitan acceso de Joan o de Miriam
1. **Search Console** (propiedad de dominio):
   - Enviar el sitemap `https://roamzacleaningservices.com/sitemap-index.xml`.
   - Pedir la indexación de `/`, `/regular-cleaning/`, `/deep-cleaning/`, `/airbnb-cleaning/`, `/service-areas/dallas-pa/` y `/service-areas/wilkes-barre-pa/`.
2. **Bing Webmaster Tools:** importar desde Search Console.
3. **GA4:** comprobar en vivo que se registran `call_click`, `sms_click`, `quote_start` y `quote_widget_loaded`.
4. **Google Business Profile:**
   - Que tenga el teléfono **(272) 203-3263**.
   - Revisar la categoría principal, las zonas (Luzerne, Lackawanna y Wyoming) y el enlace a la web con UTM.
5. **Citaciones con el número nuevo:** Facebook, Yelp, BBB, Bing Places y Apple Business Connect. Añadir a `sameAs` los que existan.
6. **Rich Results Test y validator.schema.org** sobre la URL pública.
7. **Línea base de IA:** las 5 preguntas fijas en ChatGPT y Perplexity, en ventana nueva. Anotar si nombran a Roamza y qué fuentes citan.
   - "best house cleaning service in Dallas PA"
   - "recommend 3 cleaning companies in Wilkes-Barre PA"
   - "who does Airbnb turnover cleaning near Harveys Lake PA"
   - "move out cleaning Scranton PA"
   - "maid service Back Mountain PA"
8. **PageSpeed Insights** (pagespeed.web.dev) de la home en móvil y escritorio, para confirmar los números de Lighthouse; la API agotó su cuota.

## Datos que debe confirmar Miriam
Están detallados en `PENDING_CLIENT_APPROVAL.md`:
- El apellido público.
- El horario.
- La política de cancelación y el depósito.
- La duración de cada servicio.
- Si quiere publicar precios.
- El permiso para mostrar las reseñas con nombre.
- Que el email `info@` recibe correo.
- Si el equipo atiende en español.
- La ciudad de cada foto.
- Los datos de la segunda tanda de ciudades.

Informe completo: `auditorias/roamzacleaningservices.com-2026-11-04.md`.
