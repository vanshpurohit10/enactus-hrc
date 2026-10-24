// Enactus H.R. College: the shared motion for the home page and the project pages.
// Every module looks for its own elements and quietly does nothing on a page without them.
// Pages can hand in window.GALLERY = [{ src, cap, c, r }] before this file loads,
// and use window.EN (helpers + the shared scroll loop) in their own code after it.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const inOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const outCubic = t => 1 - Math.pow(1 - t, 3);
  const inCubic = t => t * t * t;
  const outExpo = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const inr = n => n.toLocaleString('en-IN');

  // one scroll loop for everything that follows the page
  const tasks = [];
  let ticking = false;
  const onScroll = fn => { tasks.push(fn); fn(); };
  const runTasks = () => { ticking = false; tasks.forEach(f => f()); };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(runTasks); } }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(runTasks));
  const whenVisible = (el, start, stop) => new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop && stop())).observe(el);
  const fit = cv => {
    const dpr = Math.min(2, devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    return { W, H, dpr };
  };
  const progress = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); };

  // photos come from other sites; a missing one leaves a calm tile, not a broken icon
  const guard = img => img.addEventListener('error', () => (img.closest('figure,.hero-bg,.partner-bg,button,.media') || img.parentElement).classList.add('noimg'), { once: true });
  $$('img').forEach(guard);

  /* ── the hero's own entrance, after the intro ── */
  let heroStarted = false;
  const startHero = () => {
    if (heroStarted) return;
    heroStarted = true;
    $$('.hero [data-words], .hero [data-reveal]').forEach(el => el.classList.add('in'));
    const badge = $('.hero-badge'); if (badge) badge.classList.add('go');
  };

  /* ── intro: a spark draws a line, a streak cuts it open, the name slices in, the full stop opens into the page ── */
  (() => {
    const intro = $('#intro');
    if (!intro) { requestAnimationFrame(startHero); return; }
    const key = 'intro-' + (intro.dataset.key || 'site');
    let seen = null;
    try { seen = sessionStorage.getItem(key); } catch (e) {}
    if (reduce || seen || location.hash) { intro.remove(); requestAnimationFrame(startHero); return; }
    try { sessionStorage.setItem(key, '1'); } catch (e) {}
    const root = document.documentElement;
    root.classList.add('intro-lock');
    const path = $('.intro-wave path', intro), wave = $('.intro-wave', intro), spark = $('.intro-spark', intro);
    const streak = $('.intro-streak', intro), flash = $('.intro-flash', intro), slices = $$('.sl', intro), stop = $('.ghost .stop', intro);
    const len = path.getTotalLength();
    const t0 = performance.now();
    let ended = false;
    const end = () => { if (ended) return; ended = true; intro.remove(); root.classList.remove('intro-lock'); startHero(); };
    $('.intro-skip', intro).addEventListener('click', end);
    addEventListener('keydown', e => { if (e.key === 'Escape') end(); }, { once: true });
    const step = now => {
      if (ended) return;
      const t = now - t0;
      const d = clamp((t - 150) / 1100), de = inOut(d);
      path.style.strokeDashoffset = 1 - de;
      if (d > 0 && d < 1) {
        const pt = path.getPointAtLength(len * de), m = path.getScreenCTM();
        spark.style.opacity = 1;
        spark.style.transform = `translate(${pt.x * m.a + pt.y * m.c + m.e}px, ${pt.x * m.b + pt.y * m.d + m.f}px)`;
      } else spark.style.opacity = 0;
      const s = clamp((t - 1250) / 260);
      streak.style.transform = `scaleX(${outExpo(s)})`;
      streak.style.opacity = s > 0 ? 1 - clamp((t - 1520) / 240) : 0;
      flash.style.opacity = t < 1300 ? 0 : t < 1370 ? (t - 1300) / 70 * .85 : .85 * Math.max(0, 1 - (t - 1370) / 380);
      wave.style.opacity = 1 - clamp((t - 1300) / 260);
      slices.forEach((el, i) => {
        const k = clamp((t - 1420 - i * 55) / 560);
        el.style.transform = `translateX(${(1 - outExpo(k)) * (i % 2 ? -110 : 110)}vw)`;
      });
      const o = clamp((t - 2500) / 800);
      if (o > 0) {
        const r = stop.getBoundingClientRect();
        intro.style.setProperty('--hx', (r.left + r.width / 2) + 'px');
        intro.style.setProperty('--hy', (r.top + r.height * .74) + 'px');
        intro.style.setProperty('--hr', (Math.hypot(innerWidth, innerHeight) * 1.05 * inCubic(o) + r.width * .2) + 'px');
        if (o > .3) startHero();
      }
      if (o >= 1) { end(); return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  })();

  /* ── nav: solid once you scroll, a sheet on phones ── */
  const nav = $('.nav');
  if (nav) onScroll(() => nav.classList.toggle('solid', scrollY > 40));
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    const setMenu = open => { document.body.classList.toggle('menu-open', open); menuBtn.setAttribute('aria-expanded', open); };
    menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('.sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ── reel frame + notch: the scene you're in, and a scroll timecode ── */
  (() => {
    const scenes = $$('[data-scene]').map((el, i) => ({ el, id: el.id, label: String(i).padStart(2, '0') + ' · ' + el.dataset.scene }));
    const lab = $('#frLabel'), notch = $('#notch'), nt = $('#notchText'), links = $$('.links a[href^="#"]');
    if (!scenes.length || !lab) return;
    let cur = null, hide = 0;
    onScroll(() => {
      const mid = innerHeight * .5;
      let s = scenes[0];
      for (const x of scenes) if (x.el.getBoundingClientRect().top <= mid) s = x;
      if (s !== cur) {
        const first = cur === null;
        cur = s;
        lab.textContent = s.label;
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + s.id));
        if (!first && s !== scenes[0] && !reduce && notch) {
          nt.textContent = s.label;
          notch.classList.add('show');
          clearTimeout(hide);
          hide = setTimeout(() => notch.classList.remove('show'), 1700);
        }
      }
    });
  })();

  /* ── headings: every word rises out of its own mask ── */
  $$('[data-words]').forEach(el => {
    let i = 0;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const s = document.createElement('span'); s.textContent = tok; s.style.transitionDelay = (i++ * 70) + 'ms';
          w.appendChild(s); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  });

  /* ── numbers roll like an odometer ── */
  $$('.odo').forEach(el => {
    const v = +el.dataset.to;
    const txt = Number.isInteger(v) ? inr(v) : String(v);
    let di = 0;
    el.setAttribute('aria-label', txt);
    el.innerHTML = [...txt].map(ch => {
      if (!/\d/.test(ch)) return `<span class="sep" aria-hidden="true">${ch}</span>`;
      const stack = Array.from({ length: 20 }, (_, k) => `<i>${k % 10}</i>`).join('');
      return `<span class="col" aria-hidden="true" style="--d:${ch};--i:${di++}"><span>${stack}</span></span>`;
    }).join('');
  });

  /* ── reveal on entry ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.dispatchEvent(new CustomEvent('reveal'));
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  const watchReveals = (root = document) => $$('[data-reveal],[data-words],.odo,.draw,.endcard', root).filter(el => !el.closest('.hero')).forEach(el => io.observe(el));
  watchReveals();

  /* ── hero + CTA photos sink slower than the page ── */
  (() => {
    if (reduce) return;
    const bg = $('.hero-bg'), card = $('.hero-card'), pbg = $('.partner-bg'), partner = pbg && pbg.closest('section');
    onScroll(() => {
      const y = scrollY;
      if (bg && y < innerHeight * 1.3) {
        bg.style.transform = `translate3d(0, ${y * .35}px, 0)`;
        if (card) { card.style.transform = `translate3d(0, ${y * .12}px, 0)`; card.style.opacity = 1 - clamp(y / (innerHeight * .9)); }
      }
      if (partner) {
        const r = partner.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) pbg.style.transform = `translate3d(0, ${(r.top + r.height / 2 - innerHeight / 2) * -.12}px, 0)`;
      }
    });
  })();

  /* ── marquee rows that drift, and run faster while you scroll ── */
  $$('.washes').forEach(band => {
    if (reduce) return;
    const tracks = $$('.wtrack', band), off = tracks.map(() => 0);
    let live = false, last = scrollY, vel = 0;
    const frame = () => {
      if (!live) return;
      const dy = scrollY - last; last = scrollY;
      vel = vel * .9 + dy * .1;
      tracks.forEach((tr, i) => {
        const half = tr.scrollWidth / 2;
        off[i] += (i % 2 ? 1 : -1) * (.6 + Math.abs(vel) * .6);
        if (off[i] <= -half) off[i] += half;
        if (off[i] > 0) off[i] -= half;
        tr.style.transform = `translate3d(${off[i]}px, 0, 0)`;
      });
      requestAnimationFrame(frame);
    };
    whenVisible(band, () => { if (!live) { live = true; last = scrollY; requestAnimationFrame(frame); } }, () => { live = false; });
  });

  /* ── kinetic type: words whip in on the beat, a glitch, parts fly together, columns open the next scene ── */
  $$('.kin').forEach(sec => {
    if (reduce) { sec.classList.add('static'); return; }
    const stick = $('.kin-stick', sec), words = $$('.kin-word', sec), cols = $$('.kin-cols i', sec);
    const glitch = $('.glitch', sec), slices = $$('.g-s', sec), smear = $('.smear', sec);
    let live = false, cur = -1, fr = 0;
    const frame = () => {
      if (!live) return;
      fr++;
      const p = progress(sec), n = words.length, span = .8 / n;
      const idx = Math.min(n - 1, Math.floor(p / span));
      if (idx !== cur) { cur = idx; stick.style.setProperty('--kbg', words[idx].dataset.bg); stick.style.setProperty('--kfg', words[idx].dataset.fg); }
      words.forEach((w, i) => {
        const t = (p - i * span) / span;
        let x = 0, sk = 0, bl = 0, op = 0;
        if ((t >= 0 && t <= 1) || (i === n - 1 && t > 1) || (i === 0 && t < 0)) {
          op = 1;
          if (t < .22 && i > 0) { const k = 1 - outExpo(t / .22); x = 70 * k; sk = -18 * k; bl = 22 * k; }
          else if (t > .8 && i < n - 1) { const k = inCubic((t - .8) / .2); x = -70 * k; sk = 18 * k; bl = 22 * k; }
        }
        w.style.opacity = op;
        w.style.transform = `translate3d(${x}vw, 0, 0) skewX(${sk}deg)`;
        w.style.filter = bl > .3 ? `blur(${bl.toFixed(1)}px)` : 'none';
        // a word made of parts assembles itself while it holds
        $$('.part', w).forEach(pt => {
          const k = 1 - outExpo(clamp(t / .5));
          pt.style.transform = `translate(calc(var(--fx, 0vw) * ${k.toFixed(3)}), calc(var(--fy, 0vh) * ${k.toFixed(3)})) rotate(${(k * (+pt.dataset.rot || 0)).toFixed(1)}deg)`;
        });
      });
      if (glitch) {
        const gi = words.indexOf(glitch), tg = (p - gi * span) / span, on = tg > .28 && tg < .72;
        glitch.classList.toggle('on', on);
        if (fr % 3 === 0) slices.forEach(s => { s.style.transform = on && Math.random() < .55 ? `translateX(${((Math.random() - .5) * 9).toFixed(2)}vw)` : 'none'; });
        const sm = clamp((tg - .4) / .18);
        smear.style.opacity = sm > 0 && sm < 1 ? 1 : 0;
        smear.style.transform = `translateX(${(-100 + sm * 100).toFixed(1)}%) scaleX(${(.2 + sm * .8).toFixed(2)})`;
      }
      cols.forEach((c, i) => {
        const k = clamp(((p - .82) / .18) * 1.7 - i * .06);
        c.style.transform = `translateY(${((1 - inOut(k)) * 101).toFixed(2)}%)`;
      });
      requestAnimationFrame(frame);
    };
    whenVisible(sec, () => { if (!live) { live = true; requestAnimationFrame(frame); } }, () => { live = false; });
  });

  /* ── stacking cards: the card underneath sinks back as the next one slides over ── */
  $$('.stack').forEach(stack => {
    if (reduce) return;
    const cards = $$('.stack-card', stack);
    onScroll(() => cards.forEach((c, i) => {
      const nx = cards[i + 1];
      if (!nx) return;
      const a = c.getBoundingClientRect(), b = nx.getBoundingClientRect();
      const k = clamp(1 - (b.top - a.top) / a.height);
      c.style.transform = `scale(${(1 - .06 * k).toFixed(4)})`;
      c.style.filter = k > .01 ? `brightness(${(1 - .4 * k).toFixed(3)})` : 'none';
    }));
  });

  /* ── a horizontal track that the vertical scroll drives ── */
  $$('.hscroll').forEach(sec => {
    const track = $('.htrack', sec), bar = $('.hs-bar i', sec);
    if (reduce) { sec.classList.add('static'); return; }
    const size = () => { sec.style.height = (track.scrollWidth - innerWidth + innerHeight) + 'px'; };
    size(); addEventListener('resize', size);
    onScroll(() => {
      const p = progress(sec);
      track.style.transform = `translate3d(${(-p * Math.max(0, track.scrollWidth - innerWidth)).toFixed(1)}px, 0, 0)`;
      if (bar) bar.style.setProperty('--f', p.toFixed(3));
    });
  });

  /* ── timelines fill as you read down ── */
  $$('.tl').forEach(tl => {
    const items = $$('li', tl);
    onScroll(() => {
      const mark = innerHeight * .6, r = tl.getBoundingClientRect();
      tl.style.setProperty('--fill', clamp((mark - r.top) / r.height).toFixed(3));
      items.forEach(li => li.classList.toggle('hit', li.getBoundingClientRect().top < mark));
    });
  });

  /* ── gallery + viewer ── */
  (() => {
    const gal = $('#gal'), PHOTOS = window.GALLERY || [];
    if (!gal || !PHOTOS.length) return;
    gal.innerHTML = PHOTOS.map((p, i) =>
      `<button type="button" data-reveal style="--c:${p.c || 4};--r:${p.r || 3};--d:${(i % 3) * 90}ms" data-i="${i}"><figure><img src="${p.src}" alt="${p.cap}" loading="lazy" referrerpolicy="no-referrer"><figcaption>${p.cap}</figcaption></figure></button>`).join('');
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
    if (fine && !reduce) {
      gal.addEventListener('pointermove', e => {
        const b = e.target.closest('button');
        if (!b || !b.classList.contains('in')) return;
        const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        b.style.transition = 'transform .2s';
        b.style.transform = `perspective(900px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg) scale(1.02)`;
      });
      gal.addEventListener('pointerout', e => {
        const b = e.target.closest('button');
        if (b && !b.contains(e.relatedTarget)) { b.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1)'; b.style.transform = ''; }
      });
    }
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

  /* ── statements light up word by word as they scroll past ── */
  $$('.fill-words').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="fw">${w}</span>`).join(' ');
    const words = $$('.fw', el);
    onScroll(() => {
      const r = el.getBoundingClientRect();
      const n = Math.round(clamp((innerHeight * .85 - r.top) / (innerHeight * .55)) * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < n));
    });
  });

  /* ── spotlight + magnetic buttons ── */
  if (fine && !reduce) {
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
    $$('.btn-y').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .2).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * .3).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ── cursor line: one thin, smooth stroke that trails the pointer wherever it goes, scrolling included ── */
  (() => {
    const cv = $('#trail');
    if (!cv) return;
    if (!fine || reduce) { cv.remove(); return; }
    const ctx = cv.getContext('2d');
    const LIFE = 750, MAX_LEN = 300, WIDTH = 2.8;
    let W = 0, H = 0, dpr = 1, running = false, last = 0;
    let tx = 0, ty = 0, hx = 0, hy = 0, on = false;
    // kept in page coordinates, so when the page scrolls under a still pointer the line keeps drawing
    const pts = [];
    const size = () => { ({ W, H, dpr } = fit(cv)); };
    size(); addEventListener('resize', size);
    const frame = now => {
      const dt = Math.min(50, now - last); last = now;
      if (on) {
        const px = tx + scrollX, py = ty + scrollY;
        // a jump (a menu link, a reload) starts a fresh line instead of one long bar
        if (Math.hypot(px - hx, py - hy) > 600) { hx = px; hy = py; pts.length = 0; }
        // the head eases toward the pointer, so even a jerky hand draws a smooth curve
        const k = 1 - Math.pow(.62, dt / 16.7);
        hx += (px - hx) * k; hy += (py - hy) * k;
        const p = pts[pts.length - 1];
        if (!p || Math.hypot(hx - p.x, hy - p.y) > 1) pts.push({ x: hx, y: hy, t: now });
      }
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      // only the newest stretch is drawn, so the line keeps one length however fast you move
      let len = 0, from = 0;
      for (let i = pts.length - 1; i > 0; i--) {
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (len > MAX_LEN) { from = i - 1; break; }
      }
      const P = pts.slice(from).map(q => [q.x - scrollX, q.y - scrollY]);
      const n = P.length;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (n > 2) {
        // a ribbon that tapers from nothing at the tail to full width at the pointer
        const s = [0];
        for (let i = 1; i < n; i++) s.push(s[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
        const total = s[n - 1] || 1, L = [], R = [];
        for (let i = 0; i < n; i++) {
          const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)];
          let nx = a[1] - b[1], ny = b[0] - a[0];
          const nl = Math.hypot(nx, ny) || 1;
          const w = WIDTH * .5 * Math.pow(s[i] / total, .8);
          nx = nx / nl * w; ny = ny / nl * w;
          L.push([P[i][0] + nx, P[i][1] + ny]); R.push([P[i][0] - nx, P[i][1] - ny]);
        }
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(L[0][0], L[0][1]);
        for (let i = 1; i < n - 1; i++) ctx.quadraticCurveTo(L[i][0], L[i][1], (L[i][0] + L[i + 1][0]) / 2, (L[i][1] + L[i + 1][1]) / 2);
        ctx.lineTo(L[n - 1][0], L[n - 1][1]);
        ctx.lineTo(R[n - 1][0], R[n - 1][1]);
        for (let i = n - 2; i > 0; i--) ctx.quadraticCurveTo(R[i][0], R[i][1], (R[i][0] + R[i - 1][0]) / 2, (R[i][1] + R[i - 1][1]) / 2);
        ctx.lineTo(R[0][0], R[0][1]);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(P[n - 1][0], P[n - 1][1], WIDTH * .5, 0, Math.PI * 2);
        ctx.fill();
      }
      const settled = !on || Math.hypot(tx + scrollX - hx, ty + scrollY - hy) < .3;
      if (pts.length > 1 || !settled) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    };
    const kick = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      tx = e.clientX; ty = e.clientY;
      if (!on) { on = true; hx = tx + scrollX; hy = ty + scrollY; pts.length = 0; }
      kick();
    }, { passive: true });
    addEventListener('scroll', () => { if (on) kick(); }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { on = false; });
  })();

  /* ── end card: the line types itself ── */
  $$('.endcard').forEach(ec => {
    const line = $('.ec-line', ec), text = line.dataset.type;
    ec.addEventListener('reveal', () => {
      if (reduce) { line.textContent = text; return; }
      let i = 0;
      const type = () => { line.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(type, 42); };
      setTimeout(type, 2300);
    });
  });

  /* ── copy the page link, with a progress fill ── */
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    const t = $('.copy-t', b), label = t.textContent;
    try { await navigator.clipboard.writeText(location.href.split('#')[0]); t.textContent = 'Link copied ✓'; }
    catch (err) { t.textContent = 'Copy from the address bar'; }
    b.classList.add('done');
    setTimeout(() => { b.classList.remove('done'); t.textContent = label; }, 2600);
  }));

  window.EN = { $, $$, reduce, fine, clamp, lerp, inOut, outCubic, inCubic, outExpo, inr, onScroll, whenVisible, fit, progress, io, watchReveals, guard };
})();
