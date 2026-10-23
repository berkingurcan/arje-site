<script lang="ts">
	import Media from './Media.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="approach" class="section approach" aria-labelledby="approach-title">
	<div class="container grid">
		<div class="copy">
			<div class="sticky">
				<div class="reveal" use:reveal>
					<p class="label rule">{t.approach.eyebrow}</p>
					<h2 id="approach-title" class="h2 title">
						{#each t.approach.title as line, i (i)}
							<span class="rise" style="--i:{i}">
								<span>{#if line.em}<em>{line.text}</em>{:else}{line.text}{/if}</span>
							</span>{' '}
						{/each}
					</h2>
				</div>
				<p class="lead reveal" use:reveal style="--d:2">{t.approach.lead}</p>
			</div>
		</div>

		<div class="visuals">
			<figure class="main reveal" use:reveal>
				<div class="curtain">
					<Media item={media.approach} alt={t.alt.approach} ratio={4 / 5} sizes="(min-width: 64rem) 45vw, 100vw" />
				</div>
				<figcaption class="label">{t.approach.caption}</figcaption>
			</figure>
			<figure class="detail reveal" use:reveal style="--d:3">
				<div class="curtain" style="--d:3">
					<Media item={media.approachDetail} alt={t.alt.approachDetail} ratio={3 / 4} sizes="(min-width: 64rem) 20vw, 45vw" />
				</div>
			</figure>
		</div>

		<ol class="pillars">
			{#each t.approach.pillars as p, i (i)}
				<li class="reveal" use:reveal style="--d:{i}">
					<span class="p-no num" aria-hidden="true">0{i + 1}</span>
					<h3 class="p-title">{p.title}</h3>
					<p class="p-text">{p.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: clamp(2.5rem, 6vw, 4rem);
	}
	.title {
		margin-top: 1.25rem;
	}
	.lead {
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		color: var(--muted);
	}

	.visuals {
		position: relative;
		padding-bottom: 3.5rem;
	}
	.main {
		margin-inline: calc(var(--pad) * -1) 18%;
	}
	.main figcaption {
		margin-top: 0.85rem;
		padding-left: var(--pad);
		color: var(--muted);
	}
	.detail {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 44%;
		box-shadow: 0 0 0 clamp(6px, 1vw, 10px) var(--bg);
	}

	.pillars {
		display: grid;
		border-top: 1px solid var(--line);
	}
	.pillars li {
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		column-gap: 1rem;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--line);
	}
	.p-no {
		grid-row: span 2;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		color: var(--accent);
		padding-top: 0.55rem;
	}
	.p-title {
		font-family: var(--font-display);
		font-weight: 450;
		font-size: var(--fs-h3);
		line-height: 1.1;
		color: var(--ink);
	}
	.p-text {
		margin-top: 0.4rem;
		color: var(--muted);
		max-width: 22rem;
	}

	@media (min-width: 48rem) {
		.main {
			margin-inline: 0 22%;
		}
		.main figcaption {
			padding-left: 0;
		}
		.detail {
			width: 36%;
		}
		.pillars {
			grid-template-columns: repeat(3, 1fr);
			column-gap: var(--gutter);
			border-top: 0;
		}
		.pillars li {
			display: block;
			border-bottom: 0;
			border-top: 1px solid var(--line-strong);
			padding-top: 1.25rem;
		}
		.p-no {
			display: block;
			padding: 0 0 1.5rem;
		}
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--gutter);
			row-gap: clamp(4rem, 8vw, 7rem);
		}
		.copy {
			grid-column: 1 / span 5;
		}
		.title {
			font-size: clamp(2.75rem, 4.3vw, 4.5rem);
		}
		.sticky {
			position: sticky;
			top: calc(var(--header-h) + 3rem);
		}
		.visuals {
			grid-column: 7 / -1;
			padding-bottom: 6rem;
		}
		.pillars {
			grid-column: 1 / -1;
		}
	}
</style>
