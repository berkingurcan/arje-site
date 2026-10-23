<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Wordmark from '$lib/brand/Wordmark.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { localeInfo, type Dict, type Locale } from '$lib/i18n';

	let { t, locale }: { t: Dict; locale: Locale } = $props();

	const links = $derived([
		{ id: 'collection', label: t.nav.collection },
		{ id: 'approach', label: t.nav.approach },
		{ id: 'atelier', label: t.nav.atelier },
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
				hidden = y > lastY && y > 320;
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
			<span class="wm"><Wordmark decorative /></span>
			<span class="sig" aria-hidden="true">by Mimar Arzu Gürcan</span>
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
			<span class="divider desk-only" aria-hidden="true"></span>
			<ThemeToggle {t} />
			<button
				bind:this={menuBtn}
				class="menu-btn"
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
				onclick={() => setOpen(!open)}
			>
				<span class="menu-label" aria-hidden="true">{open ? t.ui.close : t.ui.menu}</span>
				<span class="burger" aria-hidden="true"><i></i><i></i></span>
			</button>
		</div>
	</div>
</header>

<div id="mobile-menu" class="sheet" class:open inert={!open} aria-label={t.ui.menu} role="dialog" aria-modal="true">
	<div class="sheet-inner container">
		<nav aria-label={t.a11y.mainNav}>
			<ol>
				{#each links as l, i (l.id)}
					<li style="--i:{i}">
						{#if i === 0}
							<a bind:this={firstLink} href="#{l.id}" onclick={(e) => go(e, l.id)}>
								<span class="idx num">0{i + 1}</span><span class="txt">{l.label}</span>
							</a>
						{:else}
							<a href="#{l.id}" onclick={(e) => go(e, l.id)}>
								<span class="idx num">0{i + 1}</span><span class="txt">{l.label}</span>
							</a>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>

		<div class="sheet-foot" style="--i:5">
			<div class="ctl">
				<span class="label">{t.ui.language}</span>
				<LangSwitch {locale} label={t.a11y.language} variant="segmented" />
			</div>
			<div class="ctl">
				<span class="label">{t.ui.theme}</span>
				<ThemeToggle {t} variant="segmented" />
			</div>
			<p class="sheet-sig">ARJE · by Mimar Arzu Gürcan</p>
		</div>
	</div>
</div>

<style>
	.skip {
		position: fixed;
		left: 1rem;
		top: 0.75rem;
		z-index: 200;
		padding: 0.75rem 1rem;
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
		-webkit-backdrop-filter: saturate(1.2) blur(18px);
		backdrop-filter: saturate(1.2) blur(18px);
		box-shadow: 0 1px 0 var(--line);
	}
	.header.open {
		background: var(--bg);
		box-shadow: 0 1px 0 var(--line);
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

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-height: var(--target);
		color: var(--ink);
	}
	.wm {
		width: 5.75rem;
	}
	.sig {
		display: none;
		padding-left: 1rem;
		border-left: 1px solid var(--line-strong);
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		line-height: 1;
		white-space: nowrap;
		color: var(--muted);
	}

	.primary {
		display: none;
	}
	.primary ul {
		display: flex;
		gap: clamp(1.25rem, 2.4vw, 2.5rem);
	}
	.primary a {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: var(--target);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink);
		white-space: nowrap;
	}
	.primary a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.75rem;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 450ms var(--ease-out);
	}
	.primary a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-right: -0.6rem;
	}
	.desk-only {
		display: none;
	}
	.divider {
		width: 1px;
		height: 1.25rem;
		background: var(--line-strong);
		margin-inline: 0.35rem;
	}

	.menu-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		min-height: var(--target);
		padding-inline: 0.6rem;
		color: var(--ink);
	}
	.menu-label {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.burger {
		position: relative;
		width: 1.4rem;
		height: 0.6rem;
	}
	.burger i {
		position: absolute;
		left: 0;
		right: 0;
		height: 1.25px;
		background: currentColor;
		transition: transform 500ms var(--ease-out);
	}
	.burger i:first-child {
		top: 0;
	}
	.burger i:last-child {
		bottom: 0;
	}
	.open .burger i:first-child {
		transform: translateY(0.27rem) rotate(20deg);
	}
	.open .burger i:last-child {
		transform: translateY(-0.27rem) rotate(-20deg);
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
		clip-path: inset(0 0 100% 0);
		transition:
			clip-path 700ms var(--ease-out),
			visibility 0s linear 700ms;
	}
	.sheet.open {
		visibility: visible;
		clip-path: inset(0 0 0 0);
		transition:
			clip-path 700ms var(--ease-out),
			visibility 0s;
	}
	.sheet-inner {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
		padding-block: clamp(1.5rem, 6svh, 3rem) 1.5rem;
	}
	.sheet ol li,
	.sheet-foot {
		opacity: 0;
		transform: translateY(1.25rem);
		transition:
			opacity 500ms var(--ease-out),
			transform 700ms var(--ease-out);
	}
	.sheet.open ol li,
	.sheet.open .sheet-foot {
		opacity: 1;
		transform: none;
		transition-delay: calc(150ms + var(--i) * 60ms);
	}
	.sheet ol {
		border-top: 1px solid var(--line);
	}
	.sheet ol li {
		border-bottom: 1px solid var(--line);
	}
	.sheet ol a {
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding-block: 1rem;
		color: var(--ink);
	}
	.idx {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		color: var(--muted);
		min-width: 1.5rem;
	}
	.txt {
		font-family: var(--font-display);
		font-size: clamp(2.1rem, 9.5vw, 3rem);
		font-weight: 450;
		line-height: 1.05;
		letter-spacing: -0.01em;
	}
	.sheet-foot {
		display: grid;
		gap: 1.5rem;
	}
	.ctl {
		display: grid;
		gap: 0.6rem;
	}
	.ctl .label {
		color: var(--muted);
	}
	.sheet-sig {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted);
		padding-top: 0.5rem;
	}

	@media (min-width: 48rem) {
		.wm {
			width: 6.5rem;
		}
	}

	@media (min-width: 64rem) {
		:global(:root) {
			--header-h: 5rem;
		}
		.primary,
		.desk-only {
			display: block;
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
		}
	}

	@media (min-width: 80rem) {
		.sig {
			display: inline-block;
		}
	}
</style>
