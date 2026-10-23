<script lang="ts">
	import '@fontsource-variable/noto-serif-display/standard.css';
	import '@fontsource-variable/geist/wght.css';
	import '../app.css';

	let { children } = $props();

	// Language switches swap the copy in place. There is deliberately no
	// page-wide View Transition here: snapshotting the whole page froze it
	// for ~0.5s on every switch and made language changes feel laggy.
</script>

{@render children()}
