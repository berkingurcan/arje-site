<script lang="ts">
	import Media from './Media.svelte';
	import Icon from './Icon.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="container grid">
		<div class="copy reveal" use:reveal>
			<p class="label rule eyebrow rise-fade" style="--d:0">{t.hero.eyebrow}</p>

			<h1 id="hero-title" class="display title">
				{#each t.hero.title as line, i (i)}
					<span class="rise line l{i}" style="--i:{i + 1}">
						<span>
							{#if line.em}<em>{line.text}</em>{:else}{line.text}{/if}
						</span>
					</span>{' '}
				{/each}
			</h1>

			<p class="lead rise-fade" style="--d:4">{t.hero.lead}</p>

			<div class="ctas rise-fade" style="--d:5">
				<a class="btn" href="#collection">
					{t.hero.ctaPrimary}
					<Icon name="arrow" class="arrow" />
				</a>
				<a class="link" href="#trade">
					{t.hero.ctaSecondary}
					<Icon name="arrow" class="arrow" />
				</a>
			</div>
		</div>

		<figure class="visual reveal" use:reveal style="--d:2">
			<div class="frame curtain">
				<Media
					item={media.hero}
					alt={t.alt.hero}
					ratio={0.84}
					eager
					sizes="(min-width: 64rem) 50vw, 100vw"
				/>
			</div>
			<figcaption>
				<span class="cap-mark" aria-hidden="true"><Monogram small /></span>
				<span class="cap-text">{t.hero.caption}</span>
			</figcaption>
		</figure>
	</div>

	<a class="cue" href="#manifesto" aria-label={t.hero.scroll}>
		<span class="cue-line" aria-hidden="true"></span>
	</a>
</section>

<style>
	.hero {
		position: relative;
		padding-top: calc(var(--header-h) + env(safe-area-inset-top) + clamp(1.5rem, 5vw, 3rem));
		padding-bottom: clamp(3rem, 8vw, 6rem);
	}

	.grid {
		display: grid;
		gap: 2.75rem;
	}

	.eyebrow {
		margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
	}

	.title {
		font-size: var(--fs-hero);
		line-height: 0.94;
		letter-spacing: -0.025em;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}
	.title em {
		color: var(--ink);
	}
	:global(html[lang='ru']) .title {
		font-size: clamp(2.85rem, 7.6vw, 6.5rem);
	}

	.lead {
		max-width: 30rem;
		color: var(--muted);
		margin-bottom: 2rem;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 2rem;
	}

	/* Copy fades in after the headline rises */
	:global(html.js) .rise-fade {
		opacity: 0;
		transform: translateY(0.75rem);
		transition:
			opacity 900ms var(--ease-out),
			transform 1s var(--ease-out);
		transition-delay: calc(var(--d) * 110ms);
	}
	:global(html.js .is-in) .rise-fade {
		opacity: 1;
		transform: none;
	}

	/* Visual */
	.visual {
		position: relative;
		margin-inline: calc(var(--pad) * -1);
	}
	.frame {
		overflow: hidden;
	}
	figcaption {
		position: absolute;
		left: var(--pad);
		bottom: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.55rem 0.9rem 0.55rem 0.7rem;
		background: rgb(243 237 226 / 0.88);
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		color: #571f2d;
		border-radius: var(--radius);
	}
	.cap-mark {
		width: 1.35rem;
	}
	.cap-text {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		line-height: 1.2;
	}

	/* Gentle scroll-linked drift (progressive enhancement) */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.frame :global(.media) {
				animation: drift linear both;
				animation-timeline: view();
				animation-range: exit 0% exit 100%;
			}
		}
	}
	@keyframes drift {
		to {
			translate: 0 8%;
			scale: 1.06;
		}
	}

	.cue {
		display: none;
	}

	@media (min-width: 48rem) {
		.visual {
			margin-inline: 0;
		}
		figcaption {
			left: 1rem;
		}
		.line.l1 {
			padding-left: 0.9em;
		}
	}

	@media (min-width: 64rem) {
		.hero {
			min-height: min(100svh, 62rem);
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-bottom: clamp(3rem, 6vw, 5rem);
		}
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--gutter);
			align-items: end;
		}
		.copy {
			grid-column: 1 / span 6;
			padding-bottom: 1rem;
			position: relative;
			z-index: 2;
		}
		.visual {
			grid-column: 7 / -1;
		}
		.frame :global(.media) {
			max-height: calc(100svh - var(--header-h) - 6rem);
			min-height: 30rem;
		}
		.cue {
			display: block;
			position: absolute;
			left: var(--pad);
			bottom: 0;
			width: var(--target);
			height: 4.5rem;
			overflow: hidden;
		}
		.cue-line {
			position: absolute;
			left: 50%;
			top: 0;
			width: 1px;
			height: 100%;
			background: var(--line-strong);
		}
		.cue-line::after {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--ink);
			transform-origin: top;
			animation: cue 2.8s var(--ease) 1s 3 both;
		}
	}

	@media (min-width: 64rem) and (max-width: 79.99rem) {
		.title {
			font-size: clamp(3.1rem, 8.4vw, 8.75rem);
		}
	}

	@keyframes cue {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		45% {
			transform: scaleY(1);
			transform-origin: top;
		}
		55% {
			transform: scaleY(1);
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}
</style>
