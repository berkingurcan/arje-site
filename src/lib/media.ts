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

export const productCategories = ['sconce', 'decor', 'plate'] as const;
export type ProductCategory = (typeof productCategories)[number];

export const products = [
	{ id: 'masa', code: '991', category: 'decor', photo: studio('cream-loop-vase', 'ivory') },
	{ id: 'duvar', code: '971', category: 'sconce', photo: studio('terracotta-sunburst-ring', 'clay') },
	{ id: 'saksi', code: '992', category: 'decor', photo: studio('blue-wall-vase-pink-flowers', 'ivory') },
	{ id: 'kitap', code: '993', category: 'decor', photo: studio('speckled-ceramic-ribbon', 'stone') },
	{ id: 'terracottaFlower', code: '972', category: 'sconce', photo: studio('terracotta-flower', 'clay') },
	{ id: 'purplePlatter', code: '951', category: 'plate', photo: studio('purple-botanical-platter', 'ivory') },
	{ id: 'longLeaf', code: '952', category: 'plate', photo: studio('green-long-leaf', 'sand') },
	{ id: 'polkaDotVase', code: '996', category: 'decor', photo: studio('green-polka-dot-vase', 'pine') },
	{ id: 'bluePlatter', code: '953', category: 'plate', photo: studio('blue-botanical-platter', 'ivory') },
	{ id: 'smallLeaf', code: '954', category: 'plate', photo: studio('green-leaf-small', 'pine') },
	{ id: 'heartLeaf', code: '955', category: 'plate', photo: studio('green-heart-leaf', 'pine') },
	{ id: 'cobaltLeaf', code: '956', category: 'plate', photo: studio('blue-cobalt-leaf', 'stone') },
	{ id: 'speckledWave', code: '973', category: 'sconce', photo: studio('speckled-wave', 'sand') },
	{ id: 'creamLeaf', code: '974', category: 'sconce', photo: studio('leaf-ceramic-dish', 'ivory') }
] as const satisfies readonly { id: string; code: string; category: ProductCategory; photo: MediaItem }[];

export type ProductId = (typeof products)[number]['id'];
export type ProductCode = (typeof products)[number]['code'];

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
