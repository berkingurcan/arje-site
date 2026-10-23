export type Theme = 'light' | 'dark';

const THEME_COLOR: Record<Theme, string> = { light: '#EEEAE3', dark: '#2A0E16' };

export const theme = $state<{ value: Theme }>({ value: 'light' });

export function syncTheme() {
	theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Switch theme; when supported, reveal the new palette in a circle from the control. */
export function setTheme(next: Theme, origin?: HTMLElement | null) {
	const root = document.documentElement;
	const apply = () => {
		root.dataset.theme = next;
		theme.value = next;
		try {
			localStorage.setItem('arje-theme', next);
		} catch {
			/* storage unavailable — theme still applies for this visit */
		}
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
	};

	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!('startViewTransition' in document) || reduce) return apply();

	if (origin) {
		const r = origin.getBoundingClientRect();
		const x = r.left + r.width / 2;
		const y = r.top + r.height / 2;
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
		root.style.setProperty('--vt-x', `${x}px`);
		root.style.setProperty('--vt-y', `${y}px`);
		root.style.setProperty('--vt-r', `${radius}px`);
	}
	root.classList.add('theme-vt');
	const t = document.startViewTransition(apply);
	t.finished.finally(() => root.classList.remove('theme-vt'));
}

export function toggleTheme(origin?: HTMLElement | null) {
	setTheme(theme.value === 'dark' ? 'light' : 'dark', origin);
}
