import type { Action } from 'svelte/action';

let observer: IntersectionObserver | undefined;

function getObserver() {
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add('is-in');
						observer!.unobserve(e.target);
					}
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
		);
	}
	return observer;
}

/** Adds `.is-in` once the element enters the viewport. Pair with `.reveal` / `.curtain`. */
export const reveal: Action<HTMLElement> = (node) => {
	const io = getObserver();
	io.observe(node);
	return {
		destroy() {
			io.unobserve(node);
		}
	};
};
