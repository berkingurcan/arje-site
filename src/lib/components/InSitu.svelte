<script lang="ts">
	import Media from './Media.svelte';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="insitu" class="section insitu" aria-labelledby="insitu-title">
	<div class="container">
		<h2 id="insitu-title" class="h2 head">{t.inSitu.title}</h2>

		<div class="mosaic">
			{#each media.inSitu as item, i (i)}
				<figure class="tile t{i}">
					<div>
						<Media
							{item}
							alt={t.alt.inSitu[i]}
							ratio={i === 0 ? 4 / 5 : 3 / 4}
							sizes={i === 0 ? '(min-width: 64rem) 58vw, 100vw' : '(min-width: 64rem) 28vw, 50vw'}
						/>
					</div>
					<figcaption class="label">{t.inSitu.captions[i]}</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.head {
		max-width: 17ch;
		margin-bottom: clamp(2.5rem, 6vw, 5rem);
	}
	:global(html[lang='ru']) .head {
		max-width: 18ch;
	}

	.mosaic {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(0.75rem, 1.6vw, 1.5rem);
	}
	.t0 {
		grid-column: 1 / -1;
		margin-inline: calc(var(--pad) * -1);
	}
	.t0 figcaption {
		padding-inline: var(--pad);
	}
	.t2 {
		margin-top: 3rem;
	}
	figcaption {
		margin-top: 0.7rem;
	}

	@media (min-width: 48rem) {
		.t0 {
			margin-inline: 0;
		}
		.t0 figcaption {
			padding-inline: 0;
		}
		.t0 :global(.media) {
			aspect-ratio: 16 / 10 !important;
		}
	}

	@media (min-width: 64rem) {
		.mosaic {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			align-items: start;
		}
		.t0 {
			grid-column: 1 / span 7;
			grid-row: 1 / span 2;
		}
		.t0 :global(.media) {
			aspect-ratio: 4 / 5 !important;
		}
		.t1 {
			grid-column: 9 / -1;
			grid-row: 1;
		}
		.t2 {
			grid-column: 8 / span 3;
			grid-row: 2;
			align-self: end;
			margin-top: 0;
		}
	}
</style>
