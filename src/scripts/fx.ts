/**
 * Roamza interaction layer — progressive enhancement, zero dependencies.
 * Everything here is optional: without JS the site is fully readable and usable.
 * Respects prefers-reduced-motion and only enables cursor effects on fine pointers.
 */
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

declare global { interface Window { dataLayer?: unknown[] } }

/* -------- analytics hook (GA4 connected later by Helice) -------- */
export function track(event: string, data: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data, page: location.pathname });
}
function initTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (el) track(el.dataset.track!, { label: el.textContent?.trim().slice(0, 60) });
  });
}

/* -------- header: compact on scroll, hide mobile bar near footer -------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const bar = document.querySelector<HTMLElement>('[data-mobile-bar]');
  const footer = document.querySelector('footer');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (bar && footer) {
    new IntersectionObserver(([en]) => bar.classList.toggle('is-hidden', en.isIntersecting), { rootMargin: '0px 0px -40% 0px' }).observe(footer);
  }
}

/* -------- services dropdown (desktop) -------- */
function initDropdown() {
  $$('[data-dropdown]').forEach((wrap) => {
    const btn = wrap.querySelector<HTMLButtonElement>('[data-dropdown-toggle]')!;
    const panel = wrap.querySelector<HTMLElement>('[data-dropdown-panel]')!;
    let t: number | undefined;
    const set = (open: boolean) => { btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open; };
    btn.addEventListener('click', () => set(panel.hidden));
    if (finePointer()) {
      wrap.addEventListener('mouseenter', () => { clearTimeout(t); set(true); });
      wrap.addEventListener('mouseleave', () => { t = window.setTimeout(() => set(false), 180); });
    }
    wrap.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
    wrap.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget as Node)) set(false); });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target as Node)) set(false); });
  });
}

/* -------- mobile menu (curtain) -------- */
function initMobileMenu() {
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;
  const open = () => {
    menu.hidden = false; openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    closeBtn.focus();
  };
  const close = () => {
    menu.classList.remove('is-open'); openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    window.setTimeout(() => { menu.hidden = true; }, reduce() ? 0 : 550);
    openBtn.focus();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = $$<HTMLElement>('a, button', menu);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) close(); });
}

/* -------- reveals -------- */
function initReveals() {
  const els = $$('[data-reveal], [data-split], [data-wipe], [data-roofwipe], [data-ai]');
  if (reduce() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* -------- counters (real numbers only) -------- */
function initCounters() {
  const els = $$('[data-count]');
  const run = (el: HTMLElement) => {
    const to = parseFloat(el.dataset.count!); const dec = Number(el.dataset.decimals || 0);
    if (reduce()) { el.textContent = to.toFixed(dec); return; }
    const dur = 1400; const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur); const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = (to * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target as HTMLElement); io.unobserve(en.target); } }), { threshold: 0.6 });
  els.forEach((e) => io.observe(e));
}

