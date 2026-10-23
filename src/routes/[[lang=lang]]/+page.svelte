<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Manifesto from '$lib/components/Manifesto.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import Approach from '$lib/components/Approach.svelte';
	import InSitu from '$lib/components/InSitu.svelte';
	import Trade from '$lib/components/Trade.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { dictionaries, locales, localeInfo } from '$lib/i18n';
	import { syncTheme } from '$lib/theme.svelte';
	import { site } from '$lib/config';

	let { data } = $props();
	const locale = $derived(data.locale);
	const t = $derived(dictionaries[locale]);
	const canonical = $derived(site.url + (localeInfo[locale].path === '/' ? '/' : localeInfo[locale].path));

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'ARJE',
			url: site.url,
			logo: `${site.url}/brand/icon-512.png`,
			description: t.meta.description,
			founder: { '@type': 'Person', name: 'Arzu Gürcan', jobTitle: 'Architect' }
		})
	);

	onMount(syncTheme);

	// Keep <html lang> correct after client-side language switches.
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
	<link rel="canonical" href={canonical} />
	{#each locales as l (l)}
		<link rel="alternate" hreflang={localeInfo[l].hreflang} href={site.url + localeInfo[l].path} />
	{/each}
	<link rel="alternate" hreflang="x-default" href="{site.url}/" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="ARJE" />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={t.meta.ogLocale} />
	<meta property="og:image" content="{site.url}/brand/arje-social-card.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="{site.url}/brand/arje-social-card.png" />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Header {t} {locale} />

<main id="main" tabindex="-1">
	<Hero {t} />
	<Manifesto {t} />
	<Collection {t} />
	<Approach {t} />
	<InSitu {t} />
	<Trade {t} />
</main>

<Footer {t} {locale} />

<style>
	main:focus {
		outline: none;
	}
</style>
