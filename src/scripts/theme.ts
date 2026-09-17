// Theme toggle. Light is the default. The inline script in Base.astro applies a stored dark
// choice before first paint and again after every view transition; this module only handles the
// button and keeps labels in sync. Choosing light clears the key, so light never needs storing.

const KEY = 'theme';
const COLOURS = { light: '#ffffff', dark: '#000000' } as const;
type Theme = keyof typeof COLOURS;

const root = document.documentElement;
const current = (): Theme => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function sync() {
  const theme = current();
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = COLOURS[theme];
  });
}

function set(theme: Theme) {
  try {
    if (theme === 'dark') localStorage.setItem(KEY, theme);
    else localStorage.removeItem(KEY);
  } catch {}
  if (theme === 'dark') root.dataset.theme = theme;
  else delete root.dataset.theme;
  sync();
}

document.addEventListener('click', (event) => {
  const btn = (event.target as Element | null)?.closest('[data-theme-toggle]');
  if (!btn) return;
  set(current() === 'dark' ? 'light' : 'dark');
});

document.addEventListener('astro:page-load', sync);
