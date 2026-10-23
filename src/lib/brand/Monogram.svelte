<script lang="ts">
	/**
	 * ARJE continuous-line A·J monogram (geometry from the brand handoff).
	 * `small` uses the heavier optical stroke for small sizes.
	 * `draw` traces the line once when it scrolls into view.
	 */
	let {
		small = false,
		draw = false,
		decorative = true,
		class: klass = ''
	}: { small?: boolean; draw?: boolean; decorative?: boolean; class?: string } = $props();
</script>

<svg
	class="monogram {klass}"
	class:draw
	viewBox="20 22 164 148"
	xmlns="http://www.w3.org/2000/svg"
	role={decorative ? undefined : 'img'}
	aria-hidden={decorative ? 'true' : undefined}
	aria-label={decorative ? undefined : 'ARJE'}
	focusable="false"
>
	<path
		pathLength="1"
		d="M28 153 L70 34 Q72 28 74 35 L105 133 C112 159 129 164 147 160 Q175 154 176 122 L176 111 M151 111 H176"
		fill="none"
		stroke="currentColor"
		stroke-width={small ? 5.5 : 3.8}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>

<style>
	.monogram {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
	:global(html.js) .draw path {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		transition: stroke-dashoffset 2.4s cubic-bezier(0.65, 0, 0.35, 1) 0.2s;
	}
	:global(html.js .is-in) .draw path,
	:global(html.js) .draw:global(.is-in) path {
		stroke-dashoffset: 0;
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html.js) .draw path {
			stroke-dashoffset: 0;
			transition: none;
		}
	}
</style>
