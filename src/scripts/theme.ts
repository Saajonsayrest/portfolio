// Theme toggle. The inline script in Base.astro applies the stored choice before first paint and
// again after every view transition; this module only handles the button and keeps labels in sync.
// A choice that matches the system setting is dropped, so the site follows the system again.

const KEY = 'theme';
const COLOURS = { light: '#ffffff', dark: '#000000' } as const;
type Theme = keyof typeof COLOURS;

const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');
const system = (): Theme => (media.matches ? 'dark' : 'light');
const current = (): Theme => {
  const stored = root.dataset.theme;
  return stored === 'dark' || stored === 'light' ? stored : system();
};

function sync() {
  const theme = current();
  const stored = root.dataset.theme;
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const own: Theme = meta.media.includes('dark') ? 'dark' : 'light';
    meta.content = COLOURS[stored ? theme : own];
  });
}

function set(theme: Theme) {
  try {
    if (theme === system()) {
      localStorage.removeItem(KEY);
      delete root.dataset.theme;
    } else {
      localStorage.setItem(KEY, theme);
      root.dataset.theme = theme;
    }
  } catch {
    root.dataset.theme = theme;
  }
  sync();
}

document.addEventListener('click', (event) => {
  const btn = (event.target as Element | null)?.closest('[data-theme-toggle]');
  if (!btn) return;
  set(current() === 'dark' ? 'light' : 'dark');
});

media.addEventListener('change', sync);
document.addEventListener('astro:page-load', sync);
