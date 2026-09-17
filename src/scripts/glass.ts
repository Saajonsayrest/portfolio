// Light. One module, two branches on the hover media query, document listeners only (they survive
// view transitions).
//
// Pointer devices: at most one write per frame, driving two things:
// 1. The specular on glass surfaces and the light on project tiles: the pointer position goes into
//    --mx/--my on the surface under the pointer; the CSS draws the highlight from those and fades it
//    on hover.
// 2. The page glow: --px/--py on the root, eased towards the pointer so the light trails a little
//    (straight to it under reduced motion). html.pointer shows it; it goes when the pointer leaves the
//    window. The view transition swap resets <html>, so class and position are put back after it.
//
// Touch: no pointer to follow, so the same light answers the finger and the scroll instead.
// 1. Tap bloom: pointerdown puts --mx/--my under the finger and adds .lit to the surface; a tap holds
//    it a moment after release, a scroll that starts on a tile drops it at once.
// 2. Scroll spotlight: the tile crossing the middle band of the screen carries .near; the CSS lights
//    it at its centre in the project's brand colour, and the light moves down the page as you scroll.
// 3. The page glow rides the scroll in CSS (see body::after), nothing to do here.

const SURFACES = '.site-header, .btn.ghost, .apps, .row';
const root = document.documentElement;
const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.14;

function light(el: HTMLElement, event: PointerEvent) {
  const box = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - box.left}px`);
  el.style.setProperty('--my', `${event.clientY - box.top}px`);
}

if (window.matchMedia('(hover: hover)').matches) {
  let frame = 0;
  let last: PointerEvent | null = null;
  let glide = 0;
  let seen = false;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;

  const paint = () => {
    frame = 0;
    const target = last?.target as Element | null;
    const el = target?.closest<HTMLElement>(SURFACES);
    if (el && last) light(el, last);
  };

  const place = () => {
    root.style.setProperty('--px', `${x}px`);
    root.style.setProperty('--py', `${y}px`);
  };

  const follow = () => {
    glide = 0;
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
      x = tx;
      y = ty;
    } else {
      glide = requestAnimationFrame(follow);
    }
    place();
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      last = event;
      tx = event.clientX;
      ty = event.clientY;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
      }
      root.classList.add('pointer');
      if (!frame) frame = requestAnimationFrame(paint);
      if (!glide) glide = requestAnimationFrame(follow);
    },
    { passive: true },
  );
  root.addEventListener('pointerleave', () => root.classList.remove('pointer'));
  document.addEventListener('astro:after-swap', () => {
    if (!seen) return;
    root.classList.add('pointer');
    place();
  });
} else {
  // iOS Safari only applies :active to a touch when some touchstart listener exists.
  document.addEventListener('touchstart', () => {}, { passive: true });

  let held: HTMLElement | null = null;
  let timer = 0;

  const release = (hold: number) => () => {
    const el = held;
    if (!el) return;
    held = null;
    timer = window.setTimeout(() => el.classList.remove('lit'), hold);
  };

  document.addEventListener(
    'pointerdown',
    (event) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>(SURFACES);
      if (!el) return;
      clearTimeout(timer);
      held?.classList.remove('lit');
      light(el, event);
      el.classList.add('lit');
      held = el;
    },
    { passive: true },
  );
  document.addEventListener('pointerup', release(700), { passive: true });
  document.addEventListener('pointercancel', release(0), { passive: true });

  // Spotlight. The band is the middle fifth of the screen; the first tile in it stays lit until it
  // leaves, so two tiles never light at once and nothing flickers at the boundary.
  const inBand = new Set<Element>();
  let near: Element | null = null;
  const watch = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inBand.add(entry.target);
        else inBand.delete(entry.target);
      }
      if (near && inBand.has(near)) return;
      near?.classList.remove('near');
      near = inBand.values().next().value ?? null;
      near?.classList.add('near');
    },
    { rootMargin: '-40% 0px -40% 0px' },
  );
  const init = () => {
    watch.disconnect();
    inBand.clear();
    near = null;
    document.querySelectorAll('.row').forEach((el) => watch.observe(el));
  };
  document.addEventListener('astro:page-load', init);
}
