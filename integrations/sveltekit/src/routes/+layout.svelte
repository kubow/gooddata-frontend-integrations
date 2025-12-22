<script lang="ts">
	import type { Snippet } from 'svelte';

	// Svelte 5: using $props() for component props
	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>My Fruit Store</title>
</svelte:head>

<div id="app">
	{@render children()}
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: #f2f2f2;
	}

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}
</style>
