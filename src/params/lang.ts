import type { ParamMatcher } from '@sveltejs/kit';

// Turkish lives at the root ("/"); English and Russian get a prefix.
export const match: ParamMatcher = (param) => param === 'en' || param === 'ru';
