<script lang="ts">
	import Media from './Media.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section class="hero reveal" use:reveal aria-labelledby="hero-title">
	<div class="container grid12 layout">
		<span class="line-mark" aria-hidden="true"><Monogram hairline draw /></span>

		<h1 id="hero-title" class="display title">
			{#each t.hero.title as line, i (i)}
				<span class="rise l{i}" style="--i:{i}">
					<span>{line.text}</span>
				</span>{' '}
			{/each}
		</h1>

		<div class="intro fade">
			<p class="lead">{t.hero.lead}</p>
			<div class="ctas">
				<a class="btn" href="#collection">{t.hero.ctaPrimary}</a>
				<a class="link" href="#trade">{t.hero.ctaSecondary}</a>
			</div>
		</div>

		<figure class="visual fade">
			<Media
				item={media.hero}
				alt={t.alt.hero}
				ratio={3 / 4}
				eager
				sizes="(min-width: 64rem) 34vw, 100vw"
			/>
			<figcaption class="label">{t.hero.caption}</figcaption>
		</figure>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding-top: calc(var(--header-h) + env(safe-area-inset-top) + clamp(2rem, 6vw, 3.5rem));
		padding-bottom: clamp(3.5rem, 8vw, 6rem);
		overflow: clip;
	}

	.layout {
		position: relative;
		row-gap: 2.5rem;
	}
	.layout > * {
		grid-column: 1 / -1;
	}

	/* The continuous-line symbol, drawn once as a brass hairline. */
	.line-mark {
		position: absolute;
		z-index: 0;
		top: -6%;
		right: -18%;
		width: 92%;
		color: var(--accent);
		opacity: 0.85;
		pointer-events: none;
	}

	.title {
		position: relative;
		z-index: 1;
		font-size: var(--fs-hero);
		line-height: 0.9;
		letter-spacing: -0.02em;
	}
	.title .l1 {
		padding-left: 0.62em;
	}
	@media (max-width: 47.99rem) {
		.title {
			font-size: 16.5vw;
		}
	}
	:global(html[lang='ru']) .title {
		font-size: clamp(2.9rem, 8.6vw, 8.4rem);
	}
	@media (max-width: 47.99rem) {
		:global(html[lang='ru']) .title {
			font-size: 12vw;
		}
	}

	.intro {
		position: relative;
		z-index: 1;
		display: grid;
		gap: 1.75rem;
	}
	.lead {
		max-width: 26rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1.75rem;
	}

	.visual {
		position: relative;
		z-index: 1;
		margin-inline: calc(var(--pad) * -1);
	}
	.visual figcaption {
		margin-top: 0.75rem;
		padding-inline: var(--pad);
	}

	/* Copy and image settle in after the headline lines rise. */
	:global(html.js) .fade {
		opacity: 0;
		transition: opacity 1.1s var(--ease) 0.75s;
	}
	:global(html.js .is-in) .fade {
		opacity: 1;
	}

	@media (min-width: 48rem) {
		.visual {
			margin-inline: 0;
		}
		.visual figcaption {
			padding-inline: 0;
		}
	}

	@media (min-width: 64rem) {
		.hero {
			min-height: min(100svh, 64rem);
			display: flex;
			align-items: center;
		}
		.layout {
			grid-template-rows: auto 1fr;
			row-gap: clamp(2.5rem, 5vw, 4.5rem);
			align-items: end;
		}
		.title {
			grid-column: 1 / span 9;
			grid-row: 1;
			align-self: start;
		}
		.intro {
			grid-column: 1 / span 4;
			grid-row: 2;
			align-self: end;
		}
		.visual {
			grid-column: 9 / -1;
			grid-row: 1 / span 2;
			align-self: end;
		}
		.line-mark {
			top: -4%;
			left: 26%;
			right: auto;
			width: 54%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html.js) .fade {
			opacity: 1;
			transition: none;
		}
	}
</style>
