/* Accessory overlays + FX builders for the Schmitty alert cards. */
(function () {
  const ACC = {};

  /* ---- live smoke layered over the painted cigar frames (sub) ---- */
  ACC.puffs = function () {
    let s = '';
    const P = [
      { d: 0.0, t: 3.6, sw: 16, sz: 26 },
      { d: 0.6, t: 4.3, sw: -22, sz: 20 },
      { d: 1.2, t: 3.9, sw: 12, sz: 34 },
      { d: 1.9, t: 4.6, sw: -14, sz: 24 },
      { d: 2.5, t: 3.4, sw: 24, sz: 18 },
      { d: 3.1, t: 4.1, sw: -18, sz: 30 },
    ];
    P.forEach((p) => {
      s += `<span class="puff" style="--pd:${p.d}s;--pt:${p.t}s;--sw:${p.sw}px;--sz:${p.sz}px"><i></i></span>`;
    });
    return `<div class="acc-puffs">${s}
      <span class="wisp w-l"></span><span class="wisp w-r"></span>
    </div>`;
  };

  /* ---- full-card smoke blow-out outro (sub) ---- */
  ACC.smokeScreen = function () {
    let blobs = '';
    for (let i = 1; i <= 7; i++) blobs += `<span class="sblob b${i}"></span>`;
    return `<div class="smoke-screen">${blobs}</div>`;
  };

  /* ---- bit gems (cheer) — badge-style color variants ---- */
  ACC.GEM_COLORS = [
    ['#9FF3F0', '#2BC5C0', '#157E7C'],
    ['#D9B8FF', '#8E4FE0', '#5A2BA0'],
    ['#FFD9A0', '#F59B2D', '#B05E12'],
    ['#A8CDF7', '#3D7BD9', '#2A5CB0'],
    ['#FFB3C0', '#E0405E', '#9C1F38'],
    ['#B8F0C0', '#3FBF63', '#1F7A3D'],
    ['#F0F4FA', '#AAB8CC', '#6E7E94'],
  ];
  ACC.gemSVG = function (i) {
    const [hi, mid, dark] = ACC.GEM_COLORS[(i || 0) % ACC.GEM_COLORS.length];
    if ((i || 0) % 2) {
      return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,1 21.5,6.5 21.5,17.5 12,23 2.5,17.5 2.5,6.5" fill="${mid}"></polygon>
        <polygon points="12,1 21.5,6.5 12,10.5 2.5,6.5" fill="${hi}"></polygon>
        <polygon points="12,10.5 21.5,17.5 12,23 2.5,17.5" fill="${dark}"></polygon>
        <polygon points="12,5 16.5,8 12,10.2 7.5,8" fill="#FFFFFF" opacity="0.5"></polygon>
      </svg>`;
    }
    return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,1 22,8.5 17.5,22 6.5,22 2,8.5" fill="${mid}"></polygon>
      <polygon points="12,1 22,8.5 12,12.5 2,8.5" fill="${hi}"></polygon>
      <polygon points="12,12.5 17.5,22 6.5,22" fill="${dark}"></polygon>
      <polygon points="12,2.5 16,8.3 12,10.4 8,8.3" fill="#FFFFFF" opacity="0.45"></polygon>
    </svg>`;
  };

  /* ---- money bag photo (tip) ---- */
  ACC.bagSVG = function () {
    return `<img class="bagimg" src="${window.SCHMITTY_BASE||''}bag.png" alt="">`;
  };

  ACC.bags = function () {
    /* three bags tossed from the mouth, landing on the card ledge */
    const spots = [
      { tx: -120, ty: 158, d: 0.0, s: 0.9 },
      { tx: -28, ty: 178, d: 0.55, s: 1.05 },
      { tx: 78, ty: 164, d: 1.1, s: 0.85 },
    ];
    let s = '';
    spots.forEach((p, i) => {
      s += `<span class="bag-x bx${i}" style="--tx:${p.tx}px;--d:${p.d}s">
        <span class="bag-y" style="--ty:${p.ty}px;--d:${p.d}s;--s:${p.s}">${ACC.bagSVG()}</span></span>`;
    });
    return `<div class="bags">${s}</div>`;
  };

  /* ---- blackhawk flyover (raid) ---- */
  ACC.heli = function () {
    return `<div class="heli"><div class="heli-bob"><img src="art/heli.png" alt=""></div></div>`;
  };

  /* ---- siren glow behind the card (raid) ---- */
  ACC.siren = function () {
    return `<div class="siren"><span class="s-red"></span><span class="s-blue"></span></div>`;
  };

  window.ACC = ACC;
})();


/* Card builder + sequencer for the 5 Schmitty alerts. Load after accessories.js. */
(function () {
  const CARDS = {};
  const F = (n) => `${window.SCHMITTY_BASE||''}${n}.png`;

  /* frames: [name, holdMs] looping timelines — mostly-still with twitchy pose flicks */
  CARDS.LIST = [
    {
      id: 'follow', kind: 'NEW FOLLOWER', name: 'PNWPaws', sub: 'welcome to the schmitty pack',
      ac: '#5FA8FF', outro: 'slide', dwell: 4.6, outroMs: 900, set: 'plain',
      frames: [['plain-1', 1300], ['plain-3', 700], ['plain-4', 850], ['plain-3', 500], ['plain-1', 900], ['plain-7', 800], ['plain-13', 600], ['plain-9', 1600], ['plain-10', 700]],
      leaveFrame: 'plain-15',
      acc: () => '',
    },
    {
      id: 'sub', kind: 'NEW SUBSCRIBER', name: 'DocksideDoug', sub: 'on the schmitty pack',
      ac: '#C9D4E3', outro: 'smoke', dwell: 4.6, outroMs: 1700, set: 'smoker', tier: 1,
      frames: [['smoker-1', 1700], ['smoker-2', 900], ['smoker-1', 1100], ['smoker-6', 1000], ['smoker-3', 850], ['smoker-9', 1100], ['smoker-10', 700]],
      leaveFrame: 'smoker-6',
      acc: () => ACC.puffs(), extra: () => ACC.smokeScreen(),
    },
    {
      id: 'cheer', kind: '500 BITS', name: 'MistyMarina', sub: 'absolutely buried him',
      ac: '#7FB3F2', outro: 'wipe', dwell: 6.2, outroMs: 900, set: 'plain', tier: 1,
      frames: [['plain-13', 1100], ['plain-6', 1400], ['plain-13', 1000], ['plain-9', 1200], ['plain-6', 1000]],
      flinch: ['plain-2', 'plain-11', 'plain-12', 'plain-2'],
      buriedFrame: 'plain-14', sim: true,
      acc: () => '',
    },
    {
      id: 'tip', kind: '$10 TIP', name: 'EvergreenErin', sub: 'straight to the vault',
      ac: '#6FCBA8', outro: 'slide', dwell: 4.8, outroMs: 900, set: 'robber', tier: 2,
      frames: [['robber-1', 1400], ['robber-4', 800], ['robber-5', 900], ['robber-2', 1100], ['robber-6', 900], ['robber-8', 1200]],
      leaveFrame: 'robber-8',
      laser: true, flinch: ['robber-4', 'robber-7', 'robber-2'],
      acc: () => ACC.bags(),
    },
    {
      id: 'raid', kind: 'RAID · 42', name: 'CascadeCrew', sub: 'the squad has arrived',
      ac: '#FF6B5D', outro: 'slide', dwell: 5.2, outroMs: 900, set: 'swat', tier: 3,
      frames: [['swat-1', 1200], ['swat-4', 1100], ['swat-3', 900], ['swat-5', 1300], ['swat-8', 1000], ['swat-7', 900]],
      leaveFrame: 'swat-5',
      acc: () => '', behind: () => ACC.siren(),
    },
  ];

  const SQUAD_FRAMES = ['swat-1', 'swat-4', 'swat-9', 'swat-8'];

  /* per-pose smoke origin (cigar tip), as % of the dog box — the live puffs
     track this so smoke always leaves his mouth as the pose changes */
  const SMOKE_ANCHOR = {
    'smoker-1': [73, 31], 'smoker-2': [74, 35], 'smoker-3': [72, 28],
    'smoker-4': [78, 33], 'smoker-5': [81, 33], 'smoker-6': [69, 15],
    'smoker-7': [76, 45], 'smoker-8': [73, 50], 'smoker-9': [80, 41],
    'smoker-10': [83, 47], 'smoker-11': [70, 52], 'smoker-12': [71, 52],
    'smoker-13': [73, 47], 'smoker-14': [73, 70], 'smoker-15': [79, 58],
  };

  CARDS.get = (id) => CARDS.LIST.find((a) => a.id === id);

  CARDS.buildHTML = function (a) {
    return `<div class="alert-pop" data-alert="${a.id}" data-tier="${a.tier || 0}" style="--ac:${a.ac}">
      ${a.behind ? a.behind() : ''}
      <div class="card">
        <div class="card-text">
          <div class="ct-kind">${a.kind}</div>
          <div class="ct-name">${a.name}</div>
          <div class="ct-sub">${a.sub}</div>
        </div>
      </div>
      <div class="dog-slot">
        <div class="dog-wrap" data-set="${a.set}">
          <div class="dog-bob">
            <img class="dog-img" src="${F(a.frames[0][0])}" alt="Schmitty">
            ${a.acc()}
          </div>
        </div>
      </div>
      ${a.extra ? a.extra() : ''}
    </div>`;
  };

  /* ---- sequencing ---- */
  let host = null, fx = null, timers = [], frameTimer = null, simRaf = null, laserRaf = null;

  CARDS.mount = function (hostEl, fxEl) {
    host = hostEl; fx = fxEl;
    // preload every frame we use
    const all = new Set(SQUAD_FRAMES);
    CARDS.LIST.forEach((a) => {
      a.frames.forEach((f) => all.add(f[0]));
      if (a.leaveFrame) all.add(a.leaveFrame);
      if (a.buriedFrame) all.add(a.buriedFrame);
      if (a.flinch) a.flinch.forEach((f) => all.add(f));
    });
    all.forEach((n) => { const i = new Image(); i.src = F(n); });
  };

  function clearTimers() {
    timers.forEach(clearTimeout); timers = [];
    clearTimeout(frameTimer); frameTimer = null;
    clearTimeout(flinchTimer); flinchTimer = null;
    if (simRaf) { cancelAnimationFrame(simRaf); simRaf = null; }
    if (laserRaf) { cancelAnimationFrame(laserRaf); laserRaf = null; }
  }
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  function playFrames(img, seq) {
    const puffs = img.closest('.dog-bob') && img.closest('.dog-bob').querySelector('.acc-puffs');
    function anchor(name) {
      if (!puffs) return;
      const a = SMOKE_ANCHOR[name];
      if (a) { puffs.style.setProperty('--sx', a[0] + '%'); puffs.style.setProperty('--sy', a[1] + '%'); }
    }
    let i = 0;
    function step() {
      const [name, hold] = seq[i % seq.length];
      img.src = F(name);
      img.dataset.base = name;
      anchor(name);
      i++;
      frameTimer = setTimeout(step, hold);
    }
    step();
  }

  /* quick reactive flicks while gems pelt him (cheer) */
  let flinchTimer = null;
  function playFlinches(img, pool) {
    function hit() {
      const f = pool[(Math.random() * pool.length) | 0];
      img.src = F(f);
      flinchTimer = setTimeout(() => {
        if (img.dataset.base) img.src = F(img.dataset.base);
        flinchTimer = setTimeout(hit, 500 + Math.random() * 800);
      }, 230);
    }
    flinchTimer = setTimeout(hit, 1100);
  }

  /* gravity + heap physics: gems fall, bounce, settle, and pile up over the dog */
  function startGemSim(pop, a, img) {
    const layer = document.createElement('div');
    layer.className = 'gem-sim';
    pop.appendChild(layer);
    const baseY = 548;
    const cx0 = 20, cx1 = 360;
    const COLS = 34, colW = (cx1 - cx0) / COLS;
    const heap = new Float32Array(COLS);
    const gems = [];
    let spawned = 0, lastImpact = 0, buried = false, stopSpawn = performance.now() + 3400;
    function spawn() {
      const u = (Math.random() + Math.random() + Math.random()) / 3;
      const x = cx0 + u * (cx1 - cx0);
      const size = 20 + Math.random() * 17;
      const el = document.createElement('span');
      el.className = 'simgem';
      el.innerHTML = ACC.gemSVG(spawned);
      el.style.width = el.style.height = size + 'px';
      layer.appendChild(el);
      gems.push({ el, x, y: -50 - Math.random() * 80, vx: (Math.random() - 0.5) * 70, vy: 0,
        rot: (Math.random() - 0.5) * 160, r: Math.random() * 360, size, live: true, bounced: false });
      spawned++;
    }
    function flick() {
      const f = a.flinch[(Math.random() * a.flinch.length) | 0];
      img.src = F(f);
      setTimeout(() => { if (img.dataset.base) img.src = F(img.dataset.base); }, 220);
    }
    let prev = performance.now();
    function tick(now) {
      const dt = Math.min(0.034, (now - prev) / 1000);
      prev = now;
      if (now < stopSpawn && spawned < 130) {
        if (Math.random() < 0.6) spawn();
        if (Math.random() < 0.35) spawn();
      }
      for (const g of gems) {
        if (!g.live) continue;
        g.vy += 1550 * dt;
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        g.r += g.rot * dt;
        const col = Math.max(0, Math.min(COLS - 1, ((g.x - cx0) / colW) | 0));
        const floor = baseY - heap[col] - g.size / 2;
        if (g.y >= floor) {
          g.y = floor;
          if (!g.bounced && g.vy > 330) {
            g.bounced = true;
            g.vy *= -(0.24 + Math.random() * 0.16);
            g.vx = (Math.random() - 0.5) * 110;
            g.rot = (Math.random() - 0.5) * 240;
          } else {
            g.live = false;
            const add = g.size * 0.62;
            heap[col] = Math.min(335, heap[col] + add);
            if (col > 0) heap[col - 1] = Math.min(335, heap[col - 1] + add * 0.45);
            if (col < COLS - 1) heap[col + 1] = Math.min(335, heap[col + 1] + add * 0.45);
            if (now - lastImpact > 520 && a.flinch && !buried) { lastImpact = now; flick(); }
            if (!buried && heap[(COLS / 2) | 0] > 235) {
              buried = true;
              clearTimeout(frameTimer); frameTimer = null;
              img.dataset.base = '';
              img.src = F(a.buriedFrame);
              pop.classList.add('buried');
            }
          }
        }
        g.el.style.transform = `translate(${g.x - g.size / 2}px,${g.y - g.size / 2}px) rotate(${g.r}deg)`;
      }
      simRaf = requestAnimationFrame(tick);
    }
    simRaf = requestAnimationFrame(tick);
  }

  /* sweeping security lasers that physically stop on the dog / bags (tip) */
  function startLaserFX(pop, a, img) {
    const layer = document.createElement('div');
    layer.className = 'laser-fx';
    pop.appendChild(layer);
    const EMS = [
      { x: 688, y: 56, base: 2.62, amp: 0.34, spd: 0.42, ph: 0 },
      { x: 698, y: 290, base: 3.05, amp: 0.26, spd: 0.31, ph: 2.1 },
      { x: 360, y: -6, base: 1.62, amp: 0.5, spd: 0.55, ph: 4.2 },
    ];
    const beams = EMS.map((e) => {
      const el = document.createElement('div'); el.className = 'laser';
      const dot = document.createElement('div'); dot.className = 'laser-dot';
      const em = document.createElement('div'); em.className = 'laser-emitter';
      em.style.left = e.x + 'px'; em.style.top = e.y + 'px';
      layer.append(el, dot, em);
      return { e, el, dot };
    });
    let lastFlick = 0, lastSpark = 0;

    /* convert a live element rect into pop-local coords (stage is scaled) */
    function localRect(el) {
      const p = pop.getBoundingClientRect();
      if (!p.width) return null;
      const s = p.width / 700;
      const r = el.getBoundingClientRect();
      return { x0: (r.left - p.left) / s, y0: (r.top - p.top) / s, x1: (r.right - p.left) / s, y1: (r.bottom - p.top) / s };
    }
    function rayBox(ex, ey, dx, dy, b) {
      if (!b) return Infinity;
      let tmin = 0, tmax = Infinity;
      for (const [p, d, lo, hi] of [[ex, dx, b.x0, b.x1], [ey, dy, b.y0, b.y1]]) {
        if (Math.abs(d) < 1e-6) { if (p < lo || p > hi) return Infinity; continue; }
        let t1 = (lo - p) / d, t2 = (hi - p) / d;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2);
        if (tmin > tmax) return Infinity;
      }
      return tmin > 1 ? tmin : Infinity;
    }
    function tick(now) {
      const t = now / 1000;
      const slot = pop.querySelector('.dog-slot');
      const dogBox = slot ? localRect(slot) : null;
      if (dogBox) { dogBox.x0 += 30; dogBox.x1 -= 30; dogBox.y0 += 46; } /* hug the dog, not the slot */
      const bagBoxes = [...pop.querySelectorAll('.bag-y')].map(localRect);
      for (const b of beams) {
        const ang = b.e.base + Math.sin(t * b.e.spd * 6.283 + b.e.ph) * b.e.amp;
        const dx = Math.cos(ang), dy = Math.sin(ang);
        let len = 980, hit = false;
        const tDog = rayBox(b.e.x, b.e.y, dx, dy, dogBox);
        let tBest = tDog;
        for (const bb of bagBoxes) tBest = Math.min(tBest, rayBox(b.e.x, b.e.y, dx, dy, bb));
        if (tBest < len) { len = tBest; hit = true; }
        b.el.style.transform = `translate(${b.e.x}px,${b.e.y}px) rotate(${ang}rad)`;
        b.el.style.width = len + 'px';
        b.el.classList.toggle('hit', hit);
        if (hit) {
          const hx = b.e.x + dx * len, hy = b.e.y + dy * len;
          b.dot.style.opacity = 1;
          b.dot.style.left = hx + 'px';
          b.dot.style.top = hy + 'px';
          if (now - lastSpark > 150) {
            lastSpark = now;
            const sp = document.createElement('div');
            sp.className = 'laser-spark';
            sp.style.left = hx + 'px'; sp.style.top = hy + 'px';
            layer.appendChild(sp);
            setTimeout(() => sp.remove(), 500);
          }
          if (tBest === tDog && now - lastFlick > 950) {
            lastFlick = now;
            const f = a.flinch[(Math.random() * a.flinch.length) | 0];
            img.src = F(f);
            setTimeout(() => { if (img.dataset.base) img.src = F(img.dataset.base); }, 240);
          }
        } else {
          b.dot.style.opacity = 0;
        }
      }
      laserRaf = requestAnimationFrame(tick);
    }
    laserRaf = requestAnimationFrame(tick);
  }

  CARDS.dwellScale = 1;

  CARDS.show = function (id, opts, onDone) {
    if (typeof opts === 'function') { onDone = opts; opts = null; }
    const a = opts ? Object.assign({}, CARDS.get(id), opts) : CARDS.get(id);
    if (!a || !host) return;
    clearTimers();
    host.innerHTML = CARDS.buildHTML(a);
    if (fx) fx.innerHTML = '';
    const pop = host.firstElementChild;
    const img = pop.querySelector('.dog-img');
    requestAnimationFrame(() => requestAnimationFrame(() => pop.classList.add('show')));
    setTimeout(() => pop.classList.add('show'), 60);
    playFrames(img, a.frames);
    if (a.sim) startGemSim(pop, a, img);
    else if (a.laser) startLaserFX(pop, a, img);
    else if (a.flinch) playFlinches(img, a.flinch);

    const dwell = a.dwell * 1000 * CARDS.dwellScale;

    if (a.buriedFrame && !a.sim) {
      later(() => {
        pop.classList.add('buried');
        clearTimeout(frameTimer); frameTimer = null;
        clearTimeout(flinchTimer); flinchTimer = null;
        img.dataset.base = '';
        img.src = F(a.buriedFrame);
      }, Math.max(1200, dwell - 1600));
    }
    if (a.id === 'raid' && fx) {
      later(() => spawnSquad(), 700);
    }

    later(() => {
      pop.classList.remove('show');
      pop.classList.add(a.outro === 'smoke' ? 'leave-smoke' : a.outro === 'wipe' ? 'leave-wipe' : 'leave');
      if (a.leaveFrame) {
        clearTimeout(frameTimer); frameTimer = null;
        clearTimeout(flinchTimer); flinchTimer = null;
        img.src = F(a.leaveFrame);
      }
      later(() => {
        host.innerHTML = '';
        if (fx) fx.innerHTML = '';
        if (onDone) onDone();
      }, a.outroMs);
    }, dwell);
  };

  CARDS.clear = function () {
    clearTimers();
    if (host) host.innerHTML = '';
    if (fx) fx.innerHTML = '';
  };

  function spawnSquad() {
    let s = '';
    for (let i = 0; i < 8; i++) {
      const w = 88 + ((i * 37) % 54);
      const t = (2.6 + Math.random() * 1.3).toFixed(2);
      const d = (i * 0.24 + Math.random() * 0.2).toFixed(2);
      const fr = SQUAD_FRAMES[i % SQUAD_FRAMES.length];
      s += `<div class="raider" style="--rw:${w}px;--rt:${t}s;--rd:${d}s">
        <div class="raider-bob" style="animation-delay:${(-Math.random()).toFixed(2)}s">
          <img src="${F(fr)}" alt="">
        </div>
      </div>`;
    }
    fx.innerHTML = s;
  }

  window.CARDS = CARDS;
})();


