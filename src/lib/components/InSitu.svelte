<script lang="ts">
	import Media from './Media.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section class="section insitu" aria-labelledby="insitu-title">
	<div class="container">
		<div class="head reveal" use:reveal>
			<p class="label rule">{t.inSitu.eyebrow}</p>
			<h2 id="insitu-title" class="h2"><span class="rise"><span>{t.inSitu.title}</span></span></h2>
		</div>

		<div class="mosaic">
			{#each media.inSitu as item, i (i)}
				<figure class="tile t{i} reveal" use:reveal style="--d:{i}">
					<div class="curtain" style="--d:{i}">
						<Media
							{item}
							alt={t.alt.inSitu[i]}
							ratio={i === 0 ? 4 / 5 : 3 / 4}
							sizes={i === 0 ? '(min-width: 64rem) 58vw, 100vw' : '(min-width: 64rem) 28vw, 50vw'}
						/>
					</div>
					<figcaption>
						<span class="num">0{i + 1}</span>
						<span>{t.inSitu.captions[i]}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.head {
		display: grid;
		gap: 1.25rem;
		max-width: 52rem;
		margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
	}

	.mosaic {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(0.75rem, 2vw, 1.75rem);
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
		display: flex;
		gap: 0.75rem;
		margin-top: 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	figcaption .num {
		color: var(--accent);
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
			margin-top: 0;
		}
		.t2 {
			grid-column: 8 / span 3;
			grid-row: 2;
			align-self: end;
			margin-top: 0;
		}
	}
</style>
