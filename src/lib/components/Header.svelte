<script lang="ts">
	import { onMount } from 'svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import Wordmark from '$lib/brand/Wordmark.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { localeInfo, type Dict, type Locale } from '$lib/i18n';

	let { t, locale }: { t: Dict; locale: Locale } = $props();

	const links = $derived([
		{ id: 'collection', label: t.nav.collection },
		{ id: 'approach', label: t.nav.approach },
		{ id: 'trade', label: t.nav.trade },
		{ id: 'contact', label: t.nav.contact }
	]);

	let scrolled = $state(false);
	let hidden = $state(false);

	onMount(() => {
		let lastY = scrollY;
		let ticking = false;
		const update = () => {
			const y = scrollY;
			scrolled = y > 8;
			if (Math.abs(y - lastY) > 6) {
				hidden = y > lastY && y > 480;
				lastY = y;
			}
			ticking = false;
		};
		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};
		update();
		addEventListener('scroll', onScroll, { passive: true });
		return () => removeEventListener('scroll', onScroll);
	});

</script>

<a class="skip" href="#main">{t.a11y.skip}</a>

<header class="header" class:scrolled class:hidden>
	<div class="bar container">
		<a class="brand" href={localeInfo[locale].path} aria-label={t.a11y.home}>
			<span class="symbol"><Monogram small /></span>
			<span class="wm"><Wordmark decorative /></span>
		</a>

		<nav class="primary" aria-label={t.a11y.mainNav}>
			<ul>
				{#each links as l (l.id)}
					<li><a href="#{l.id}">{l.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="tools">
			<LangSwitch {locale} label={t.a11y.language} />
			<ThemeToggle {t} />
			<a class="btn btn-sm desk-only enquire" href="#trade">{t.ui.enquire}</a>
		</div>
	</div>
</header>

<style>
	.skip {
		position: fixed;
		left: 1rem;
		top: 0.75rem;
		z-index: 200;
		padding: 0.75rem 1.1rem;
		border-radius: var(--pill);
		background: var(--btn-bg);
		color: var(--btn-fg);
		font-size: 0.875rem;
		transform: translateY(-200%);
		transition: transform var(--fast) var(--ease);
	}
	.skip:focus {
		transform: none;
	}

	.header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 60;
		height: calc(var(--header-h) + env(safe-area-inset-top));
		padding-top: env(safe-area-inset-top);
		transition:
			transform 500ms var(--ease-out),
			background-color 400ms var(--ease),
			box-shadow 400ms var(--ease);
	}
	.header.scrolled {
		background: var(--header-bg);
		-webkit-backdrop-filter: blur(16px);
		backdrop-filter: blur(16px);
		box-shadow: 0 1px 0 var(--line);
	}
	.header.hidden {
		transform: translateY(-100%);
	}

	.bar {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	/* Symbol + wordmark lockup */
	.brand {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		min-height: var(--target);
		color: var(--ink);
	}
	.symbol {
		width: 1.9rem;
		color: var(--ink);
	}
	.wm {
		width: 4.4rem;
		padding-top: 0.15rem;
	}

	.primary {
		display: none;
	}
	.primary ul {
		display: flex;
		gap: 0.25rem;
	}
	.primary a {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		padding-inline: 0.9rem;
		border-radius: var(--pill);
		font-size: 0.9375rem;
		font-weight: 450;
		color: var(--text);
		white-space: nowrap;
		transition:
			background-color var(--fast) var(--ease),
			color var(--fast) var(--ease);
	}
	.primary a:hover {
		background: color-mix(in srgb, var(--ink) 7%, transparent);
		color: var(--ink);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.1rem;
		margin-right: -0.6rem;
	}
	.desk-only {
		display: none;
	}
	.enquire {
		margin-left: 0.4rem;
	}

	@media (min-width: 64rem) {
		:global(:root) {
			--header-h: 4.75rem;
		}
		.primary,
		.desk-only {
			display: block;
		}
		.enquire {
			display: inline-flex;
		}
		.bar {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
		}
		.tools {
			justify-self: end;
			margin-right: 0;
		}
		.symbol {
			width: 2.1rem;
		}
		.wm {
			width: 4.75rem;
		}
	}
</style>
