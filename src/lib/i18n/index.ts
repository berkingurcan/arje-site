import tr from './tr';
import en from './en';
import ru from './ru';
import type { Dict } from './tr';

export type { Dict };
export const locales = ['tr', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const dictionaries: Record<Locale, Dict> = { tr, en, ru };

export const localeInfo: Record<Locale, { short: string; label: string; path: string; hreflang: string }> = {
	tr: { short: 'TR', label: 'Türkçe', path: '/', hreflang: 'tr' },
	en: { short: 'EN', label: 'English', path: '/en', hreflang: 'en' },
	ru: { short: 'RU', label: 'Русский', path: '/ru', hreflang: 'ru' }
};

export function toLocale(param: string | undefined): Locale {
	return param === 'en' || param === 'ru' ? param : defaultLocale;
}
