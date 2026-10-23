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
	hero: { src: 'photo-1601993957728-1e56ab70c5a8', tone: 'stone', focus: '50% 60%' },
	objects: [
		{ src: 'photo-1612196808214-b8e1d6145a8c', tone: 'sand' },
		{ src: 'photo-1660721671073-e139688fa3cf', tone: 'ivory' },
		{ src: 'photo-1537948756265-406a522f1a45', tone: 'clay' },
		{ src: 'photo-1631125915902-d8abe9225ff2', tone: 'stone' },
		{ src: 'photo-1638303322580-5e6aacd59c0d', tone: 'sand' }
	],
	approach: { src: 'photo-1759507058804-cc729b38d1ed', tone: 'stone' },
	approachDetail: { src: 'photo-1597696929736-6d13bed8e6a8', tone: 'clay' },
	atelierSketch: { src: 'photo-1503387762-592deb58ef4e', tone: 'ivory' },
	inSitu: [
		{ src: 'photo-1583847268964-b28dc8f51f92', tone: 'sand' },
		{ src: 'photo-1758974782657-e5ada4b01c3c', tone: 'clay' },
		{ src: 'photo-1667312939978-64cf31718a6e', tone: 'stone' }
	]
} satisfies Record<string, MediaItem | MediaItem[]>;

const WIDTHS = [480, 720, 960, 1280, 1680, 2200];

/** Build src / srcset for a media item at a given aspect ratio (w/h). */
export function imageSet(src: string, ratio: number) {
	if (src.startsWith('/')) return { src, srcset: undefined };
	const url = (w: number) =>
		`https://images.unsplash.com/${src}?w=${w}&h=${Math.round(w / ratio)}&fit=crop&auto=format&q=72`;
	return {
		src: url(1280),
		srcset: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ')
	};
}
