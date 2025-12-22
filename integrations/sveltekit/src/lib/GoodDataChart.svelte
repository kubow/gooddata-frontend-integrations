<script lang="ts">
	import * as React from 'react';
	import * as ReactDOM from 'react-dom/client';
	import tigerFactory, { TigerTokenAuthProvider } from '@gooddata/sdk-backend-tiger';
	import '@gooddata/sdk-ui-ext/styles/css/main.css';

	// GoodData backend instance (created once)
	const backend = tigerFactory()
		.onHostname(import.meta.env.VITE_HOSTNAME)
		.withAuthentication(new TigerTokenAuthProvider(import.meta.env.VITE_GD_API_TOKEN));

	// Track the React root outside of reactive state to avoid re-triggering effects
	let reactRoot: ReactDOM.Root | null = null;

	// Svelte 5: $effect() replaces onMount() for side effects
	// The returned function is called on cleanup (component destroy)
	$effect(() => {
		if (typeof window === 'undefined') return;

		// Prevent creating multiple roots if effect re-runs
		if (reactRoot) return;

		const mountReactChart = async () => {
			const { InsightView } = await import('@gooddata/sdk-ui-ext');
			const container = document.getElementById('gooddata-chart');

			if (container) {
				reactRoot = ReactDOM.createRoot(container);
				reactRoot.render(
					React.createElement(InsightView, {
						workspace: import.meta.env.VITE_WORKSPACE_ID,
						insight: import.meta.env.VITE_INSIGHT_ID,
						backend
					})
				);
			}
		};

		mountReactChart();

		// Cleanup: unmount React when Svelte component is destroyed
		return () => {
			if (reactRoot) {
				reactRoot.unmount();
				reactRoot = null;
			}
		};
	});
</script>

<section class="chart-section">
	<h2>Where people buy our fruits?</h2>
	<div id="gooddata-chart"></div>
</section>

<style>
	.chart-section {
		padding: 1em;
	}

	.chart-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	#gooddata-chart {
		width: 100%;
		height: 400px;
	}

	:global(.insight-view-container),
	:global(.insight-view-visualization) {
		width: 100%;
		height: 400px;
	}
</style>

