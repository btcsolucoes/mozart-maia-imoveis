/* One reading rhythm per section. No pinning, loops, hidden text or focus changes. */
(() => {
  "use strict";
  const root = document.documentElement;
  const systemMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const svgNS = "http://www.w3.org/2000/svg";
  let context = null;
  let resizeObserver = null;
  let buildFrame = 0;
  let refreshFrame = 0;
  let ownTriggers = [];
  let addedClasses = [];
  let generatedNodes = [];

  // app.js owns the effective preference, including an explicit manual override.
  const motionOff = () =>
    root.classList.contains("motion-off") ||
    (!root.classList.contains("js") && systemMotion.matches);

  function mark(element, className) {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
      addedClasses.push([element, className]);
    }
  }

  function track(animation) {
    if (animation.scrollTrigger) ownTriggers.push(animation.scrollTrigger);
    return animation;
  }

  function refreshSoon() {
    if (!context || refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      if (context && !motionOff()) window.ScrollTrigger?.refresh();
    });
  }

  function clear() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
    resizeObserver?.disconnect();
    resizeObserver = null;
    ownTriggers.forEach((trigger) => trigger.kill());
    ownTriggers = [];
    context?.revert();
    context = null;
    addedClasses.forEach(([element, className]) =>
      element.classList.remove(className),
    );
    addedClasses = [];
    generatedNodes.forEach((node) => node.remove());
    generatedNodes = [];
    root.removeAttribute("data-content-motion");
  }

  function emphasize(items, className, progress) {
    const index = Math.min(
      items.length - 1,
      Math.floor(progress * items.length),
    );
    items.forEach((item, itemIndex) => {
      item.classList.toggle(className, itemIndex === index);
    });
  }

  function makeRoute(list, steps) {
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("cm-process-route");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const trackPath = document.createElementNS(svgNS, "path");
    trackPath.classList.add("cm-route-track");
    const progressPath = document.createElementNS(svgNS, "path");
    progressPath.classList.add("cm-route-progress");
    progressPath.setAttribute("pathLength", "1");
    svg.append(trackPath, progressPath);
    list.prepend(svg);
    generatedNodes.push(svg);

    function measureRoute() {
      const base = list.getBoundingClientRect();
      const boxes = steps.map((step) => step.getBoundingClientRect());
      const width = Math.max(1, base.width);
      const height = Math.max(1, base.height);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const horizontal =
        boxes.length > 1 && Math.abs(boxes[1].top - boxes[0].top) < 24;
      let path;
      if (horizontal) {
        const firstX = boxes[0].left - base.left;
        const last = boxes[boxes.length - 1];
        const lastX = last.left - base.left + Math.min(last.width, 44);
        path = `M ${firstX} -22 H ${lastX}`;
      } else {
        const firstY = boxes[0].top - base.top + 13;
        const lastY = boxes[boxes.length - 1].top - base.top + 13;
        path = `M -13 ${firstY} V ${Math.max(firstY + 1, lastY)}`;
      }
      trackPath.setAttribute("d", path);
      progressPath.setAttribute("d", path);
    }
    measureRoute();
    return { progressPath, measureRoute };
  }

  function build() {
    clear();
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (motionOff() || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    root.dataset.contentMotion = "active";
    context = gsap.context(() => {});
    try {
      context.add(() => {
        const photo = document.querySelector(".services .service-image");
        const serviceImage = photo?.querySelector("img");
        if (serviceImage) {
          mark(photo, "cm-service-image");
          track(
            gsap.fromTo(
              serviceImage,
              {
                clipPath: "inset(7% 11% 7% 0% round 16px)",
                scale: 1.07,
                yPercent: 2,
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                scale: 1,
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: photo,
                  start: "top 88%",
                  end: "bottom 40%",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              },
            ),
          );
        }

        const serviceList = document.querySelector(".service-descriptions");
        const serviceItems = [
          ...document.querySelectorAll(".service-descriptions article"),
        ];
        if (serviceList && serviceItems.length) {
          serviceItems.forEach((item) => {
            mark(item, "cm-service-item");
            // Track the transient class even if it is not active at initialization.
            addedClasses.push([item, "cm-reading"]);
          });
          ownTriggers.push(
            ScrollTrigger.create({
              trigger: serviceList,
              start: "top 66%",
              end: "bottom 43%",
              onUpdate: (self) =>
                emphasize(serviceItems, "cm-reading", self.progress),
              onRefresh: (self) =>
                emphasize(serviceItems, "cm-reading", self.progress),
            }),
          );
        }

        const portrait = document.querySelector(".about .portrait-wrap img");
        if (portrait) {
          mark(portrait, "cm-portrait-image");
          track(
            gsap.fromTo(
              portrait,
              { clipPath: "inset(0% 0% 17% 0% round 16px)", scale: 1.025 },
              {
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: portrait,
                  start: "top 88%",
                  end: "top 32%",
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              },
            ),
          );
        }

        document.querySelectorAll(".credentials dd").forEach((value, index) => {
          mark(value, "cm-credential-value");
          track(
            gsap.fromTo(
              value,
              { "--cm-credential-progress": 0 },
              {
                "--cm-credential-progress": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: value,
                  start: `top ${83 - index * 3}%`,
                  end: `top ${55 - index * 3}%`,
                  scrub: 0.3,
                },
              },
            ),
          );
        });

        const processList = document.querySelector(".process .process-list");
        const steps = [
          ...document.querySelectorAll(".process .process-list article"),
        ];
        if (processList && steps.length > 1) {
          mark(processList, "cm-process-list");
          steps.forEach((step) => {
            mark(step, "cm-process-step");
            addedClasses.push([step, "cm-current"]);
          });
          const route = makeRoute(processList, steps);
          track(
            gsap.fromTo(
              route.progressPath,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: processList,
                  start: "top 75%",
                  end: "bottom 44%",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                  onRefresh: (self) => {
                    route.measureRoute();
                    emphasize(steps, "cm-current", self.progress);
                  },
                  onUpdate: (self) =>
                    emphasize(steps, "cm-current", self.progress),
                },
              },
            ),
          );
        }

        const contact = document.querySelector(".contact");
        const contactTitle = contact?.querySelector("h2");
        if (contact && contactTitle) {
          mark(contact, "cm-contact");
          const rule = document.createElement("span");
          rule.className = "cm-contact-rule";
          rule.setAttribute("aria-hidden", "true");
          contact.prepend(rule);
          generatedNodes.push(rule);
          const arrival = gsap.timeline({
            scrollTrigger: {
              trigger: contact,
              start: "top 89%",
              end: "top 48%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          });
          arrival.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: 1 },
            0,
          );
          arrival.fromTo(
            contactTitle,
            { x: 10 },
            { x: 0, ease: "none", duration: 1 },
            0,
          );
          track(arrival);
        }
      });

      if ("ResizeObserver" in window) {
        let lastSizes = new WeakMap();
        resizeObserver = new ResizeObserver((entries) => {
          let changed = false;
          entries.forEach((entry) => {
            const size = `${Math.round(entry.contentRect.width)}:${Math.round(entry.contentRect.height)}`;
            const previous = lastSizes.get(entry.target);
            if (previous && previous !== size) changed = true;
            lastSizes.set(entry.target, size);
          });
          if (changed) refreshSoon();
        });
        // Observe layout only: the hero is never mutated by this controller.
        document
          .querySelectorAll("#jornada, #conteudo, .process-list")
          .forEach((element) => resizeObserver.observe(element));
      }
      refreshSoon();
    } catch (error) {
      clear();
      console.warn(
        "Os conteúdos continuam disponíveis sem efeitos de movimento.",
        error,
      );
    }
  }

  function buildSoon() {
    cancelAnimationFrame(buildFrame);
    buildFrame = requestAnimationFrame(() => {
      buildFrame = requestAnimationFrame(() => {
        buildFrame = 0;
        build();
      });
    });
  }

  document.addEventListener("mozart:motionchange", buildSoon);
  document.addEventListener("mozart:languagechange", buildSoon);
  systemMotion.addEventListener("change", buildSoon);
  document.addEventListener(
    "toggle",
    (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".faq, .technical-list")
      )
        refreshSoon();
    },
    true,
  );
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) buildSoon();
  });
  window.addEventListener("pagehide", (event) => {
    if (!event.persisted) {
      cancelAnimationFrame(buildFrame);
      clear();
    }
  });
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", buildSoon, { once: true });
  else buildSoon();
  window.addEventListener("load", refreshSoon, { once: true });
  document.fonts?.ready.then(refreshSoon);
})();
