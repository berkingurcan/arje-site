/**
 * Temporary imagery from Unsplash (https://unsplash.com/license).
 * When ARJE product photography is ready, replace `src` with a local file
 * (e.g. '/images/form-i.jpg' placed in /static/images) — every slot keeps
 * a designed placeholder underneath, so nothing breaks while images load.
 */
export type MediaItem = {
	/** Unsplash photo id ("photo-…") or a local path starting with "/". */
	src: string;
	/** Tone of the placeholder shown while loading / if the image fails. */
	tone: 'ivory' | 'sand' | 'clay' | 'pine' | 'bordeaux' | 'stone';
	/** Focal point for object-position. */
	focus?: string;
};

export const media = {
	/** ARJE product photography (static/images/products, generated from assets/products). */
	hero: { src: '/images/products/duvar', tone: 'clay', focus: '50% 45%' },
	/** Same order as `collection.items` in each language file. */
	objects: [
		{ src: '/images/products/masa', tone: 'stone', focus: '50% 55%' },
		{ src: '/images/products/duvar', tone: 'clay', focus: '50% 45%' },
		{ src: '/images/products/renko', tone: 'sand', focus: '50% 50%' },
		{ src: '/images/products/saksi', tone: 'ivory', focus: '50% 45%' },
		{ src: '/images/products/kitap', tone: 'ivory', focus: '55% 70%' },
		{ src: '/images/products/bahce', tone: 'stone', focus: '50% 60%' }
	],
	approach: { src: 'photo-1759507058804-cc729b38d1ed', tone: 'stone' },
	approachDetail: { src: 'photo-1597696929736-6d13bed8e6a8', tone: 'clay' },
	inSitu: [
		{ src: 'photo-1583847268964-b28dc8f51f92', tone: 'sand' },
		{ src: 'photo-1758974782657-e5ada4b01c3c', tone: 'clay' },
		{ src: 'photo-1667312939978-64cf31718a6e', tone: 'stone' }
	]
} satisfies Record<string, MediaItem | MediaItem[]>;

const WIDTHS = [480, 720, 960, 1280, 1680, 2200];

const LOCAL_WIDTHS = [640, 1000, 1400];

/** True for ARJE's own photography (as opposed to temporary stock imagery). */
export const isOwn = (src: string) => src.startsWith('/');

/** Build src / srcset for a media item at a given aspect ratio (w/h). */
export function imageSet(src: string, ratio: number) {
	// Local path without an extension → responsive WebP set: name-640/1000/1400.webp
	if (src.startsWith('/') && !/\.[a-z0-9]+$/i.test(src)) {
		return {
			src: `${src}-1000.webp`,
			srcset: LOCAL_WIDTHS.map((w) => `${src}-${w}.webp ${w}w`).join(', ')
		};
	}
	if (src.startsWith('/')) return { src, srcset: undefined };
	const url = (w: number) =>
		`https://images.unsplash.com/${src}?w=${w}&h=${Math.round(w / ratio)}&fit=crop&auto=format&q=72`;
	return {
		src: url(1280),
		srcset: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ')
	};
}
