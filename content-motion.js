/* Photographic camera movement and a distinct reading rhythm for each section.
   Progressive enhancement: no pinning, loops, hidden copy or moving form controls. */
(() => {
  'use strict';
  const root = document.documentElement;
  const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const svgNS = 'http://www.w3.org/2000/svg';
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  let context = null;
  let resizeObserver = null;
  let buildFrame = 0;
  let refreshFrame = 0;
  let keyboardInteraction = false;
  let pageAway = false;
  let ownTriggers = [];
  let addedClasses = [];
  let generatedNodes = [];
  let wrappers = [];
  const detailAnimations = new Map();

  // app.js owns the effective state, including the explicit manual override.
  const motionOff = () => root.classList.contains('motion-off') ||
    (!root.classList.contains('js') && systemMotion.matches);

  function mark(element, className) {
    if (element && !element.classList.contains(className)) {
      element.classList.add(className);
      addedClasses.push([element, className]);
    }
  }

  function transientClass(element, className) {
    if (!element.classList.contains(className)) addedClasses.push([element, className]);
  }

  function decorate(parent, className, tag = 'span') {
    const node = document.createElement(tag);
    node.className = className;
    node.setAttribute('aria-hidden', 'true');
    parent.append(node);
    generatedNodes.push(node);
    return node;
  }

  function track(animation) {
    if (animation.scrollTrigger) ownTriggers.push(animation.scrollTrigger);
    return animation;
  }

  function refreshSoon() {
    if (!context || refreshFrame || pageAway) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      if (context && !motionOff() && !pageAway) window.ScrollTrigger?.refresh();
    });
  }

  function stopDetails(details) {
    detailAnimations.get(details)?.forEach(animation => animation.cancel());
    detailAnimations.delete(details);
  }

  function clear() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
    resizeObserver?.disconnect();
    resizeObserver = null;
    detailAnimations.forEach(animations => animations.forEach(animation => animation.cancel()));
    detailAnimations.clear();
    ownTriggers.forEach(trigger => trigger.kill());
    ownTriggers = [];
    context?.revert();
    context = null;
    generatedNodes.forEach(node => node.remove());
    generatedNodes = [];
    // The portrait image returns to its original place, before the caption.
    wrappers.forEach(({ frame, image }) => {
      if (frame.parentNode) frame.replaceWith(image);
    });
    wrappers = [];
    addedClasses.forEach(([element, className]) => element.classList.remove(className));
    addedClasses = [];
    root.removeAttribute('data-content-motion');
  }

  function addPortraitFrame(image) {
    const frame = document.createElement('div');
    frame.className = 'cm-portrait-frame';
    image.before(frame);
    frame.append(image);
    wrappers.push({ frame, image });
    return frame;
  }

  function makeRoute(list, steps) {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('cm-process-route');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const trackPath = document.createElementNS(svgNS, 'path');
    const progressPath = document.createElementNS(svgNS, 'path');
    const marker = document.createElementNS(svgNS, 'circle');
    trackPath.classList.add('cm-route-track');
    progressPath.classList.add('cm-route-progress');
    progressPath.setAttribute('pathLength', '1');
    marker.classList.add('cm-route-marker');
    marker.setAttribute('r', '4.5');
    const stops = steps.map(() => {
      const stop = document.createElementNS(svgNS, 'circle');
      stop.classList.add('cm-route-stop');
      stop.setAttribute('r', '3');
      return stop;
    });
    svg.append(trackPath, progressPath, ...stops, marker);
    list.prepend(svg);
    generatedNodes.push(svg);
    let length = 0;
    let progress = 0;
    let thresholds = [];

    function update(next) {
      progress = clamp(next);
      progressPath.style.strokeDashoffset = String(1 - progress);
      if (length) {
        const point = progressPath.getPointAtLength(length * progress);
        marker.setAttribute('cx', point.x.toFixed(2));
        marker.setAttribute('cy', point.y.toFixed(2));
      }
      let current = 0;
      thresholds.forEach((threshold, index) => {
        const reached = progress + .002 >= threshold;
        stops[index].classList.toggle('cm-reached', reached);
        if (reached) current = index;
      });
      steps.forEach((step, index) => step.classList.toggle('cm-current', index === current));
    }

    function measure() {
      const base = list.getBoundingClientRect();
      const boxes = steps.map(step => step.getBoundingClientRect());
      const horizontal = boxes.length > 1 && Math.abs(boxes[1].top - boxes[0].top) < 24;
      const points = boxes.map(box => horizontal
        ? { x: box.left - base.left + 10, y: -24 }
        : { x: -12, y: box.top - base.top + 14 });
      let path = 'M ' + points[0].x + ' ' + points[0].y;
      const distances = [0];
      for (let index = 1; index < points.length; index++) {
        const previous = points[index - 1];
        const next = points[index];
        // A shallow arc connects actual step positions without entering the copy.
        const control = horizontal
          ? { x: (previous.x + next.x) / 2, y: -9 }
          : { x: -5, y: (previous.y + next.y) / 2 };
        path += ' Q ' + control.x + ' ' + control.y + ' ' + next.x + ' ' + next.y;
        distances.push(distances[index - 1] + Math.hypot(next.x - previous.x, next.y - previous.y));
      }
      svg.setAttribute('viewBox', '0 0 ' + Math.max(1, base.width) + ' ' + Math.max(1, base.height));
      trackPath.setAttribute('d', path);
      progressPath.setAttribute('d', path);
      stops.forEach((stop, index) => {
        stop.setAttribute('cx', points[index].x);
        stop.setAttribute('cy', points[index].y);
      });
      length = progressPath.getTotalLength();
      const distance = distances[distances.length - 1] || 1;
      thresholds = distances.map(value => value / distance);
      update(progress);
    }

    measure();
    return { measure, update };
  }

  function build() {
    clear();
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (pageAway || motionOff() || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ignoreMobileResize:true});
    const smallScreen=matchMedia('(max-width:760px)').matches;
    root.dataset.contentMotion = 'active';
    context = gsap.context(() => {});
    try {
      context.add(() => {
        // Headings arrive in place; body copy and all hit areas stay available.
        document.querySelectorAll('.services > .section-heading h2, .about-copy > h2, .technical-services > .section-heading h2, .process > .section-heading h2, .faq > h2').forEach(title => {
          mark(title, 'cm-section-title');
          track(gsap.fromTo(title, { y: 16 }, {
            y: 0, ease: 'none',
            scrollTrigger: { trigger: title, start: 'top 94%', end: 'top 63%', scrub: .3, invalidateOnRefresh: true }
          }));
        });

        const photo = document.querySelector('.services .service-image');
        const serviceImage = photo?.querySelector('img');
        if (serviceImage) {
          mark(photo, 'cm-service-image');
          const wash = decorate(photo, 'cm-photo-wash');
          const camera = gsap.timeline({ scrollTrigger: {
            trigger: document.querySelector('.services-layout') || photo,
            start: 'top 92%', end: 'bottom 28%', scrub: .65, invalidateOnRefresh: true
          } });
          // At every point scale >= 1.10; translation stays within its 5% overscan.
          camera.fromTo(serviceImage,
            { scale: 1.18, xPercent: -2, yPercent: 3.5 },
            { scale: 1.10, xPercent: 2, yPercent: -3.5, duration: 1, ease: 'none' }, 0);
          if(!smallScreen) camera.fromTo(photo, {clipPath:'inset(7% 5% 7% 5% round 16px)'}, {clipPath:'inset(0% 0% 0% 0% round 16px)',duration:.32,ease:'power2.out'},0);
          camera.fromTo(wash, { xPercent: -125 }, { xPercent: 165, duration: 1, ease: 'none' }, 0);
          camera.fromTo(wash, { opacity: 0 }, { opacity: .32, duration: .42, ease: 'sine.inOut' }, 0);
          camera.to(wash, { opacity: 0, duration: .58, ease: 'sine.inOut' }, .42);
          track(camera);
        }

        const serviceItems = [...document.querySelectorAll('.service-descriptions article')];
        serviceItems.forEach(item => {
          mark(item, 'cm-service-item');
          transientClass(item, 'cm-reading');
          const rule = decorate(item, 'cm-reading-rule');
          track(gsap.fromTo(rule, { scaleX: 0 }, {
            scaleX: 1, ease: 'none',
            scrollTrigger: {
              trigger: item, start: 'top 78%', end: 'bottom 46%', scrub: .35,
              onToggle: self => item.classList.toggle('cm-reading', self.isActive),
              invalidateOnRefresh: true
            }
          }));
        });

        const coast=document.querySelector('.location-visual img');
        if(coast){
          const panorama=gsap.timeline({scrollTrigger:{trigger:'.location-scene',start:'top bottom',end:'bottom top',scrub:.6,invalidateOnRefresh:true}});
          panorama.fromTo(coast,{scale:1.22,xPercent:-3,yPercent:4},{scale:1.09,xPercent:2,yPercent:-3,duration:1,ease:'none'},0);
          panorama.fromTo('.location-copy',{y:55},{y:-24,duration:1,ease:'none'},0);
          track(panorama);
        }
        const portrait = document.querySelector('.about .portrait-wrap img');
        if (portrait) {
          const frame = addPortraitFrame(portrait);
          const wash = decorate(frame, 'cm-photo-wash cm-portrait-wash');
          mark(portrait, 'cm-portrait-image');
          const arrival = gsap.timeline({ scrollTrigger: {
            trigger: frame, start: 'top 96%', end: 'bottom 38%', scrub: .5, invalidateOnRefresh: true
          } });
          if(!smallScreen) arrival.fromTo(frame,
            { clipPath: 'inset(8% 6% 10% 6% round 16px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: .64, ease: 'power1.out' }, 0);
          arrival.fromTo(portrait,
            { scale: 1.68, yPercent: 3 },
            { scale: 1.55, yPercent: 0, duration: 1, ease: 'none' }, 0);
          arrival.fromTo(wash, { xPercent: -135 }, { xPercent: 140, duration: 1, ease: 'none' }, 0);
          arrival.fromTo(wash, { opacity: 0 }, { opacity: .22, duration: .4, ease: 'sine.inOut' }, .1);
          arrival.to(wash, { opacity: 0, duration: .5, ease: 'sine.inOut' }, .5);
          track(arrival);
        }

        document.querySelectorAll('.credentials dd').forEach((value, index) => {
          mark(value, 'cm-credential-value');
          track(gsap.fromTo(value, { '--cm-credential-progress': 0 }, {
            '--cm-credential-progress': 1, ease: 'none',
            scrollTrigger: { trigger: value, start: 'top ' + (86 - index * 3) + '%', end: 'top ' + (55 - index * 3) + '%', scrub: .3 }
          }));
        });

        document.querySelectorAll('.technical-list details').forEach(row => {
          mark(row, 'cm-technical-row');
          transientClass(row, 'cm-row-current');
          track(gsap.fromTo(row, { '--cm-row-progress': 0 }, {
            '--cm-row-progress': 1, ease: 'none',
            scrollTrigger: {
              trigger: row, start: 'top 89%', end: 'top 48%', scrub: .35,
              onToggle: self => row.classList.toggle('cm-row-current', self.isActive),
              invalidateOnRefresh: true
            }
          }));
        });

        const processList = document.querySelector('.process .process-list');
        const steps = [...document.querySelectorAll('.process .process-list article')];
        if (processList && steps.length > 1) {
          mark(processList, 'cm-process-list');
          steps.forEach(step => { mark(step, 'cm-process-step'); transientClass(step, 'cm-current'); });
          const route = makeRoute(processList, steps);
          const state = { progress: 0 };
          track(gsap.to(state, {
            progress: 1, ease: 'none', onUpdate: () => route.update(state.progress),
            scrollTrigger: {
              trigger: processList, start: 'top 78%', end: 'bottom 42%', scrub: .4,
              invalidateOnRefresh: true, onRefresh: () => route.measure()
            }
          }));
        }

        const contact = document.querySelector('.contact');
        const contactTitle = contact?.querySelector('.contact-heading h2');
        if (contact && contactTitle) {
          mark(contact, 'cm-contact');
          mark(contactTitle, 'cm-contact-title');
          const rule = decorate(contact, 'cm-contact-rule');
          const arrival = gsap.timeline({ scrollTrigger: {
            trigger: contact, start: 'top 92%', end: 'top 42%', scrub: .35, invalidateOnRefresh: true
          } });
          arrival.fromTo(rule, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
          arrival.fromTo(contactTitle, { y: 20 }, { y: 0, ease: 'none', duration: .8 }, .1);
          track(arrival);
        }

        const social = document.querySelector('.social-contact');
        const socialLinks = [...document.querySelectorAll('.social-links a')];
        if (social && socialLinks.length) {
          const icons = socialLinks.map(link => link.querySelector('img')).filter(Boolean);
          socialLinks.forEach(link => mark(link, 'cm-social-link'));
          // Only icons and decoration move; link text and hit areas stay fixed.
          const arrival = gsap.timeline({ scrollTrigger: {
            trigger: social, start: 'top 89%', toggleActions: 'play none none reverse'
          } });
          if (icons.length) arrival.fromTo(icons,
            { y: 8, opacity: .65 },
            { y: 0, opacity: 1, duration: .28, stagger: .045, ease: 'power2.out' }, 0);
          arrival.fromTo(socialLinks,
            { '--cm-social-line': 0 },
            { '--cm-social-line': 1, duration: .32, stagger: .045, ease: 'power2.out' }, .06);
          track(arrival);
        }

        document.querySelectorAll('.faq-list details').forEach(row => {
          mark(row, 'cm-faq-row');
          track(gsap.fromTo(row, { '--cm-row-progress': 0 }, {
            '--cm-row-progress': 1, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 94%', end: 'top 62%', scrub: .3, invalidateOnRefresh: true }
          }));
        });

        const footer = document.querySelector('.site-footer');
        if (footer) {
          mark(footer, 'cm-footer');
          const rule = decorate(footer, 'cm-footer-rule');
          const signature = footer.querySelector('.footer-signature');
          const arrival = gsap.timeline({ scrollTrigger: {
            trigger: footer, start: 'top 97%', toggleActions: 'play none none reverse'
          } });
          arrival.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: 'power2.out' }, 0);
          if (signature) arrival.fromTo(signature, { y: 10 }, { y: 0, duration: .4, ease: 'power2.out' }, .06);
          track(arrival);
        }
      });

      if ('ResizeObserver' in window) {
        const lastSizes = new WeakMap();
        resizeObserver = new ResizeObserver(entries => {
          let changed = false;
          entries.forEach(entry => {
            const size = Math.round(entry.contentRect.width) + ':' + Math.round(entry.contentRect.height);
            const previous = lastSizes.get(entry.target);
            if (previous && previous !== size) changed = true;
            lastSizes.set(entry.target, size);
          });
          if (changed) refreshSoon();
        });
        document.querySelectorAll('#jornada, #conteudo, .process-list, .service-image, .portrait-wrap, .technical-list, .faq-list').forEach(element => resizeObserver.observe(element));
      }
      refreshSoon();
    } catch (error) {
      clear();
      console.warn('Os conteúdos continuam disponíveis sem efeitos de movimento.', error);
    }
  }

  function buildSoon() {
    cancelAnimationFrame(buildFrame);
    if (pageAway) return;
    // Remove in the same turn when disabled, before a queued animation can run.
    if (motionOff()) { clear(); buildFrame = 0; return; }
    buildFrame = requestAnimationFrame(() => {
      buildFrame = requestAnimationFrame(() => { buildFrame = 0; build(); });
    });
  }

  document.addEventListener('mozart:motionchange', buildSoon);
  document.addEventListener('mozart:languagechange', buildSoon);
  systemMotion.addEventListener('change', buildSoon);
  document.addEventListener('keydown', () => { keyboardInteraction = true; }, true);
  document.addEventListener('pointerdown', () => { keyboardInteraction = false; }, true);
  document.addEventListener('toggle', event => {
    const details = event.target;
    if (!(details instanceof Element) || !details.matches('details') || !details.closest('.faq, .technical-list')) return;
    stopDetails(details);
    if (context && details.open && !motionOff() && !keyboardInteraction) {
      const animations = [...details.querySelectorAll(':scope > p')].filter(node => typeof node.animate === 'function').map(node =>
        node.animate([{ transform: 'translateY(6px)' }, { transform: 'translateY(0)' }], {
          duration: 220, easing: 'cubic-bezier(.23,1,.32,1)'
        }));
      if (animations.length) {
        detailAnimations.set(details, animations);
        Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
          if (detailAnimations.get(details) === animations) detailAnimations.delete(details);
        });
      }
    }
    refreshSoon();
  }, true);
  window.addEventListener('pageshow', event => {
    pageAway = false;
    if (event.persisted) buildSoon();
  });
  window.addEventListener('pagehide', () => {
    pageAway = true;
    cancelAnimationFrame(buildFrame);
    buildFrame = 0;
    clear();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildSoon, { once: true });
  else buildSoon();
  window.addEventListener('load', refreshSoon, { once: true });
  document.fonts?.ready.then(refreshSoon);
})();