/* -------- cursor effects (desktop only) -------- */
function initPointerFx() {
  if (!finePointer() || reduce()) return;
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  $$('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  $$('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  // service list: floating preview image that follows the cursor
  $$('[data-hover-list]').forEach((list) => {
    const float = list.querySelector<HTMLElement>('[data-hover-float]');
    if (!float) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => { cx += (x - cx) * 0.16; cy += (y - cy) * 0.16; float.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`; raf = requestAnimationFrame(loop); };
    list.addEventListener('pointerenter', () => { float.classList.add('is-on'); raf = requestAnimationFrame(loop); });
    list.addEventListener('pointerleave', () => { float.classList.remove('is-on'); cancelAnimationFrame(raf); });
    list.addEventListener('pointermove', (e) => { const r = list.getBoundingClientRect(); x = e.clientX - r.left; y = e.clientY - r.top; });
    $$('[data-hover-item]', list).forEach((item) => {
      item.addEventListener('pointerenter', () => {
        $$('[data-hover-img]', float).forEach((im) => im.classList.toggle('is-active', im.dataset.hoverImg === item.dataset.hoverItem));
      });
    });
  });
}

/* -------- parallax layers -------- */
function initParallax() {
  const els = $$('[data-parallax]');
  if (!els.length || reduce()) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const speed = Number(el.dataset.parallax || 0.1);
      const offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.translate = `0 ${(-offset).toFixed(1)}px`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* -------- before / after slider -------- */
function initBeforeAfter() {
  $$('[data-ba]').forEach((wrap) => {
    const range = wrap.querySelector<HTMLInputElement>('input[type=range]')!;
    const set = (v: number) => { wrap.style.setProperty('--pos', `${v}%`); range.value = String(v); range.setAttribute('aria-valuetext', `${Math.round(v)}% after`); };
    range.addEventListener('input', () => set(Number(range.value)));
    set(Number(range.value));
    if (reduce()) return;
    // one-time demo when it enters the viewport
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return; io.disconnect();
      const seq = [50, 22, 78, 50]; let i = 0; let from = 50; const t0 = performance.now();
      const dur = 700;
      const step = (t: number) => {
        const k = Math.floor((t - t0) / dur); const p = ((t - t0) % dur) / dur;
        if (k >= seq.length - 1) { set(50); return; }
        if (k !== i) { i = k; from = seq[k]; }
        const ease = 0.5 - Math.cos(Math.PI * p) / 2;
        set(from + (seq[k + 1] - from) * ease);
        requestAnimationFrame(step);
      };
      wrap.addEventListener('pointerdown', () => { i = 99; }, { once: true });
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(wrap);
  });
}

/* -------- room by room (sticky media + steps) -------- */
function initRooms() {
  $$('[data-rooms]').forEach((root) => {
    const steps = $$('[data-room-step]', root);
    const media = $$('[data-room-media]', root);
    const bar = root.querySelector<HTMLElement>('[data-room-progress]');
    const tabs = $$<HTMLButtonElement>('[data-room-tab]', root);
    const activate = (idx: number) => {
      media.forEach((m, i) => m.classList.toggle('is-active', i === idx));
      steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      tabs.forEach((t, i) => t.setAttribute('aria-pressed', String(i === idx)));
      if (bar) bar.style.setProperty('--p', String((idx + 1) / steps.length));
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) activate(steps.indexOf(en.target as HTMLElement)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => io.observe(s));
    tabs.forEach((t, i) => t.addEventListener('click', () => { activate(i); steps[i]?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'center' }); }));
    activate(0);
  });
}

/* -------- draw SVG lines on scroll (process, map) -------- */
function initDraw() {
  const els = $$<SVGGeometryElement>('[data-draw]');
  if (!els.length) return;
  if (reduce()) { els.forEach((p) => { p.style.strokeDashoffset = '0'; }); return; }
  els.forEach((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; p.dataset.len = String(len); });
  const onScroll = () => {
    els.forEach((p) => {
      const host = (p.closest('[data-draw-host]') as HTMLElement) || p.ownerSVGElement!;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
      const len = Number(p.dataset.len);
      p.style.strokeDashoffset = String(len * (1 - prog));
      host.querySelectorAll<HTMLElement>('[data-step-at]').forEach((s) => s.classList.toggle('is-lit', prog >= Number(s.dataset.stepAt)));
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -------- service area map -------- */
function initMap() {
  $$('[data-map]').forEach((map) => {
    const panel = map.querySelector<HTMLElement>('[data-map-panel]');
    const show = (el: Element) => {
      const d = (el as HTMLElement).dataset;
      $$('[data-city]', map).forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-city') === d.city));
      if (panel) {
        panel.querySelector('[data-p-name]')!.textContent = `${d.name}, PA`;
        panel.querySelector('[data-p-county]')!.textContent = d.county || '';
        const link = panel.querySelector<HTMLAnchorElement>('[data-p-link]')!;
        if (d.href) { link.href = d.href; link.hidden = false; } else { link.hidden = true; }
        panel.querySelector('[data-p-note]')!.textContent = d.href ? 'Local page available' : 'Included in our service area';
      }
    };
    $$('[data-city]', map).forEach((el) => {
      el.addEventListener('pointerenter', () => show(el));
      el.addEventListener('focus', () => show(el));
    });
  });
}

/* -------- FastQuote: load the iframe only on demand / near viewport -------- */
function initFastQuote() {
  $$('[data-fastquote]').forEach((box) => {
    if (box.dataset.fastquote === 'eager') {
      // iframe is already in the HTML; only add the resize bridge, right after first paint
      const addBridge = () => {
        if (document.querySelector('script[data-fq-bridge]')) return;
        const s = document.createElement('script'); s.src = box.dataset.bridge!; s.async = true; s.dataset.fqBridge = '1';
        document.body.appendChild(s);
      };
      requestAnimationFrame(() => setTimeout(addBridge, 0));
      return;
    }
    const load = () => {
      if (box.dataset.loaded) return; box.dataset.loaded = '1';
      const tpl = box.querySelector<HTMLTemplateElement>('template');
      if (!tpl) return;
      box.querySelector('[data-fq-placeholder]')?.remove();
      box.appendChild(tpl.content.cloneNode(true));
      if (!document.querySelector('script[data-fq-bridge]')) {
        const s = document.createElement('script'); s.src = box.dataset.bridge!; s.defer = true; s.dataset.fqBridge = '1';
        document.body.appendChild(s);
      }
      track('quote_widget_loaded');
    };
    box.querySelector('[data-fq-load]')?.addEventListener('click', load);
    if (box.dataset.fastquote === 'idle') {
      const go = () => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1200));
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    }
    if (box.dataset.fastquote === 'auto') {
      new IntersectionObserver(([en], io) => { if (en.isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '300px' }).observe(box);
    }
  });
}

/* -------- FAQ accordion (animated <details>) -------- */
function initFaq() {
  if (reduce()) return;
  $$<HTMLDetailsElement>('details[data-faq]').forEach((d) => {
    const summary = d.querySelector('summary')!; const body = d.querySelector<HTMLElement>('[data-faq-body]')!;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.open) {
        const h = body.offsetHeight; body.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 280, easing: 'ease-out' }).onfinish = () => { d.open = false; };
      } else {
        d.open = true; const h = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' });
      }
    });
  });
}

/* -------- marquee pause toggle -------- */
function initMarquee() {
  $$('[data-marquee-toggle]').forEach((btn) => {
    const m = document.getElementById(btn.getAttribute('aria-controls')!);
    btn.addEventListener('click', () => {
      const paused = m?.dataset.paused === 'true';
      if (m) m.dataset.paused = String(!paused);
      btn.setAttribute('aria-pressed', String(!paused));
      btn.querySelector('[data-label]')!.textContent = paused ? 'Pause reviews' : 'Play reviews';
    });
  });
}

/* -------- contact form (client-side validation; Netlify Forms on deploy) -------- */
function initForms() {
  $$<HTMLFormElement>('form[data-validate]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        const first = form.querySelector<HTMLElement>(':invalid');
        form.classList.add('was-validated');
        first?.focus();
        return;
      }
      track('form_submit', { form: form.getAttribute('name') });
    });
  });
}

/* -------- split text nodes into word spans (keeps inner <em>/<mark>/<strong>) -------- */
function splitWords(root: HTMLElement, cls: string) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  const words: HTMLElement[] = [];
  nodes.forEach((t) => {
    if (!t.nodeValue || !t.nodeValue.trim()) return;
    const frag = document.createDocumentFragment();
    t.nodeValue.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
      const w = document.createElement('span'); w.className = cls;
      const inner = document.createElement('span'); inner.textContent = part; w.appendChild(inner);
      frag.appendChild(w); words.push(w);
    });
    t.parentNode!.replaceChild(frag, t);
  });
  return words;
}

/* -------- headings revealed word by word -------- */
function initWordReveal() {
  const els = $$('[data-words]');
  if (!els.length || reduce() || !('IntersectionObserver' in window)) return;
  els.forEach((el) => {
    const label = el.textContent?.replace(/\s+/g, ' ').trim();
    const words = splitWords(el, 'wr');
    if (label) el.setAttribute('aria-label', label);
    words.forEach((w, i) => { w.setAttribute('aria-hidden', 'true'); w.style.setProperty('--i', String(i)); });
    el.classList.add('wr-ready');
  });
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('wr-in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  els.forEach((e) => io.observe(e));
  window.setTimeout(() => els.forEach((e) => e.classList.add('wr-in')), 5000);
}

/* -------- statements that light up word by word as you scroll -------- */
function initScrub() {
  const els = $$('[data-scrub]');
  if (!els.length || reduce()) return;
  const sets = els.map((el) => {
    // words stay in the accessibility tree (no aria-label on <p>, which is not allowed)
    const words = splitWords(el, 'sw');
    el.classList.add('sw-ready');
    return { el, words };
  });
  const update = () => {
    const vh = window.innerHeight;
    sets.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(p * words.length * 1.15);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}

/* -------- giant text that slides horizontally with scroll -------- */
function initScrollX() {
  const els = $$('[data-scroll-x]');
  if (!els.length || reduce()) return;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = (el.parentElement || el).getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const speed = Number(el.dataset.scrollX || -0.3);
      el.style.transform = `translate3d(${((r.top - vh) * speed).toFixed(1)}px,0,0)`;
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}

/* -------- page progress + active chapter -------- */
function initChapters() {
  const bar = document.querySelector<HTMLElement>('[data-page-progress]');
  if (bar) {
    const upd = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
    };
    window.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    upd();
  }
  const links = $$<HTMLAnchorElement>('[data-chapter-link]');
  if (!links.length) return;
  const map = new Map(links.map((a) => [a.dataset.chapterLink!, a]));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
    const a = map.get(en.target.id); if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* -------- compact lists on mobile: "show more" toggles (content is always in the HTML) -------- */
function initMore() {
  $$<HTMLButtonElement>('[data-more-btn]').forEach((btn) => {
    const host = btn.closest<HTMLElement>('[data-more]');
    if (!host) return;
    const closedLabel = btn.textContent || '';
    btn.addEventListener('click', () => {
      const open = !host.classList.contains('is-open');
      host.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Show less' : closedLabel;
    });
  });
}

/* -------- horizontal strip driven by vertical scroll (desktop only) -------- */
function initHScroll() {
  const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  $$('[data-hscroll]').forEach((sec) => {
    const stage = sec.querySelector<HTMLElement>('[data-hscroll-stage]');
    const track = sec.querySelector<HTMLElement>('[data-hscroll-track]');
    if (!stage || !track) return;
    let dist = 0;
    const update = () => {
      if (!sec.classList.contains('hs-on')) return;
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / (dist || 1)));
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    };
    const layout = () => {
      track.style.transform = '';
      if (!mq.matches) { sec.classList.toggle('hs-on', false); sec.style.height = ''; return; }
      sec.classList.toggle('hs-on', true);
      dist = Math.max(0, track.scrollWidth - track.clientWidth);
      sec.style.height = `${stage.offsetHeight + dist}px`;
      update();
    };
    layout();
    window.addEventListener('resize', layout);
    mq.addEventListener?.('change', layout);
    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('load', layout, { once: true });
  });
}

/* -------- hero background video: respects reduced motion + data saver, pausable -------- */
function initHeroVideo() {
  const v = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (!v) return;
  const btn = document.querySelector<HTMLButtonElement>('[data-hero-video-toggle]');
  const label = btn?.querySelector('[data-label]');
  const set = (playing: boolean) => {
    if (playing) v.play().catch(() => {}); else v.pause();
    btn?.setAttribute('aria-pressed', String(!playing));
    if (label) label.textContent = playing ? 'Pause video' : 'Play video';
  };
  const saveData = (navigator as any).connection?.saveData;
  let ready = false;
  // sources are attached only after the page has loaded, so text, widget and images come first
  const attach = () => {
    if (ready) return; ready = true;
    v.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => { s.src = s.dataset.src!; });
    v.load();
  };
  if (reduce() || saveData) set(false);
  else {
    const go = () => { attach(); set(true); };
    if (matchMedia('(max-width: 767.98px)').matches) {
      // phones: the poster is shown first; the loop starts on the first touch/scroll (saves data, keeps the page fast)
      set(false);
      const once = () => { ['scroll', 'touchstart', 'pointerdown', 'keydown'].forEach((e) => removeEventListener(e, once)); go(); };
      ['scroll', 'touchstart', 'pointerdown', 'keydown'].forEach((e) => addEventListener(e, once, { passive: true }));
    } else if (document.readyState === 'complete') setTimeout(go, 300); else window.addEventListener('load', () => setTimeout(go, 300), { once: true });
  }
  btn?.addEventListener('click', () => { attach(); set(v.paused); });
  // stop decoding when the hero is off-screen
  new IntersectionObserver(([en]) => {
    if (!ready || btn?.getAttribute('aria-pressed') === 'true') return;
    if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
  }).observe(v);
}

export function initFx() {
  // critical: navigation, contact tracking, quote widget, hero video
  initTracking();
  initHeader();
  initDropdown();
  initMobileMenu();
  initFastQuote();
  initHeroVideo();
  initFaq();
  initForms();
  initReveals();
  initWordReveal();
  // visual effects run after first paint, when the main thread is idle
  const rest = () => {
    initHScroll(); initMore(); initScrub(); initScrollX(); initChapters();
    initCounters(); initPointerFx(); initParallax(); initBeforeAfter();
    initRooms(); initDraw(); initMap(); initMarquee();
  };
  const idle = (window as any).requestIdleCallback as ((cb: () => void, o?: { timeout: number }) => void) | undefined;
  requestAnimationFrame(() => (idle ? idle(rest, { timeout: 1200 }) : setTimeout(rest, 200)));
}
