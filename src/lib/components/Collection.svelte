<script lang="ts">
	import { onMount } from 'svelte';
	import Media from './Media.svelte';
	import Icon from './Icon.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { media } from '$lib/media';
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
		<div class="head-copy reveal" use:reveal>
			<p class="label rule">{t.collection.eyebrow}</p>
			<h2 id="collection-title" class="h2"><span class="rise"><span>{t.collection.title}</span></span></h2>
		</div>
		<div class="head-side reveal" use:reveal style="--d:2">
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
			{@const label = `${item.type} — ${item.name}`}
			<li class="card reveal" use:reveal style="--d:{Math.min(i, 3)}">
				<article aria-labelledby="obj-{i}">
					<div class="card-media">
						<Media
							item={media.objects[i]}
							alt="{label} · {t.collection.representative}"
							ratio={4 / 5}
							sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 80vw"
							tag={t.collection.representative}
						/>
					</div>
					<div class="card-body">
						<p class="type"><span class="num">No. 0{i + 1}</span><span class="dot" aria-hidden="true"></span>{item.type}</p>
						<h3 id="obj-{i}" class="name">{item.name}</h3>
						<div class="meta">
							<span class="status">{t.collection.status}</span>
							<a class="req" href="#trade" onclick={() => ask(label)}>
								{t.collection.request}
								<span class="sr-only">: {label}</span>
								<Icon name="arrow" class="arrow" />
							</a>
						</div>
					</div>
				</article>
			</li>
		{/each}
		<li class="card end reveal" use:reveal style="--d:3">
			<div class="end-box field-pine">
				<span class="end-mark" aria-hidden="true"><Monogram /></span>
				<div>
					<h3 class="end-title">{t.collection.endTitle}</h3>
					<p class="end-text">{t.collection.endText}</p>
					<a class="link" href="#trade" onclick={() => ask('')}>
						{t.collection.endCta}
						<Icon name="arrow" class="arrow" />
					</a>
				</div>
			</div>
		</li>
	</ul>

	<div class="container foot">
		<div class="bar" aria-hidden="true">
			<span style:width="{visible * 100}%" style:left="{progress * (1 - visible) * 100}%"></span>
		</div>
		<p class="swipe" aria-hidden="true">{t.collection.swipe}</p>
	</div>
</section>

<style>
	.collection {
		background: var(--bg-alt);
	}
	.head {
		display: grid;
		gap: 1.25rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}
	.head-copy {
		display: grid;
		gap: 1.25rem;
	}
	.note {
		max-width: 26rem;
		color: var(--muted);
		font-size: var(--fs-small);
		line-height: 1.65;
	}
	.arrows {
		display: none;
		gap: 0.5rem;
	}
	.arrow-btn {
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		color: var(--ink);
		box-shadow: inset 0 0 0 1px var(--line-strong);
		transition:
			background-color var(--fast) var(--ease),
			color var(--fast) var(--ease),
			opacity var(--fast) var(--ease);
	}
	.arrow-btn:hover:not(:disabled) {
		background: var(--ink);
		color: var(--bg);
	}
	.arrow-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}

	/* Scroll-snap track, aligned to the container edge */
	.track {
		--inset: max(var(--pad), (100% - var(--max)) / 2);
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(78vw, 22rem);
		column-gap: clamp(0.875rem, 2vw, 1.75rem);
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
	.card-media {
		position: relative;
	}
	.card-media :global(.media img) {
		transition:
			opacity 900ms var(--ease),
			transform 1.2s var(--ease-out);
	}
	.card:hover .card-media :global(.media[data-status='loaded'] img) {
		transform: scale(1.035);
	}
	.dot {
		display: inline-block;
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--accent);
		vertical-align: middle;
		margin: -2px 0.6rem 0;
	}
	.card-body {
		padding-top: 1.1rem;
	}
	.type {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.name {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(1.75rem, 2.4vw, 2.25rem);
		line-height: 1.1;
		color: var(--ink);
		margin-top: 0.15rem;
	}
	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.85rem;
		padding-top: 0.6rem;
		border-top: 1px solid var(--line);
	}
	.status {
		font-size: var(--fs-small);
		color: var(--muted);
	}
	.req {
		--arrow-shift: 0px;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: var(--target);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink);
		white-space: nowrap;
	}
	.req:hover {
		--arrow-shift: 4px;
	}
	.req :global(.arrow) {
		width: 1rem;
	}

	.end-box {
		aspect-ratio: 4 / 5;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius);
	}
	.end-mark {
		width: 4.5rem;
		color: var(--accent);
	}
	.end-title {
		font-family: var(--font-display);
		font-weight: 450;
		font-size: clamp(2rem, 3vw, 2.75rem);
		line-height: 1.05;
		color: var(--ink);
		margin-bottom: 0.75rem;
	}
	.end-text {
		color: var(--muted);
		margin-bottom: 1rem;
		max-width: 18rem;
	}

	.foot {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-top: clamp(1.5rem, 3vw, 2.5rem);
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
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
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
		}
		.head-side {
			display: grid;
			justify-items: end;
			gap: 1.25rem;
			text-align: right;
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
			grid-auto-columns: calc((min(100vw - 2 * var(--pad), var(--max)) - 2 * 1.75rem) / 3.25);
		}
	}
</style>
