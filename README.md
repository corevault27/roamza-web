# Roamza Cleaning Services — website (Astro)

Web estática con prioridad en SEO y GEO para **Roamza Cleaning Services LLC** (Dallas, PA). Sustituye al WordPress de `roamzacleaningservices.com`.
Construida por Helice Digital Solutions siguiendo `../Roamza_Prompt_Maestro_Web_SEO_GEO.md`.

## Comandos
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run qa         # auditoría SEO/GEO/enlaces sobre dist/ (falla si hay errores)
npm run preview    # sirve dist/
npm run images     # (una sola vez) re-procesa las imágenes desde ../Recursos y quita EXIF/GPS
```

## Estructura
```
src/data/business.ts   ← FUENTE ÚNICA: NAP, claims, redes, FastQuote, flags
src/data/services.ts   ← 6 servicios (tareas reales de la web vieja), FAQs, slugs conservados
src/data/areas.ts      ← condados + ciudades por olas (status published|draft)
src/data/reviews.ts    ← reseñas reales de Google
src/data/faqs.ts       ← FAQs generales
src/lib/schema.ts      ← JSON-LD
src/components/        ← Header, MobileBar, FastQuote, RoomByRoom, BeforeAfter, AreaMap, Reviews, Faq…
src/scripts/fx.ts      ← capa de interacción (vanilla, ~10 KB, reduced-motion aware)
src/pages/             ← rutas (los slugs de servicio coinciden con WordPress)
public/_redirects      ← 301 de URLs viejas
scripts/qa.mjs         ← QA estático
```

## Editar contenido
- **Teléfono, email, cifras:** cambia `src/data/business.ts` y se actualizan la web, el schema y `llms.txt`.
- **Publicar una ciudad nueva:** en `src/data/areas.ts`, pasa `status: 'published'` y completa `page` con contenido único (ver la puerta de calidad en `docs/SEO-PLAN.md`).
- **FastQuote:** el org ID está en `business.fastQuote`. No lo dupliques en otros sitios.

## Publicar (lo hace Joan, no se ejecutó nada)
Sigue los SOP de Notion → *SEO HELICE — Manual Maestro*:
1. **Vincular GitHub con Netlify:** crea un repo privado y haz push de esta carpeta (`git remote add origin …`, `git push -u origin main`).
2. **En Netlify:** build `npm run build` y publish `dist` (ya configurados en `netlify.toml`).
3. **Dominio sin tocar DNS:** añade `roamzacleaningservices.com` en Netlify.
4. **Migrar WordPress a Netlify sin perder correos (Namecheap + cPanel):** revisa los registros MX/mail antes de cambiar el DNS.
5. Después del DNS: SSL, `www → apex`, GSC (sitemap), GA4 (eventos `data-track`) y Netlify Forms (`contact`).

Pendientes del cliente: `PENDING_CLIENT_APPROVAL.md` · Diseño: `DESIGN.md` · Redirecciones: `docs/REDIRECTS.md`.
