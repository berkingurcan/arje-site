<script lang="ts">
	import Wordmark from '$lib/brand/Wordmark.svelte';
	import Monogram from '$lib/brand/Monogram.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import Icon from './Icon.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/config';
	import type { Dict, Locale } from '$lib/i18n';

	let { t, locale }: { t: Dict; locale: Locale } = $props();

	const links = $derived([
		{ id: 'collection', label: t.nav.collection },
		{ id: 'approach', label: t.nav.approach },
		{ id: 'atelier', label: t.nav.atelier },
		{ id: 'trade', label: t.nav.trade }
	]);
</script>

<footer id="contact" class="footer" aria-labelledby="contact-title">
	<div class="container">
		<div class="top">
			<div class="intro reveal" use:reveal>
				<span class="mono" aria-hidden="true"><Monogram /></span>
				<p class="tagline">{t.footer.tagline}</p>
			</div>

			<div class="cols">
				<div class="col reveal" use:reveal style="--d:1">
					<h2 id="contact-title" class="col-title">{t.footer.contactTitle}</h2>
					<p class="small muted">{t.footer.emailLabel}</p>
					<a class="email" href="mailto:{site.email}">{site.email}</a>
					{#if site.instagram}
						<a class="ig link" href={site.instagram} rel="noopener" target="_blank">Instagram <Icon name="arrow" class="arrow" /></a>
					{/if}
				</div>

				<nav class="col reveal" use:reveal style="--d:2" aria-label={t.footer.exploreTitle}>
					<h2 class="col-title">{t.footer.exploreTitle}</h2>
					<ul>
						{#each links as l (l.id)}
							<li><a href="#{l.id}">{l.label}</a></li>
						{/each}
					</ul>
				</nav>

				<div class="col prefs reveal" use:reveal style="--d:3">
					<h2 class="col-title">{t.ui.language} &amp; {t.ui.theme}</h2>
					<LangSwitch {locale} label={t.a11y.language} variant="segmented" />
					<ThemeToggle {t} variant="segmented" />
				</div>
			</div>
		</div>

		<div class="giant reveal" use:reveal>
			<div class="curtain"><Wordmark decorative /></div>
			<p class="by">by Mimar Arzu Gürcan</p>
		</div>

		<div class="bottom">
			<p>© {site.year} ARJE. {t.footer.rights}</p>
			<p>{t.attributionLead}: {t.attribution}</p>
			<p class="credit">{t.footer.credit}</p>
			<a class="top-link" href="#main">
				{t.a11y.backToTop}
				<span class="up"><Icon name="arrow" /></span>
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-top: var(--section);
		padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
		border-top: 1px solid var(--line);
	}

	.top {
		display: grid;
		gap: 3rem;
	}
	.mono {
		display: block;
		width: 3.5rem;
		color: var(--ink);
		margin-bottom: 1.5rem;
	}
	.tagline {
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(2rem, 4vw, 3.25rem);
		line-height: 1.05;
		color: var(--ink);
		max-width: 14ch;
	}

	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem 1.5rem;
	}
	.col {
		display: grid;
		align-content: start;
		gap: 0.6rem;
	}
	.col:first-child,
	.prefs {
		grid-column: 1 / -1;
	}
	.col-title {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink);
		margin-bottom: 0.4rem;
	}
	.small {
		font-size: var(--fs-small);
	}
	.email {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 2.4vw, 1.9rem);
		line-height: 1.2;
		color: var(--ink);
		width: fit-content;
		background: linear-gradient(currentColor, currentColor) 0 100% / 100% 1px no-repeat;
		transition: background-size 400ms var(--ease-out);
		overflow-wrap: anywhere;
	}
	.email:hover {
		background-size: 0 1px;
		background-position-x: 100%;
	}
	.col ul a {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		color: var(--text);
		transition: color var(--fast) var(--ease);
	}
	.col ul a:hover {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.prefs {
		max-width: 22rem;
		gap: 0.75rem;
	}

	.giant {
		margin-top: clamp(4rem, 10vw, 8rem);
		color: var(--ink);
	}
	.by {
		margin-top: clamp(0.75rem, 2vw, 1.5rem);
		text-align: center;
		font-size: clamp(0.75rem, 1.4vw, 1rem);
		font-weight: 600;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: var(--ink);
	}

	.bottom {
		display: grid;
		gap: 0.35rem;
		margin-top: clamp(3rem, 6vw, 5rem);
		padding-top: 1.25rem;
		border-top: 1px solid var(--line);
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.top-link {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: var(--target);
		width: fit-content;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.up {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px var(--line-strong);
		transform: rotate(-90deg);
		transition: transform 400ms var(--ease-out);
	}
	.up :global(.icon) {
		width: 1rem;
	}
	.top-link:hover .up {
		transform: rotate(-90deg) translateX(3px);
	}

	@media (min-width: 48rem) {
		.cols {
			grid-template-columns: 1.3fr 1fr 1.2fr;
		}
		.col:first-child,
		.prefs {
			grid-column: auto;
		}
		.bottom {
			grid-template-columns: auto auto 1fr auto;
			align-items: center;
			gap: 2rem;
		}
		.credit {
			text-align: right;
		}
	}

	@media (min-width: 64rem) {
		.top {
			grid-template-columns: 5fr 7fr;
			gap: var(--gutter);
		}
	}
</style>