/* ============================================================
   StreamElements AlertBox — native per-alert JS.
   Your GitHub Pages URL is already set below.
   ============================================================ */

(function () {
  var started = false;

  function start(fieldData) {
    if (started) return;
    started = true;
    fieldData = fieldData || {};
    var base = fieldData.imageBase || window.SCHMITTY_IMAGE_BASE || 'https://tschmitty67.github.io/schmitty-alert/';
    window.SCHMITTY_BASE = /\/$/.test(base) ? base : base + '/';
    var side = fieldData.side || 'left';
    var holdScale = parseFloat(fieldData.holdScale) || 1;
    CARDS.dwellScale = holdScale;
    var root = document.getElementById('alerthost');
    var fx   = document.getElementById('fxlayer');
    var alertroot = document.getElementById('alertroot');
    if (alertroot) alertroot.dataset.side = side;
    if (!root || !window.CARDS) return;
    CARDS.mount(root, fx);
    var opts = {
      kind: root.dataset.kind  || undefined,
      name: root.dataset.name  || '',
      sub:  root.dataset.sub   || undefined
    };
    CARDS.show('follow', opts);
    window.__replay = function () { CARDS.show('follow', opts); };
  }

  window.addEventListener('onWidgetLoad', function (obj) {
    var fd = (obj.detail && obj.detail.fieldData) || {};
    start(fd);
  });

  if (document.readyState !== 'loading') {
    setTimeout(function () { start({}); }, 80);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () { start({}); }, 80);
    });
  }
})();
