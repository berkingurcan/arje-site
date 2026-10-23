<script lang="ts">
	type Name =
		| 'arrow'
		| 'arrow-left'
		| 'arrow-up'
		| 'arrow-up-right'
		| 'sun'
		| 'moon'
		| 'check'
		| 'instagram'
		| 'pinterest'
		| 'linkedin';
	let { name, class: klass = '' }: { name: Name; class?: string } = $props();
</script>

<svg
	class="icon {klass}"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.3"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'arrow'}
		<path d="M4 12h16M14 6l6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M20 12H4M10 6l-6 6 6 6" />
	{:else if name === 'arrow-up'}
		<path d="M12 20V4M6 10l6-6 6 6" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17 17 7M8.5 7H17v8.5" />
	{:else if name === 'sun'}
		<circle cx="12" cy="12" r="4.2" />
		<path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
	{:else if name === 'moon'}
		<path d="M19.5 14.6A8 8 0 0 1 9.4 4.5 8 8 0 1 0 19.5 14.6Z" />
	{:else if name === 'check'}
		<path d="M5 12.5l4.5 4.5L19 7.5" />
	{:else if name === 'instagram'}
		<rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
		<circle cx="12" cy="12" r="3.9" />
		<circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
	{:else if name === 'pinterest'}
		<circle cx="12" cy="12" r="8.5" />
		<path d="M10.6 20.2 12.4 12.8M11.2 15.1c.6.7 1.4 1 2.3 1 2.3 0 3.9-2 3.9-4.6 0-2.7-2.2-4.6-5-4.6-3.2 0-5 2.2-5 4.5 0 1.1.4 2.1 1.2 2.6" />
	{:else if name === 'linkedin'}
		<rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
		<path d="M8 10.5V16.5M8 7.6v.1M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3.5" />
	{/if}
</svg>

<style>
	.icon {
		width: 1.25rem;
		height: 1.25rem;
		flex: none;
	}
</style>
