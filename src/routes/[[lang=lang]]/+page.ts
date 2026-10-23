import { toLocale } from '$lib/i18n';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({ locale: toLocale(params.lang) });
