/**
 * Site-wide settings. Replace the placeholders below before launch.
 */
export const site = {
	/** Production URL, used for canonical links, hreflang and social cards. */
	url: 'https://arje.vercel.app',

	/**
	 * PLACEHOLDER — replace with the verified ARJE address.
	 * Used in the footer and as the mail fallback for the trade enquiry form.
	 */
	email: 'info@arje.com.tr',

	/**
	 * Optional form endpoint (Formspree, Basin, a Vercel function, a Make/Zapier
	 * webhook…). When set, the trade enquiry form POSTs JSON here. When empty,
	 * the form opens the visitor's email app pre-filled, addressed to `email`.
	 */
	formEndpoint: '',

	/**
	 * Social profiles shown in the footer, in this order.
	 * PLACEHOLDERS — replace each `url` with the real ARJE profile link.
	 * Remove an entry to hide it.
	 */
	social: [
		{ name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
		{ name: 'Pinterest', icon: 'pinterest', url: 'https://www.pinterest.com/' },
		{ name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/' }
	] as { name: string; icon: 'instagram' | 'pinterest' | 'linkedin'; url: string }[],

	year: 2026
};
