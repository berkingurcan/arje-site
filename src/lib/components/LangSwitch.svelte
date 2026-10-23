<script lang="ts">
	import { locales, localeInfo, type Locale } from '$lib/i18n';

	let {
		locale,
		label,
		variant = 'inline'
	}: { locale: Locale; label: string; variant?: 'inline' | 'segmented' } = $props();
</script>

<nav class="lang {variant}" aria-label={label}>
	<ul>
		{#each locales as l (l)}
			<li>
				<!-- Preloaded eagerly so a tap swaps the copy immediately, with no fetch on click. -->
				<a
					href={localeInfo[l].path}
					hreflang={localeInfo[l].hreflang}
					lang={l}
					aria-current={l === locale ? 'true' : undefined}
					data-sveltekit-noscroll
					data-sveltekit-replacestate
					data-sveltekit-preload-code="eager"
					data-sveltekit-preload-data="eager"
				>
					<span aria-hidden="true">{localeInfo[l].short}</span>
					<span class="sr-only">{localeInfo[l].label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		align-items: center;
	}
	a {
		display: grid;
		place-items: center;
		min-width: 2.25rem;
		min-height: var(--target);
		font-size: 0.8125rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--muted);
		transition: color var(--fast) var(--ease);
	}
	a:hover,
	a[aria-current='true'] {
		color: var(--ink);
	}
	.inline a[aria-current='true'] span:first-child {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.4em;
	}

	/* segmented: mobile menu and footer */
	.segmented ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 4px;
		gap: 4px;
		border-radius: var(--pill);
		box-shadow: inset 0 0 0 1px var(--line-strong);
	}
	.segmented a {
		min-height: 2.6rem;
		border-radius: var(--pill);
		font-size: 0.875rem;
	}
	.segmented a[aria-current='true'] {
		background: var(--ink);
		color: var(--bg);
	}
</style>
