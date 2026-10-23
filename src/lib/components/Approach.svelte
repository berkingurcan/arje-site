<script lang="ts">
	import Media from './Media.svelte';
	import { media } from '$lib/media';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="approach" class="section approach" aria-labelledby="approach-title">
	<div class="container grid12 layout">
		<div class="copy">
			<div class="sticky">
				<h2 id="approach-title" class="h2 title">
					{#each t.approach.title as line, i (i)}
						<span class="line l{i}">{line.text}</span>{' '}
					{/each}
				</h2>
				<p class="lead">{t.approach.lead}</p>
			</div>
		</div>

		<div class="visuals">
			<figure class="main">
				<Media item={media.approach} alt={t.alt.approach} ratio={4 / 5} sizes="(min-width: 64rem) 40vw, 100vw" />
				<figcaption class="label">{t.approach.caption}</figcaption>
			</figure>
			<figure class="detail">
				<Media item={media.approachDetail} alt={t.alt.approachDetail} ratio={3 / 4} sizes="(min-width: 64rem) 18vw, 45vw" />
			</figure>
		</div>

		<ul class="pillars">
			{#each t.approach.pillars as p, i (i)}
				<li>
					<h3 class="p-title">{p.title}</h3>
					<p class="p-text">{p.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.layout {
		row-gap: clamp(3rem, 7vw, 4.5rem);
	}
	.layout > * {
		grid-column: 1 / -1;
	}
	.title .line {
		display: block;
	}
	.lead {
		margin-top: clamp(1.75rem, 3vw, 2.5rem);
		color: var(--muted);
		max-width: 30rem;
	}

	.visuals {
		position: relative;
		padding-bottom: 4rem;
	}
	.main {
		margin-inline: calc(var(--pad) * -1) 20%;
	}
	.main figcaption {
		margin-top: 0.75rem;
		padding-left: var(--pad);
	}
	.detail {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 42%;
		outline: clamp(6px, 0.8vw, 10px) solid var(--bg);
	}

	.pillars {
		display: grid;
		gap: 2rem;
	}
	.pillars li {
		padding-top: 1.25rem;
		border-top: 1px solid var(--line-strong);
	}
	.p-title {
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: var(--fs-h3);
		line-height: 1.1;
		color: var(--ink);
	}
	.p-text {
		margin-top: 0.5rem;
		color: var(--muted);
		max-width: 22rem;
	}

	@media (min-width: 48rem) {
		.main {
			margin-inline: 0 24%;
		}
		.main figcaption {
			padding-left: 0;
		}
		.detail {
			width: 36%;
		}
		.pillars {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			column-gap: var(--gutter);
		}
	}

	@media (min-width: 64rem) {
		.layout {
			row-gap: clamp(5rem, 9vw, 8rem);
		}
		.copy {
			grid-column: 1 / span 6;
		}
		.title {
			font-size: clamp(3rem, 4.9vw, 5.25rem);
		}
		.sticky {
			position: sticky;
			top: calc(var(--header-h) + 3rem);
		}
		.visuals {
			grid-column: 8 / -1;
			padding-bottom: 6rem;
		}
	}
</style>
