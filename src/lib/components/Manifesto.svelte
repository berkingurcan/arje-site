<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="manifesto" class="section manifesto" aria-label={t.manifesto.eyebrow}>
	<div class="container">
		<p class="label rule head reveal" use:reveal>{t.manifesto.eyebrow}</p>

		<ol class="rows">
			{#each t.manifesto.items as item, i (i)}
				<li class="row reveal" use:reveal>
					<span class="no num" aria-hidden="true">0{i + 1}</span>
					<h2 class="word display">
						<span class="rise"><span>{item.word}</span></span>
					</h2>
					<p class="text">{item.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.manifesto {
		padding-top: clamp(3rem, 7vw, 6rem);
	}
	.head {
		margin-bottom: clamp(2rem, 5vw, 4rem);
	}
	.rows {
		border-top: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 1rem;
		row-gap: 0.75rem;
		padding-block: clamp(1.75rem, 4vw, 3rem);
		border-bottom: 1px solid var(--line);
	}
	.no {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		color: var(--accent);
		padding-top: 0.6rem;
		min-width: 1.75rem;
	}
	.word {
		font-size: clamp(3rem, 12.5vw, 6.5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
	}
	.row:nth-child(2) .word {
		font-style: italic;
		font-weight: 400;
	}
	.text {
		grid-column: 2;
		max-width: 26rem;
		color: var(--muted);
		text-wrap: pretty;
	}

	@media (min-width: 64rem) {
		.word {
			font-size: clamp(5rem, 8vw, 9.5rem);
		}
		.row {
			grid-template-columns: 4rem minmax(0, 1fr) minmax(0, 20rem);
			align-items: end;
			column-gap: var(--gutter);
		}
		.no {
			align-self: start;
			padding-top: 1.25rem;
		}
		.text {
			grid-column: 3;
			padding-bottom: 0.9rem;
		}
	}

	@media (min-width: 64rem) {
		.row:nth-child(2) .word {
			padding-left: 8%;
		}
		.row:nth-child(3) .word {
			padding-left: 16%;
		}
	}
</style>
