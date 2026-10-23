<script lang="ts">
	import '@fontsource-variable/cormorant/wght.css';
	import '@fontsource-variable/cormorant/wght-italic.css';
	import '@fontsource-variable/manrope/wght.css';
	import '../app.css';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// Soft cross-fade when switching language.
	onNavigate((nav) => {
		if (!document.startViewTransition || nav.from?.url.pathname === nav.to?.url.pathname) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await nav.complete;
			});
		});
	});
</script>

{@render children()}
