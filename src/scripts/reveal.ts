// Scroll reveal and header hairline. Runs once per module, re-inits on every view transition.

window.addEventListener(
  'scroll',
  () => document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 8),
  { passive: true },
);

function init() {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 8);

  const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
}

document.addEventListener('astro:page-load', init);
