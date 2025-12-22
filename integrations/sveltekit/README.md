# SvelteKit 5 GoodData Integration

A SvelteKit project featuring **Svelte 5 runes syntax** and GoodData frontend integration.

## [Created](https://svelte.dev/docs/kit/creating-a-project) with `npx sv create sveltekit --template minimal --types ts`.

---

## Quick Start (This Project)

All dependencies are already configured in `package.json`. Just run:

```bash
npm install
cp .env.example .env   # Edit with your GoodData credentials
npm run dev
npm run build
npm run preview
```

---

## Integration Steps (New Project)

> These steps are for integrating GoodData into a **new** SvelteKit project from scratch.  
> If using this project, skip to [Step 3](#step-3-configure-environment-variables) — dependencies and code are already set up.

### Step 1: Install Dependencies

After scaffolding a new SvelteKit project, add React and GoodData SDK:

```bash
npm install react react-dom @gooddata/sdk-ui-all @gooddata/sdk-backend-tiger @gooddata/sdk-ui-ext
npm install -D @types/react @types/react-dom
```

For more details, see the [GoodData.UI Architecture Overview](https://www.gooddata.com/docs/gooddata-ui/latest/architecture/architecture_overview/).

### Step 2: Set Up the Code

Create a wrapper component that mounts React's GoodData `InsightView` into a Svelte component.

The key pattern: use Svelte 5's `$effect()` to mount React on init and return a cleanup function to unmount on destroy.

```typescript
// src/lib/GoodDataChart.svelte
<script lang="ts">
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import tigerFactory, { TigerTokenAuthProvider } from '@gooddata/sdk-backend-tiger';

const backend = tigerFactory()
    .onHostname(import.meta.env.VITE_HOSTNAME)
    .withAuthentication(new TigerTokenAuthProvider(import.meta.env.VITE_GD_API_TOKEN));

let reactRoot: ReactDOM.Root | null = null;

// Svelte 5: $effect() replaces onMount()
$effect(() => {
    if (reactRoot) return; // Guard against re-runs

    const mount = async () => {
        const { InsightView } = await import('@gooddata/sdk-ui-ext');
        const container = document.getElementById('gooddata-chart');
        if (container) {
            reactRoot = ReactDOM.createRoot(container);
            reactRoot.render(React.createElement(InsightView, {
                workspace: import.meta.env.VITE_WORKSPACE_ID,
                insight: import.meta.env.VITE_INSIGHT_ID,
                backend
            }));
        }
    };
    mount();

    // Cleanup on component destroy
    return () => {
        reactRoot?.unmount();
        reactRoot = null;
    };
});
</script>

<div id="gooddata-chart"></div>
```

See [`src/lib/GoodDataChart.svelte`](./src/lib/GoodDataChart.svelte) for the full implementation.

### Step 3: Configure Environment Variables

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_HOSTNAME` | GoodData host URL | `https://<HOSTNAME>/dashboards/...` |
| `VITE_WORKSPACE_ID` | Workspace identifier | URL: `/workspace/<WORKSPACE_ID>/...` |
| `VITE_INSIGHT_ID` | Visualization identifier | Analyze tab URL: `/<INSIGHT_ID>/edit` |
| `VITE_GD_API_TOKEN` | API authentication token | [Create an API Token](https://www.gooddata.com/developers/cloud-native/doc/cloud/getting-started/create-api-token/) |

> **Security Note:** For production, use OAuth instead of API tokens to avoid credential exposure.

### Step 4: Configure CORS

Add your application's origin to GoodData's allowed CORS origins:

1. Navigate to your GoodData instance
2. Go to **Settings**
3. Add your dev/prod URLs to **Allowed Origins**

See [CORS Documentation](https://www.gooddata.com/docs/cloud/manage-organization/set-up-cors-for-organization/) for details.

---

## Project Structure

```
src/
├── app.d.ts              # Type definitions (includes env var types)
├── app.html              # HTML template
├── lib/
│   ├── index.ts          # Library exports
│   └── GoodDataChart.svelte  # GoodData chart component
└── routes/
    ├── +layout.svelte    # Layout component
    └── +page.svelte      # Main page
```

## Svelte 5 Features Used

This project uses modern Svelte 5 runes syntax:

| Svelte 5 | Replaces | Purpose |
|----------|----------|---------|
| `$state()` | `let` reactive | Reactive state declarations |
| `$props()` | `export let` | Component props |
| `$effect()` | `onMount` | Side effects & lifecycle |
| `{@render children()}` | `<slot>` | Render child content |
| `Snippet` type | — | Typed children props |

See [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide) for more details.

## Learn More

- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [GoodData.UI Documentation](https://www.gooddata.com/docs/gooddata-ui/latest/)
- [GoodData Free Trial](https://www.gooddata.com/trial/)
