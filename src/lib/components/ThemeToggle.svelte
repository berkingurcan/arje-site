<script lang="ts">
	import Icon from './Icon.svelte';
	import { theme, toggleTheme, setTheme } from '$lib/theme.svelte';
	import type { Dict } from '$lib/i18n';

	let { t, variant = 'icon' }: { t: Dict; variant?: 'icon' | 'segmented' } = $props();
	let btn: HTMLButtonElement | undefined = $state();
</script>

{#if variant === 'icon'}
	<button
		bind:this={btn}
		class="theme-icon"
		type="button"
		onclick={() => toggleTheme(btn)}
		aria-label={theme.value === 'dark' ? t.a11y.themeToLight : t.a11y.themeToDark}
	>
		<span class="swap" class:dark={theme.value === 'dark'}>
			<Icon name="moon" />
			<Icon name="sun" />
		</span>
	</button>
{:else}
	<div class="segmented" role="group" aria-label={t.ui.theme}>
		<button
			type="button"
			aria-pressed={theme.value === 'light'}
			onclick={(e) => setTheme('light', e.currentTarget)}
		>
			<Icon name="sun" />{t.ui.themeLight}
		</button>
		<button
			type="button"
			aria-pressed={theme.value === 'dark'}
			onclick={(e) => setTheme('dark', e.currentTarget)}
		>
			<Icon name="moon" />{t.ui.themeDark}
		</button>
	</div>
{/if}

<style>
	.theme-icon {
		display: grid;
		place-items: center;
		width: var(--target);
		height: var(--target);
		color: var(--ink);
		overflow: hidden;
		border-radius: 50%;
		transition: background-color var(--fast) var(--ease);
	}
	.theme-icon:hover {
		background: color-mix(in srgb, var(--ink) 7%, transparent);
	}
	.swap {
		position: relative;
		width: 1.15rem;
		height: 1.15rem;
	}
	.swap :global(.icon) {
		position: absolute;
		inset: 0;
		width: 1.15rem;
		height: 1.15rem;
		transition: transform 600ms var(--ease-out);
	}
	.swap :global(.icon:last-child) {
		transform: translateY(2.75rem);
	}
	.swap.dark :global(.icon:first-child) {
		transform: translateY(-2.75rem);
	}
	.swap.dark :global(.icon:last-child) {
		transform: none;
	}

	.segmented {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		padding: 4px;
		border-radius: var(--pill);
		box-shadow: inset 0 0 0 1px var(--line-strong);
	}
	.segmented button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 2.6rem;
		border-radius: var(--pill);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--muted);
	}
	.segmented button :global(.icon) {
		width: 1rem;
		height: 1rem;
	}
	.segmented button[aria-pressed='true'] {
		background: var(--ink);
		color: var(--bg);
	}
</style>
