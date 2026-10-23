<script lang="ts">
	import Monogram from '$lib/brand/Monogram.svelte';
	import Wordmark from '$lib/brand/Wordmark.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import Icon from './Icon.svelte';
	import { site } from '$lib/config';
	import type { Dict, Locale } from '$lib/i18n';

	let { t, locale }: { t: Dict; locale: Locale } = $props();
</script>

<footer id="contact" class="footer" aria-labelledby="contact-title">
	<div class="container">
		<div class="main">
			<div class="sign" role="img" aria-label="ARJE">
				<span class="mark"><Monogram /></span>
				<span class="wm"><Wordmark decorative /></span>
			</div>

			<div class="reach">
				<h2 id="contact-title" class="label">{t.footer.emailNote}</h2>
				<a class="email" href="mailto:{site.email}">{site.email}</a>
				<ul class="social" aria-label={t.footer.follow}>
					{#each site.social as s (s.name)}
						<li>
							<a href={s.url} target="_blank" rel="noopener noreferrer">
								<Icon name={s.icon} />
								<span>{s.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="base">
			<p class="legal">
				<span>© {site.year} ARJE</span>
				<span>{t.attributionLead} {t.attribution}</span>
				<span class="credit">{t.footer.credit}</span>
			</p>
			<div class="prefs">
				<LangSwitch {locale} label={t.a11y.language} />
				<ThemeToggle {t} />
				<a class="top" href="#main" aria-label={t.a11y.backToTop}><Icon name="arrow-up" /></a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-top: clamp(4rem, 9vw, 7rem);
		padding-bottom: max(calc(1rem + var(--dock-space)), calc(1rem + env(safe-area-inset-bottom)));
		border-top: 1px solid var(--line);
	}

	.main {
		display: grid;
		gap: 3rem;
		padding-bottom: clamp(3rem, 7vw, 5.5rem);
	}
	.sign {
		display: flex;
		align-items: flex-end;
		gap: 1.25rem;
	}
	.mark {
		width: clamp(3.4rem, 6vw, 5.25rem);
		flex: none;
		color: var(--ink);
	}
	.wm {
		width: clamp(9rem, 22vw, 17rem);
		color: var(--ink);
		padding-bottom: 0.2rem;
	}

	.reach {
		display: grid;
		justify-items: start;
		gap: 0.5rem;
	}
	.email {
		font-family: var(--font-display);
		font-weight: 300;
		font-stretch: var(--display-stretch);
		font-size: clamp(2rem, 4.4vw, 3.6rem);
		line-height: 1.1;
		letter-spacing: -0.01em;
		color: var(--ink);
		overflow-wrap: anywhere;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.18em;
		text-decoration-color: var(--line-strong);
		transition: text-decoration-color var(--fast) var(--ease);
	}
	.email:hover {
		text-decoration-color: currentColor;
	}
	.social {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		margin-top: 0.75rem;
	}
	.social a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: var(--target);
		font-size: 0.9375rem;
		color: var(--text);
		transition: color var(--fast) var(--ease);
	}
	.social a:hover {
		color: var(--ink);
	}
	.social :global(.icon) {
		width: 1.15rem;
		height: 1.15rem;
	}

	.base {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--line);
	}
	.legal {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		font-size: var(--fs-meta);
		color: var(--muted);
	}
	.prefs {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-right: -0.5rem;
	}
	.top {
		display: none;
		place-items: center;
		width: var(--target);
		height: var(--target);
		border-radius: 50%;
		color: var(--ink);
		transition: background-color var(--fast) var(--ease);
	}
	.top:hover {
		background: color-mix(in srgb, var(--ink) 7%, transparent);
	}
	.top :global(.icon) {
		width: 1.1rem;
		height: 1.1rem;
	}

	@media (min-width: 64rem) {
		.top {
			display: grid;
		}
		.main {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--gutter);
			align-items: end;
		}
		.sign {
			grid-column: 1 / span 5;
		}
		.reach {
			grid-column: 7 / -1;
		}
	}
</style>
