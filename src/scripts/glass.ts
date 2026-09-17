// Pointer specular on glass surfaces. Writes the pointer position into --mx/--my on the surface
// under the pointer; the CSS draws the highlight from those and fades it on hover. Pointer devices
// only, one document listener (survives view transitions), at most one write per frame.

const SURFACES = '.site-header, .btn.ghost, .apps';

let frame = 0;
let last: PointerEvent | null = null;

function paint() {
  frame = 0;
  const target = last?.target as Element | null;
  const el = target?.closest<HTMLElement>(SURFACES);
  if (!el || !last) return;
  const box = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${last.clientX - box.left}px`);
  el.style.setProperty('--my', `${last.clientY - box.top}px`);
}

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener(
    'pointermove',
    (event) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(paint);
    },
    { passive: true },
  );
}
