// Theme toggle. Dark is the default. The inline script in Base.astro applies a stored light
// choice before first paint and again after every view transition; this module only handles the
// button and keeps labels in sync. Choosing dark clears the key, so dark never needs storing.

const KEY = 'theme';
const COLOURS = { light: '#ffffff', dark: '#0a0a0a' } as const;
type Theme = keyof typeof COLOURS;

const root = document.documentElement;
const current = (): Theme => (root.dataset.theme === 'light' ? 'light' : 'dark');

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
    if (theme === 'light') localStorage.setItem(KEY, theme);
    else localStorage.removeItem(KEY);
  } catch {}
  if (theme === 'light') root.dataset.theme = theme;
  else delete root.dataset.theme;
  sync();
}

document.addEventListener('click', (event) => {
  const btn = (event.target as Element | null)?.closest('[data-theme-toggle]');
  if (!btn) return;
  set(current() === 'dark' ? 'light' : 'dark');
});

document.addEventListener('astro:page-load', sync);
