// Enactus H.R. College: the shared script for the home page and the project pages.
// Motion is kept quiet on purpose: blocks fade in once as they come into view and numbers count up once.
// Nothing is pinned to the scroll or moves on its own.
// Pages can hand in window.GALLERY = [{ src, cap, c, r }] before this file loads,
// and use window.EN in their own code after it.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const inr = n => n.toLocaleString('en-IN');

  // photos come from other sites; a missing one leaves a calm tile, not a broken icon
  const guard = img => img.addEventListener('error', () => (img.closest('figure,.hero-bg,.partner-bg,button,.media') || img.parentElement).classList.add('noimg'), { once: true });
  $$('img').forEach(guard);

  // one throttled scroll handler for the few things that read the scroll position
  const onScroll = fn => {
    let ticking = false;
    const run = () => { ticking = false; fn(); };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    addEventListener('resize', run);
    fn();
  };

  /* ── nav: solid once you scroll, a menu on phones, and the link for the section you're reading is underlined ── */
  const nav = $('.nav');
  if (nav) onScroll(() => nav.classList.toggle('solid', scrollY > 40));
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    const setMenu = open => { document.body.classList.toggle('menu-open', open); menuBtn.setAttribute('aria-expanded', open); };
    menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('.sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }
  (() => {
    const links = $$('.links a[href^="#"]');
    const sections = $$('main > section[id]');
    if (!links.length || !sections.length) return;
    let cur = null;
    onScroll(() => {
      const mark = innerHeight * .4;
      let s = null;
      for (const el of sections) if (el.getBoundingClientRect().top <= mark) s = el;
      if (s === cur) return;
      cur = s;
      links.forEach(a => a.classList.toggle('on', !!s && a.getAttribute('href') === '#' + s.id));
    });
  })();

  /* ── blocks fade in once as they come into view ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.dispatchEvent(new CustomEvent('reveal'));
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  const watchReveals = (root = document) => $$('[data-reveal],.count', root).forEach(el => io.observe(el));

  /* ── numbers count up once; the real number is already in the page for anyone without JavaScript ── */
  $$('.count').forEach(el => {
    const to = +el.dataset.to;
    const dec = (String(el.dataset.to).split('.')[1] || '').length;
    const fmt = v => (dec ? v.toFixed(dec) : inr(Math.round(v)));
    el.textContent = fmt(to);
    if (reduce) return;
    el.textContent = fmt(0);
    el.addEventListener('reveal', () => {
      const t0 = performance.now(), D = 1200;
      const tick = now => {
        const k = Math.min(1, (now - t0) / D);
        el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { once: true });
  });
  watchReveals();

  /* ── gallery + viewer ── */
  (() => {
    const gal = $('#gal'), PHOTOS = window.GALLERY || [];
    if (!gal || !PHOTOS.length) return;
    gal.innerHTML = PHOTOS.map((p, i) =>
      `<button type="button" data-reveal style="--c:${p.c || 4};--r:${p.r || 3};--d:${(i % 3) * 80}ms" data-i="${i}"><figure><img src="${p.src}" alt="${p.cap}" loading="lazy" referrerpolicy="no-referrer"><figcaption>${p.cap}</figcaption></figure></button>`).join('');
    $$('button', gal).forEach(b => { io.observe(b); guard($('img', b)); });
    const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
    let at = 0;
    const show = i => { at = (i + PHOTOS.length) % PHOTOS.length; lbImg.src = PHOTOS[at].src; lbImg.alt = PHOTOS[at].cap; lbCap.textContent = PHOTOS[at].cap; };
    gal.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; show(+b.dataset.i); lb.showModal(); });
    $('#lbPrev').onclick = () => show(at - 1);
    $('#lbNext').onclick = () => show(at + 1);
    $('#lbClose').onclick = () => lb.close();
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(at - 1); if (e.key === 'ArrowRight') show(at + 1); });
  })();

  /* ── videos: a poster first, the YouTube player only when asked for ── */
  $$('.vid[data-yt]').forEach(v => {
    const id = v.dataset.yt;
    v.insertAdjacentHTML('afterbegin', `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">`);
    guard($('img', v));
    v.addEventListener('click', () => {
      v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${v.getAttribute('aria-label') || 'Video'}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    }, { once: true });
  });

  /* ── copy the page link ── */
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    const t = $('.copy-t', b) || b, label = t.textContent;
    try { await navigator.clipboard.writeText(location.href.split('#')[0]); t.textContent = 'Link copied ✓'; }
    catch (err) { t.textContent = 'Copy from the address bar'; }
    b.classList.add('done');
    setTimeout(() => { b.classList.remove('done'); t.textContent = label; }, 2600);
  }));

  window.EN = { $, $$, reduce, inr, io, watchReveals, guard, onScroll };
})();
