// Photographic plates and physical door occlusion share one scroll clock.
// GSAP is vendored locally; no WebGL or timer-driven walking loop.
const section = document.getElementById('jornada');
const canvas = document.getElementById('city-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const compact = matchMedia('(max-height: 500px)');
const copy = [...section.querySelectorAll('[data-scene-copy]')];
const facts = [...section.querySelectorAll('.city-fact')];
const indicator = section.querySelector('.lift-indicator');
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const segment = (p, a, b) => clamp((p - a) / (b - a));
const smooth = x => x * x * (3 - 2 * x);
const smoother = x => x * x * x * (x * (x * 6 - 15) + 10);
const lerp = (a, b, t) => a + (b - a) * t;
const motionOff = () => compact.matches || document.documentElement.classList.contains('motion-off');
let plates, trigger, width = 1, height = 1, progress = 0;
function load(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load ${src}`));
    image.src = src;
  });
}
function cover(image, zoom = 1, focalX = .5, focalY = .5) {
  const scale = Math.max(width / image.width, height / image.height) * zoom;
  const w = image.width * scale, h = image.height * scale;
  ctx.drawImage(image, (width - w) * focalX, (height - h) * focalY, w, h);
}
// Individual photographic bounds normalized to the same head and sole baseline.
const poses = [
  [62, 13, 226, 583], [361, 13, 235, 584], [671, 16, 236, 585], [984, 15, 235, 584],
  [60, 630, 238, 593], [371, 630, 232, 591], [673, 630, 231, 592], [989, 630, 228, 592]
];
function paintElevator(p) {
  const image = plates.elevator;
  const frameW = image.width / 2, frameH = image.height;
  const zoom = 1 + .055 * smooth(segment(p, .24, .58));
  const scale = Math.max(width / frameW, height / frameH) * zoom;
  const w = frameW * scale, h = frameH * scale;
  const x = (width - w) * .515, y = (height - h) * .46;
  ctx.drawImage(image, frameW, 0, frameW, frameH, x, y, w, h);
  const opening = { x: x + w * .399, y: y + h * .154, w: w * .259, h: h * .658 };
  const door = p < .60 ? 0 : smoother(segment(p, .60, .675));
  const walk = smooth(segment(p, .685, .785));
  const floor = Math.max(0, Math.round(24 * (1 - smoother(segment(p, .25, .56)))));
  indicator.textContent = floor === 0 ? 'T' : String(floor).padStart(2, '0');
  indicator.style.transform = `translate3d(${opening.x + opening.w / 2}px,${opening.y - 25}px,0) translateX(-50%)`;
  indicator.setAttribute('aria-label', floor === 0 ? 'Elevador no térreo' : `Elevador no andar ${floor}`);
  if (p > .56) {
    const walking = walk > .015 && walk < .93;
    const frame = walking ? Math.floor(segment(p, .685, .779) * 12) % 6 : 7;
    const [sx, sy, sw, sh] = poses[frame];
    const bodyH = opening.h * lerp(.79, 1.00, walk);
    const bodyW = bodyH * sw / sh;
    const footY = opening.y + opening.h * lerp(.95, 1.12, walk);
    const center = opening.x + opening.w * lerp(.5, .54, walk);
    ctx.save();
    ctx.translate(center, footY - 2);
    ctx.scale(bodyW * .68, bodyH * .038);
    const shadow = ctx.createRadialGradient(0, 0, .04, 0, 0, 1);
    shadow.addColorStop(0, 'rgba(20,24,21,.32)');
    shadow.addColorStop(1, 'rgba(20,24,21,0)');
    ctx.fillStyle = shadow; ctx.fillRect(-1, -1, 2, 2); ctx.restore();
    ctx.save();
    ctx.filter = 'saturate(.84) brightness(.94)';
    ctx.drawImage(plates.person, sx, sy, sw, sh, center - bodyW / 2, footY - bodyH, bodyW, bodyH);
    ctx.restore();
  }
  // Closed-door photographs slide behind the jamb; the person stays occluded until ground level.
  ctx.save(); ctx.beginPath();
  ctx.rect(opening.x - 1, opening.y - 1, opening.w + 2, opening.h + 2); ctx.clip();
  const srcX = frameW * .399, srcY = frameH * .154;
  const srcW = frameW * .259, srcH = frameH * .658;
  const travel = opening.w * .5 * door;
  ctx.drawImage(image, srcX, srcY, srcW / 2, srcH, opening.x - travel, opening.y, opening.w / 2 + .5, opening.h);
  ctx.drawImage(image, srcX + srcW / 2, srcY, srcW / 2, srcH, opening.x + opening.w / 2 + travel, opening.y, opening.w / 2 + .5, opening.h);
  ctx.restore();
  section.dataset.floor = String(floor);
  section.dataset.doorOpen = door.toFixed(3);
  section.dataset.walk = walk.toFixed(3);
}
function visibility(el, opacity, distance = 14) {
  el.style.opacity = opacity;
  el.style.transform = `translate3d(0,${(1 - opacity) * distance}px,0)`;
  el.style.visibility = opacity < .01 ? 'hidden' : 'visible';
  el.inert = opacity < .7;
  el.setAttribute('aria-hidden', opacity < .2 ? 'true' : 'false');
}
function render(p) {
  progress = p;
  if (!plates) return;
  const dpr = Math.min(devicePixelRatio, 1.8);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1;
  cover(plates.roof, 1 + .55 * smoother(segment(p, .015, .27)), .74, .4);
  const liftAlpha = smooth(segment(p, .205, .28));
  if (liftAlpha && p < .88) { ctx.globalAlpha = liftAlpha; paintElevator(p); }
  const cityAlpha = smooth(segment(p, .81, .88));
  if (cityAlpha) {
    ctx.globalAlpha = cityAlpha;
    cover(plates.city, 1 + .10 * smooth(segment(p, .83, 1)), width < 700 ? .45 : .5, .56);
  }
  ctx.globalAlpha = 1;
  const ranges = {
    roof: 1 - smooth(segment(p, .13, .205)),
    descent: smooth(segment(p, .29, .33)) * (1 - smooth(segment(p, .51, .57))),
    welcome: smooth(segment(p, .69, .73)) * (1 - smooth(segment(p, .79, .825))),
    city: smooth(segment(p, .87, .91))
  };
  copy.forEach(el => visibility(el, ranges[el.dataset.sceneCopy]));
  facts.forEach((el, i) => visibility(el, smooth(segment(p, .905 + i * .032, .935 + i * .032)), 22));
  indicator.style.opacity = liftAlpha * (1 - cityAlpha);
  indicator.style.visibility = liftAlpha * (1 - cityAlpha) < .1 ? 'hidden' : 'visible';
  section.dataset.progress = p.toFixed(4);
  section.dataset.scene = p < .25 ? 'roof' : p < .81 ? 'elevator' : 'city';
  section.dataset.floor = String(Math.max(0, Math.round(24 * (1 - smoother(segment(p, .25, .56))))));
  section.dataset.doorOpen = smoother(segment(p, .60, .675)).toFixed(3);
  section.dataset.walk = smooth(segment(p, .685, .785)).toFixed(3);
  section.style.setProperty('--photo-shade', p < .21 || p > .84 ? .8 : .87);
}
function measure() {
  const bounds = canvas.getBoundingClientRect();
  width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
  const dpr = Math.min(devicePixelRatio, 1.8);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  render(progress);
}
function syncMotion() {
  trigger?.kill(); trigger = null;
  const previousHeight = section.offsetHeight;
  const previousScroll = scrollY;
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
  const top = section.getBoundingClientRect().top + previousScroll;
  const below = previousScroll >= top + previousHeight - headerHeight;
  const content = document.getElementById('conteudo');
  const contentTop = content.getBoundingClientRect().top;
  const restoreContext = () => {
    if (below) {
      const drift = content.getBoundingClientRect().top - contentTop;
      if (Math.abs(drift) > .5) window.scrollTo({ top: scrollY + drift, behavior: 'instant' });
    }
  };
  const off = motionOff() || !plates || !window.ScrollTrigger;
  section.classList.toggle('is-static', off); measure();
  // Keep the reader in the same content when the long narrative expands or collapses.
  if (below) window.scrollTo({ top: previousScroll + section.offsetHeight - previousHeight, behavior: 'instant' });
  else if (off && previousScroll > top - headerHeight) window.scrollTo({ top: Math.max(0, top - headerHeight), behavior: 'instant' });
  if (off) { render(0); restoreContext(); requestAnimationFrame(restoreContext); return; }
  window.gsap.registerPlugin(window.ScrollTrigger);
  // Native sticky supplies the pin. ScrollTrigger batches scroll and resize calculations.
  trigger = window.ScrollTrigger.create({
    trigger: section,
    start: () => `top top+=${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80}`,
    end: 'bottom bottom',
    onUpdate: self => render(self.progress),
    onRefresh: self => { measure(); render(self.progress); },
    invalidateOnRefresh: true
  });
  trigger.refresh();
  restoreContext(); requestAnimationFrame(restoreContext);
}
try {
  const [roof, elevator, person, city] = await Promise.all([
    load('assets/roof-photo.webp'), load('assets/elevator-frames.webp'),
    load('assets/mozart-photo-atlas.png'), load('assets/recife.webp')
  ]);
  plates = { roof, elevator, person, city };
  section.classList.add('ready'); syncMotion();
} catch (error) {
  section.classList.add('is-static', 'failed');
  console.warn('A apresentação usa a imagem estática porque uma cena não carregou.', error);
}
new ResizeObserver(measure).observe(canvas);
document.addEventListener('mozart:motionchange', syncMotion);
compact.addEventListener('change', syncMotion);
document.fonts.ready.then(() => trigger?.refresh());
addEventListener('pagehide', event => { if (!event.persisted) trigger?.kill(); });
addEventListener('pageshow', event => { if (event.persisted) syncMotion(); });
