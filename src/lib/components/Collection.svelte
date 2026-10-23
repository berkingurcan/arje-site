<script lang="ts">
	import { onMount } from 'svelte';
	import Media from './Media.svelte';
	import Icon from './Icon.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { media, isOwn } from '$lib/media';
	import { enquiry } from '$lib/enquiry.svelte';
	import type { Dict } from '$lib/i18n';

	let { t }: { t: Dict } = $props();

	let track: HTMLUListElement | undefined = $state();
	let progress = $state(0);
	let visible = $state(0.3);
	let atStart = $state(true);
	let atEnd = $state(false);

	function measure() {
		if (!track) return;
		const max = track.scrollWidth - track.clientWidth;
		visible = Math.min(1, track.clientWidth / track.scrollWidth);
		progress = max > 0 ? track.scrollLeft / max : 0;
		atStart = track.scrollLeft < 4;
		atEnd = track.scrollLeft > max - 4;
	}

	onMount(() => {
		measure();
		const ro = new ResizeObserver(measure);
		if (track) ro.observe(track);
		return () => ro.disconnect();
	});

	function step(dir: 1 | -1) {
		if (!track) return;
		const card = track.querySelector('li');
		const w = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '0') : 300;
		track.scrollBy({ left: dir * w, behavior: 'smooth' });
	}

	function ask(name: string) {
		enquiry.object = name;
	}
</script>

