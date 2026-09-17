// Pointer light. One document listener (survives view transitions), pointer devices only, at most one
// write per frame, driving two things:
// 1. The specular on glass surfaces and the light on project tiles: the pointer position goes into
//    --mx/--my on the surface under the pointer; the CSS draws the highlight from those and fades it
//    on hover.
// 2. The page glow: --px/--py on the root, eased towards the pointer so the light trails a little
//    (straight to it under reduced motion). html.pointer shows it; it goes when the pointer leaves the
//    window. The view transition swap resets <html>, so class and position are put back after it.

const SURFACES = '.site-header, .btn.ghost, .apps, .row';
const root = document.documentElement;
const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.14;

let frame = 0;
let last: PointerEvent | null = null;
let glide = 0;
let seen = false;
let x = 0;
let y = 0;
let tx = 0;
let ty = 0;

function paint() {
  frame = 0;
  const target = last?.target as Element | null;
  const el = target?.closest<HTMLElement>(SURFACES);
  if (!el || !last) return;
  const box = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${last.clientX - box.left}px`);
  el.style.setProperty('--my', `${last.clientY - box.top}px`);
}

function place() {
  root.style.setProperty('--px', `${x}px`);
  root.style.setProperty('--py', `${y}px`);
}

function follow() {
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
}

if (window.matchMedia('(hover: hover)').matches) {
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
}
