import type { Handle } from '@sveltejs/kit';
import { toLocale } from '$lib/i18n';

// Sets <html lang> per language version (also applies at prerender time).
export const handle: Handle = ({ event, resolve }) => {
	const lang = toLocale(event.params.lang);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
