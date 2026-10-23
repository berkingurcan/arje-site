<script lang="ts">
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();
</script>

<section id="manifesto" class="section manifesto" aria-labelledby="manifesto-title">
	<div class="container">
		<h2 id="manifesto-title" class="sr-only">{t.manifesto.eyebrow}</h2>
		<ul class="cols">
			{#each t.manifesto.items as item, i (i)}
				<li class="col">
					<h3 class="word display">{item.word}</h3>
					<p class="text">{item.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.manifesto {
		padding-top: clamp(4rem, 9vw, 8rem);
		border-top: 1px solid var(--line);
	}
	.cols {
		display: grid;
		gap: clamp(2.5rem, 6vw, 3.5rem);
	}
	.word {
		overflow-wrap: normal;
		font-size: clamp(3.4rem, 15vw, 5rem);
		line-height: 0.95;
		margin-bottom: 1.1rem;
	}
	.text {
		max-width: 22rem;
		color: var(--muted);
		text-wrap: pretty;
	}

	@media (min-width: 48rem) {
		.cols {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			column-gap: var(--gutter);
		}
		.word {
			font-size: clamp(2.6rem, 5.5vw, 7rem);
			margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
		}
		.col + .col {
			padding-left: var(--gutter);
			border-left: 1px solid var(--line);
		}
	}
	:global(html[lang='ru']) .word {
		font-size: clamp(2.3rem, 4.6vw, 5.75rem);
	}
</style>
