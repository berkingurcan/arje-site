<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
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
	let open = $state(false);
	let menuBtn: HTMLButtonElement | undefined = $state();
	let firstLink: HTMLAnchorElement | undefined = $state();

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
		const mq = matchMedia('(min-width: 64rem)');
		const onMq = () => mq.matches && setOpen(false);
		mq.addEventListener('change', onMq);
		return () => {
			removeEventListener('scroll', onScroll);
			mq.removeEventListener('change', onMq);
		};
	});

	async function setOpen(next: boolean) {
		open = next;
		document.documentElement.style.overflow = next ? 'hidden' : '';
		if (next) {
			await tick();
			firstLink?.focus({ preventScroll: true });
		}
	}

	afterNavigate(({ type }) => {
		if (type !== 'enter' && open) setOpen(false);
	});

	function go(e: MouseEvent, id: string) {
		if (!open) return;
		e.preventDefault();
		setOpen(false);
		requestAnimationFrame(() => {
			document.getElementById(id)?.scrollIntoView({
				behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
			});
		});
		menuBtn?.focus({ preventScroll: true });
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			setOpen(false);
			menuBtn?.focus();
		}
	}
</script>

<svelte:window onkeydown={onKey} />

<a class="skip" href="#main">{t.a11y.skip}</a>

<header class="header" class:scrolled class:hidden={hidden && !open} class:open>
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
			<div class="desk-only"><LangSwitch {locale} label={t.a11y.language} /></div>
			<ThemeToggle {t} />
			<a class="btn btn-sm desk-only enquire" href="#trade">{t.ui.enquire}</a>
			<button
				bind:this={menuBtn}
				class="menu-btn"
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
				onclick={() => setOpen(!open)}
			>
				<span class="burger" aria-hidden="true"><i></i><i></i></span>
			</button>
		</div>
	</div>
</header>

<div id="mobile-menu" class="sheet" class:open inert={!open} aria-label={t.ui.menu} role="dialog" aria-modal="true">
	<div class="sheet-inner container">
		<nav aria-label={t.a11y.mainNav}>
			<ul>
				{#each links as l, i (l.id)}
					<li style="--i:{i}">
						{#if i === 0}
							<a bind:this={firstLink} href="#{l.id}" onclick={(e) => go(e, l.id)}>{l.label}</a>
						{:else}
							<a href="#{l.id}" onclick={(e) => go(e, l.id)}>{l.label}</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="sheet-foot" style="--i:4">
			<LangSwitch {locale} label={t.a11y.language} variant="segmented" />
			<ThemeToggle {t} variant="segmented" />
		</div>
	</div>
</div>

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
	.header.open {
		background: var(--bg);
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
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
		gap: 0.35rem;
		margin-right: -0.5rem;
	}
	.desk-only {
		display: none;
	}
	.enquire {
		margin-left: 0.4rem;
	}

	.menu-btn {
		display: grid;
		place-items: center;
		width: var(--target);
		height: var(--target);
		color: var(--ink);
	}
	.burger {
		position: relative;
		width: 1.35rem;
		height: 0.55rem;
	}
	.burger i {
		position: absolute;
		left: 0;
		right: 0;
		height: 1.25px;
		background: currentColor;
		transition: transform 450ms var(--ease-out);
	}
	.burger i:first-child {
		top: 0;
	}
	.burger i:last-child {
		bottom: 0;
	}
	.open .burger i:first-child {
		transform: translateY(0.25rem) rotate(45deg);
	}
	.open .burger i:last-child {
		transform: translateY(-0.25rem) rotate(-45deg);
	}

	/* ---------- Mobile sheet ---------- */
	.sheet {
		position: fixed;
		inset: 0;
		z-index: 55;
		background: var(--bg);
		padding-top: calc(var(--header-h) + env(safe-area-inset-top));
		padding-bottom: env(safe-area-inset-bottom);
		overflow-y: auto;
		overscroll-behavior: contain;
		visibility: hidden;
		opacity: 0;
		transition:
			opacity 350ms var(--ease),
			visibility 0s linear 350ms;
	}
	.sheet.open {
		visibility: visible;
		opacity: 1;
		transition:
			opacity 350ms var(--ease),
			visibility 0s;
	}
	.sheet-inner {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
		padding-block: clamp(1.5rem, 5svh, 2.5rem) 1.5rem;
	}
	.sheet ul li,
	.sheet-foot {
		opacity: 0;
		transform: translateY(0.75rem);
		transition:
			opacity 400ms var(--ease-out),
			transform 600ms var(--ease-out);
	}
	.sheet.open ul li,
	.sheet.open .sheet-foot {
		opacity: 1;
		transform: none;
		transition-delay: calc(80ms + var(--i) * 50ms);
	}
	.sheet ul a {
		display: block;
		padding-block: 0.35rem;
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: clamp(2.6rem, 12vw, 3.6rem);
		line-height: 1.05;
		letter-spacing: -0.015em;
		color: var(--ink);
	}
	.sheet-foot {
		display: grid;
		gap: 0.75rem;
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
		.menu-btn,
		.sheet {
			display: none;
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
