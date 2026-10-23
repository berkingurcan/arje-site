<script lang="ts">
	import Media from './Media.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="atelier" class="section atelier field-bordeaux" aria-labelledby="atelier-title">
	<div class="container grid">
		<div class="intro reveal" use:reveal>
			<p class="label rule">{t.atelier.eyebrow}</p>
			<p class="role label">{t.atelier.role}</p>
			<h2 id="atelier-title" class="h2 name">
				<span class="rise"><span>{t.atelier.name}</span></span>
			</h2>
		</div>

		<figure class="portrait reveal" use:reveal style="--d:1">
			<div class="portrait-box">
				<span class="ring" aria-hidden="true"></span>
				<span class="mark"><Monogram draw /></span>
			</div>
			<figcaption class="label">{t.atelier.portraitNote}</figcaption>
		</figure>

		<div class="words">
			<blockquote class="statement reveal" use:reveal>
				<p>{t.atelier.statement}</p>
			</blockquote>
			<p class="body reveal" use:reveal style="--d:1">{t.atelier.body}</p>
			<p class="sign reveal" use:reveal style="--d:2" aria-hidden="true">ARJE · by Mimar Arzu Gürcan</p>

			<figure class="sketch reveal" use:reveal style="--d:2">
				<div class="curtain">
					<Media item={media.atelierSketch} alt={t.alt.sketch} ratio={3 / 2} sizes="(min-width: 64rem) 40vw, 100vw" />
				</div>
				<figcaption class="label">{t.atelier.sketchCaption}</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: clamp(2rem, 5vw, 3rem);
	}
	.role {
		margin-top: clamp(2rem, 5vw, 3rem);
		color: var(--muted);
	}
	.name {
		font-size: clamp(3.25rem, 11vw, 7.5rem);
		margin-top: 0.5rem;
		line-height: 0.95;
	}

	.portrait-box {
		position: relative;
		aspect-ratio: 4 / 5;
		display: grid;
		place-items: center;
		background:
			radial-gradient(90% 70% at 30% 20%, rgb(255 255 255 / 0.06), transparent 60%),
			linear-gradient(170deg, rgb(0 0 0 / 0.08), rgb(0 0 0 / 0.28));
		box-shadow: inset 0 0 0 1px var(--line);
		overflow: hidden;
	}
	.ring {
		position: absolute;
		width: 74%;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 1px solid rgb(243 237 226 / 0.16);
	}
	.mark {
		width: 46%;
		color: var(--arje-ivory);
	}
	.portrait figcaption {
		margin-top: 0.85rem;
		color: var(--muted);
	}

	.statement p {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(1.9rem, 4.2vw, 3.25rem);
		line-height: 1.12;
		color: var(--ink);
		text-wrap: balance;
	}
	.statement p::before {
		content: '';
		display: block;
		width: 2.5rem;
		height: 1px;
		background: var(--accent);
		margin-bottom: 1.5rem;
	}
	.body {
		margin-top: 1.75rem;
		max-width: 34rem;
		color: var(--text);
		font-size: var(--fs-lead);
		line-height: 1.7;
	}
	.sign {
		margin-top: 2rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
	}
	.sketch {
		margin-top: clamp(2.5rem, 6vw, 4rem);
	}
	.sketch figcaption {
		margin-top: 0.85rem;
		color: var(--muted);
	}

	@media (min-width: 48rem) {
		.portrait {
			width: 70%;
		}
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--gutter);
			row-gap: 0;
			align-items: start;
		}
		.intro {
			grid-column: 6 / -1;
			grid-row: 1;
			padding-bottom: clamp(3rem, 5vw, 4.5rem);
		}
		.portrait {
			grid-column: 1 / span 4;
			grid-row: 1 / span 2;
			width: auto;
			position: sticky;
			top: calc(var(--header-h) + 2rem);
		}
		.words {
			grid-column: 6 / -1;
			grid-row: 2;
		}
		.sketch {
			width: 82%;
			margin-left: auto;
		}
	}
</style>
