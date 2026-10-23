<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import type { Dict } from '$lib/i18n';

	/**
	 * Mobile tab bar (below 64rem). Thumb-reachable navigation that highlights
	 * the section in view, and steps aside while a form field has focus so it
	 * never sits on top of the keyboard.
	 */
	let { t }: { t: Dict } = $props();

	type Tab = 'top' | 'collection' | 'approach' | 'trade' | 'contact';
	const tabs = $derived<{ id: Tab; label: string; icon?: 'grid' | 'set-square' | 'pencil' | 'mail' }[]>([
		{ id: 'top', label: t.dock.home },
		{ id: 'collection', label: t.dock.collection, icon: 'grid' },
		{ id: 'approach', label: t.dock.approach, icon: 'set-square' },
		{ id: 'trade', label: t.dock.trade, icon: 'pencil' },
		{ id: 'contact', label: t.dock.contact, icon: 'mail' }
	]);

	// Sections on the page → which tab they belong to.
	const sectionTab: Record<string, Tab> = {
		top: 'top',
		manifesto: 'top',
		collection: 'collection',
		approach: 'approach',
		insitu: 'approach',
		trade: 'trade',
		contact: 'contact'
	};

	let active = $state<Tab>('top');
	let typing = $state(false);

	onMount(() => {
		const els = Object.keys(sectionTab)
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => !!el);

		// A section is "current" when it crosses a thin band in the middle of the screen.
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = sectionTab[e.target.id] ?? active;
				}
			},
			{ rootMargin: '-48% 0px -48% 0px' }
		);
		els.forEach((el) => io.observe(el));

		// The page bottom never reaches the middle band, so finish on Contact.
		const onScroll = () => {
			if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = 'contact';
		};
		addEventListener('scroll', onScroll, { passive: true });

		const isField = (el: EventTarget | null) =>
			el instanceof HTMLElement && el.matches('input:not([type=checkbox]), textarea, select');
		const onIn = (e: FocusEvent) => (typing = isField(e.target));
		const onOut = () => (typing = false);
		document.addEventListener('focusin', onIn);
		document.addEventListener('focusout', onOut);

		return () => {
			io.disconnect();
			removeEventListener('scroll', onScroll);
			document.removeEventListener('focusin', onIn);
			document.removeEventListener('focusout', onOut);
		};
	});
</script>

<nav class="dock" class:away={typing} aria-label={t.dock.label}>
	<ul>
		{#each tabs as tab (tab.id)}
			<li>
				<a
					href="#{tab.id}"
					aria-current={active === tab.id ? 'location' : undefined}
					onclick={() => (active = tab.id)}
				>
					<span class="ico" aria-hidden="true">
						{#if tab.icon}<Icon name={tab.icon} />{:else}<span class="sym"><Monogram small /></span>{/if}
					</span>
					<span class="lbl">{tab.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.dock {
		position: fixed;
		z-index: 70;
		left: max(0.75rem, env(safe-area-inset-left));
		right: max(0.75rem, env(safe-area-inset-right));
		bottom: max(0.75rem, env(safe-area-inset-bottom));
		max-width: 30rem;
		margin-inline: auto;
		border-radius: 1.6rem;
		background: var(--dock-bg);
		-webkit-backdrop-filter: blur(20px) saturate(1.4);
		backdrop-filter: blur(20px) saturate(1.4);
		box-shadow:
			inset 0 0 0 1px var(--line),
			0 10px 30px -12px rgb(30 10 16 / 0.35);
		transition:
			transform 450ms var(--ease-out),
			opacity 300ms var(--ease);
	}
	.dock.away {
		transform: translateY(calc(100% + 2rem));
		opacity: 0;
		pointer-events: none;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		padding: 0.4rem;
	}
	a {
		display: grid;
		justify-items: center;
		gap: 0.2rem;
		padding: 0.35rem 0.1rem 0.3rem;
		border-radius: 1.2rem;
		color: var(--muted);
		-webkit-tap-highlight-color: transparent;
		transition: color var(--fast) var(--ease);
	}
	.ico {
		display: grid;
		place-items: center;
		width: 3.1rem;
		height: 1.9rem;
		border-radius: var(--pill);
		transition:
			background-color 300ms var(--ease),
			transform 200ms var(--ease);
	}
	.ico :global(.icon) {
		width: 1.3rem;
		height: 1.3rem;
	}
	.sym {
		width: 1.35rem;
	}
	.lbl {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.6875rem;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: 0.01em;
	}
	a[aria-current] {
		color: var(--ink);
	}
	a[aria-current] .ico {
		background: var(--dock-active);
	}
	a:active .ico {
		transform: scale(0.92);
	}

	@media (min-width: 64rem) {
		.dock {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dock {
			transition: none;
		}
	}
</style>
