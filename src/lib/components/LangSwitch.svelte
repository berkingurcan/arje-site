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
				<a
					href={localeInfo[l].path}
					hreflang={localeInfo[l].hreflang}
					lang={l}
					aria-current={l === locale ? 'true' : undefined}
					data-sveltekit-noscroll
					data-sveltekit-replacestate
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
		position: relative;
		display: grid;
		place-items: center;
		min-width: var(--target);
		min-height: var(--target);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		color: var(--muted);
		transition: color var(--fast) var(--ease);
	}
	a:hover,
	a[aria-current='true'] {
		color: var(--ink);
	}

	/* inline: TR · EN · RU with a fine underline on the active one */
	.inline a::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0.7rem;
		width: 1rem;
		height: 1px;
		background: currentColor;
		transform: translateX(-50%) scaleX(0);
		transition: transform 300ms var(--ease-out);
	}
	.inline a[aria-current='true']::after {
		transform: translateX(-50%) scaleX(1);
	}

	/* segmented: used in the mobile menu and footer */
	.segmented ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border: 1px solid var(--line-strong);
		border-radius: var(--radius);
		padding: 3px;
		gap: 3px;
	}
	.segmented a {
		min-height: 2.75rem;
		border-radius: 1px;
		font-size: 0.75rem;
	}
	.segmented a[aria-current='true'] {
		background: var(--ink);
		color: var(--bg);
	}
</style>
