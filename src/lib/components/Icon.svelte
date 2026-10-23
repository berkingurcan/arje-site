<script lang="ts">
	type Name = 'arrow' | 'arrow-left' | 'arrow-down' | 'sun' | 'moon' | 'plus' | 'check';
	let { name, class: klass = '' }: { name: Name; class?: string } = $props();
</script>

<svg
	class="icon {klass}"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.25"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'arrow'}
		<path d="M3 12h17M14 6l6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M21 12H4M10 6l-6 6 6 6" />
	{:else if name === 'arrow-down'}
		<path d="M12 3v17M6 14l6 6 6-6" />
	{:else if name === 'sun'}
		<circle cx="12" cy="12" r="4.2" />
		<path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
	{:else if name === 'moon'}
		<path d="M19.5 14.6A8 8 0 0 1 9.4 4.5 8 8 0 1 0 19.5 14.6Z" />
	{:else if name === 'plus'}
		<path d="M12 5v14M5 12h14" />
	{:else if name === 'check'}
		<path d="M5 12.5l4.5 4.5L19 7.5" />
	{/if}
</svg>

<style>
	.icon {
		width: 1.25rem;
		height: 1.25rem;
		flex: none;
	}
</style>
