<script lang="ts">
	import { onMount } from 'svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import { imageSet, type MediaItem } from '$lib/media';

	let {
		item,
		alt,
		ratio = 4 / 5,
		sizes = '100vw',
		eager = false,
		tag = '',
		class: klass = ''
	}: {
		item: MediaItem;
		alt: string;
		/** width / height */
		ratio?: number;
		sizes?: string;
		eager?: boolean;
		tag?: string;
		class?: string;
	} = $props();

	let status = $state<'loading' | 'loaded' | 'error'>('loading');
	let img: HTMLImageElement | undefined = $state();
	const set = $derived(imageSet(item.src, ratio));

	onMount(() => {
		// The image may have settled before hydration.
		if (img?.complete) status = img.naturalWidth > 0 ? 'loaded' : 'error';
	});
</script>

<div class="media tone-{item.tone} {klass}" data-status={status} style:aspect-ratio={ratio}>
	<div class="ph" aria-hidden="true">
		<span class="ph-mark"><Monogram /></span>
	</div>
	<img
		bind:this={img}
		src={set.src}
		srcset={set.srcset}
		{sizes}
		{alt}
		width="1280"
		height={Math.round(1280 / ratio)}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : 'auto'}
		decoding="async"
		style:object-position={item.focus}
		onload={() => (status = 'loaded')}
		onerror={() => (status = 'error')}
	/>
	{#if tag}<span class="tag">{tag}</span>{/if}
</div>

<style>
	.media {
		position: relative;
		overflow: hidden;
		width: 100%;
		background: var(--bg-alt);
		isolation: isolate;
	}

	/* Designed placeholder — warm light falling on a plaster wall. */
	.ph {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		background:
			radial-gradient(120% 90% at 22% 12%, var(--l) 0%, transparent 60%),
			radial-gradient(90% 70% at 85% 105%, var(--d) 0%, transparent 70%),
			linear-gradient(160deg, var(--a), var(--b));
		filter: brightness(var(--ph-dim));
	}
	.ph-mark {
		width: clamp(3.5rem, 22%, 7rem);
		color: var(--m);
		opacity: 0.55;
	}
	.tone-ivory {
		--a: #f1e9dc;
		--b: #d9ccb7;
		--l: #fbf7f0;
		--d: #c8b89f;
		--m: #b49a70;
	}
	.tone-sand {
		--a: #e6d8c2;
		--b: #c4ae8c;
		--l: #f6eee1;
		--d: #ad9573;
		--m: #8f7550;
	}
	.tone-clay {
		--a: #dcc3a9;
		--b: #a9845f;
		--l: #f0e1cf;
		--d: #8e6a4a;
		--m: #6f4f35;
	}
	.tone-stone {
		--a: #dcd6cb;
		--b: #aea596;
		--l: #f1ede6;
		--d: #978d7e;
		--m: #7a7062;
	}
	.tone-pine {
		--a: #2f4e41;
		--b: #182a22;
		--l: #3f6152;
		--d: #10201a;
		--m: #b49a70;
	}
	.tone-bordeaux {
		--a: #6e2c3c;
		--b: #3d1420;
		--l: #84384b;
		--d: #2c0d16;
		--m: #b49a70;
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			opacity 900ms var(--ease),
			transform 1.6s var(--ease-out);
	}
	:global(html.js) .media img {
		opacity: 0;
		transform: scale(1.04);
	}
	:global(html.js) .media[data-status='loaded'] img {
		opacity: 1;
		transform: none;
	}
	.media[data-status='error'] img {
		display: none;
	}

	.tag {
		position: absolute;
		left: 0.75rem;
		top: 0.75rem;
		z-index: 2;
		padding: 0.4rem 0.6rem;
		border-radius: var(--radius);
		background: rgb(243 237 226 / 0.86);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		color: #571f2d;
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		line-height: 1.2;
	}
</style>