<section id="collection" class="section collection" aria-labelledby="collection-title">
	<div class="container head">
		<h2 id="collection-title" class="h2">{t.collection.title}</h2>
		<div class="head-side">
			<p class="note">{t.collection.note}</p>
			<div class="arrows">
				<button type="button" class="arrow-btn" onclick={() => step(-1)} disabled={atStart} aria-label={t.a11y.prev}>
					<Icon name="arrow-left" />
				</button>
				<button type="button" class="arrow-btn" onclick={() => step(1)} disabled={atEnd} aria-label={t.a11y.next}>
					<Icon name="arrow" />
				</button>
			</div>
		</div>
	</div>

	<ul class="track" bind:this={track} onscroll={measure} aria-label={t.collection.title}>
		{#each t.collection.items as item, i (i)}
			{@const label = `${item.type}, ${item.name}`}
			{@const own = isOwn(media.objects[i].src)}
			<li class="card">
				<article aria-labelledby="obj-{i}">
					<div class="card-media">
						<Media
							item={media.objects[i]}
							alt={own ? label : `${label} (${t.collection.representative})`}
							ratio={4 / 5}
							sizes="(min-width: 64rem) 28vw, (min-width: 48rem) 45vw, 80vw"
							tag={own ? '' : t.collection.representative}
						/>
					</div>
					<div class="card-body">
						<h3 id="obj-{i}" class="name">{item.name}</h3>
						<p class="type">{item.type}</p>
						<p class="status">{t.collection.status}</p>
						<a class="req" href="#trade" onclick={() => ask(`${item.type} — ${item.name}`)}>
							{t.collection.request}<span class="sr-only">: {label}</span>
						</a>
					</div>
				</article>
			</li>
		{/each}
		<li class="card end">
			<div class="end-box field-bordeaux">
				<span class="end-mark" aria-hidden="true"><Monogram /></span>
				<div>
					<h3 class="end-title">{t.collection.endTitle}</h3>
					<p class="end-text">{t.collection.endText}</p>
					<a class="btn btn-sm" href="#trade" onclick={() => ask('')}>{t.collection.endCta}</a>
				</div>
			</div>
		</li>
	</ul>

	<div class="container foot" aria-hidden="true">
		<div class="bar">
			<span style:width="{visible * 100}%" style:left="{progress * (1 - visible) * 100}%"></span>
		</div>
		<p class="swipe">{t.collection.swipe}</p>
	</div>
</section>

<style>
	.collection {
		background: var(--bg-alt);
	}
	.head {
		display: grid;
		gap: 1.5rem;
		margin-bottom: clamp(2.25rem, 5vw, 3.75rem);
	}
	.note {
		max-width: 24rem;
		color: var(--muted);
		font-size: var(--fs-small);
		line-height: 1.6;
	}
	.arrows {
		display: none;
		gap: 0.5rem;
	}
	.arrow-btn {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		color: var(--ink);
		box-shadow: inset 0 0 0 1px var(--line-strong);
		transition:
			background-color var(--fast) var(--ease),
			color var(--fast) var(--ease),
			opacity var(--fast) var(--ease);
	}
	.arrow-btn :global(.icon) {
		width: 1.1rem;
	}
	.arrow-btn:hover:not(:disabled) {
		background: var(--ink);
		color: var(--bg);
	}
	.arrow-btn:disabled {
		opacity: 0.3;
		cursor: default;
	}

	/* Scroll-snap track, aligned to the container edge */
	.track {
		--inset: max(var(--pad), (100% - var(--max)) / 2);
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(78vw, 22rem);
		column-gap: clamp(0.875rem, 1.6vw, 1.5rem);
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: var(--inset);
		padding-inline: var(--inset);
		padding-bottom: 0.5rem;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}
	.track::-webkit-scrollbar {
		display: none;
	}
	.card {
		position: relative;
		scroll-snap-align: start;
	}
	.card-media :global(.media img) {
		transition:
			opacity 900ms var(--ease),
			transform 1.4s var(--ease-out);
	}
	.card:hover .card-media :global(.media[data-status='loaded'] img) {
		transform: scale(1.025);
	}
	.card-body {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		column-gap: 1rem;
		row-gap: 0.15rem;
		padding-top: 1rem;
	}
	.name {
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: clamp(1.75rem, 2.2vw, 2.1rem);
		line-height: 1.1;
		color: var(--ink);
	}
	.type {
		font-size: var(--fs-small);
		color: var(--muted);
		text-align: right;
	}
	.status {
		font-size: var(--fs-small);
		color: var(--muted);
	}
	.req {
		justify-self: end;
		display: inline-flex;
		align-items: center;
		min-height: var(--target);
		font-size: var(--fs-small);
		font-weight: 500;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.35em;
		text-decoration-color: var(--line-strong);
		white-space: nowrap;
		transition: text-decoration-color var(--fast) var(--ease);
	}
	.req:hover {
		text-decoration-color: currentColor;
	}

	.end-box {
		aspect-ratio: 4 / 5;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(1.5rem, 2.6vw, 2.25rem);
	}
	.end-mark {
		width: 3.75rem;
		color: var(--accent);
	}
	.end-title {
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: clamp(2.1rem, 3vw, 2.9rem);
		line-height: 1;
		color: var(--ink);
		margin-bottom: 0.85rem;
	}
	.end-text {
		color: var(--muted);
		margin-bottom: 1.5rem;
		max-width: 17rem;
	}

	.foot {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-top: clamp(1.75rem, 3vw, 2.5rem);
	}
	.bar {
		position: relative;
		flex: 1;
		height: 1px;
		background: var(--line);
	}
	.bar span {
		position: absolute;
		top: -0.5px;
		height: 2px;
		background: var(--ink);
		transition: left 120ms linear;
	}
	.swipe {
		font-size: var(--fs-meta);
		color: var(--muted);
		white-space: nowrap;
	}

	@media (min-width: 48rem) {
		.track {
			grid-auto-columns: min(44vw, 24rem);
		}
		.head {
			grid-template-columns: 1fr auto;
			align-items: end;
			column-gap: 3rem;
		}
		.head-side {
			display: flex;
			align-items: end;
			gap: 2.5rem;
		}
		.arrows {
			display: flex;
		}
		.swipe {
			display: none;
		}
	}

	@media (min-width: 64rem) {
		.track {
			grid-auto-columns: calc((min(100vw - 2 * var(--pad), var(--max)) - 2 * 1.5rem) / 3.3);
		}
	}
</style>
