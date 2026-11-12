export type MediaItem = {
	/** Unsplash photo id ("photo-…") or a local path starting with "/". */
	src: string;
	/** Tone of the placeholder shown while loading / if the image fails. */
	tone: 'ivory' | 'sand' | 'clay' | 'pine' | 'bordeaux' | 'stone';
	/** Focal point for object-position. */
	focus?: string;
	/** Widths of local WebP variants. The second width is the fallback. */
	widths?: readonly [number, number, ...number[]];
};

const studio = (name: string, tone: MediaItem['tone']): MediaItem => ({
	src: `/images/products/studio/${name}`,
	tone,
	widths: [640, 1122]
});

export const products = [
	{ id: 'masa', photo: studio('cream-loop-vase', 'ivory') },
	{ id: 'duvar', photo: studio('terracotta-sunburst-ring', 'clay') },
	{ id: 'renko', photo: { src: '/images/products/renko', tone: 'sand', focus: '50% 50%' } },
	{ id: 'saksi', photo: studio('blue-wall-vase-pink-flowers', 'ivory') },
	{ id: 'kitap', photo: studio('speckled-ceramic-ribbon', 'stone') },
	{ id: 'bahce', photo: { src: '/images/products/bahce', tone: 'stone', focus: '50% 60%' } },
	{ id: 'smallLeaf', photo: studio('green-leaf-small', 'pine') },
	{ id: 'heartLeaf', photo: studio('green-heart-leaf', 'pine') },
	{ id: 'terracottaFlower', photo: studio('terracotta-flower', 'clay') },
	{ id: 'purplePlatter', photo: studio('purple-botanical-platter', 'ivory') },
	{ id: 'longLeaf', photo: studio('green-long-leaf', 'sand') },
	{ id: 'polkaDotVase', photo: studio('green-polka-dot-vase', 'pine') },
	{ id: 'cobaltLeaf', photo: studio('blue-cobalt-leaf', 'stone') },
	{ id: 'bluePlatter', photo: studio('blue-botanical-platter', 'ivory') },
	{ id: 'speckledWave', photo: studio('speckled-wave', 'sand') },
	{ id: 'creamLeaf', photo: studio('leaf-ceramic-dish', 'ivory') }
] as const satisfies readonly { id: string; photo: MediaItem }[];

export type ProductId = (typeof products)[number]['id'];

export const media = {
	hero: studio('cream-sculptural-vase', 'ivory'),
	approach: studio('blue-wall-vase-yellow-flowers', 'stone'),
	approachDetail: studio('purple-botanical-platter', 'ivory'),
	inSitu: [
		{ src: 'photo-1583847268964-b28dc8f51f92', tone: 'sand' },
		{ src: 'photo-1758974782657-e5ada4b01c3c', tone: 'clay' },
		{ src: 'photo-1667312939978-64cf31718a6e', tone: 'stone' }
	]
} satisfies Record<string, MediaItem | MediaItem[]>;

const WIDTHS = [480, 720, 960, 1280, 1680, 2200];

const LOCAL_WIDTHS = [640, 1000, 1400] as const;

/** Build src / srcset for a media item at a given aspect ratio (w/h). */
export function imageSet({ src, widths = LOCAL_WIDTHS }: MediaItem, ratio: number) {
	// A local path without an extension points to width-suffixed WebP variants.
	if (src.startsWith('/') && !/\.[a-z0-9]+$/i.test(src)) {
		return {
			src: `${src}-${widths[1]}.webp`,
			srcset: widths.map((w) => `${src}-${w}.webp ${w}w`).join(', ')
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
