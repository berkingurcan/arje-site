export type MediaItem = {
	/** Base path for the responsive WebP variants. */
	src: string;
	/** Tone of the placeholder shown while loading / if the image fails. */
	tone: 'ivory' | 'sand' | 'clay' | 'pine' | 'bordeaux' | 'stone';
};

const studio = (name: string, tone: MediaItem['tone']): MediaItem => ({
	src: `/images/products/studio/${name}`,
	tone
});

export const products = [
	{ id: 'masa', photo: studio('cream-loop-vase', 'ivory') },
	{ id: 'duvar', photo: studio('terracotta-sunburst-ring', 'clay') },
	{ id: 'saksi', photo: studio('blue-wall-vase-pink-flowers', 'ivory') },
	{ id: 'kitap', photo: studio('speckled-ceramic-ribbon', 'stone') },
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

const galleryIds: ProductId[] = ['purplePlatter', 'polkaDotVase', 'cobaltLeaf'];
export const gallery = products.filter(({ id }) => galleryIds.includes(id));

export const media = {
	hero: studio('cream-sculptural-vase', 'ivory'),
	approach: studio('blue-wall-vase-yellow-flowers', 'stone'),
	approachDetail: studio('terracotta-flower', 'clay')
};

export function imageSet(src: string) {
	return {
		src: `${src}-1122.webp`,
		srcset: `${src}-640.webp 640w, ${src}-1122.webp 1122w`
	};
}
