// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Type definitions for Vite environment variables
// See: https://vite.dev/guide/env-and-mode
interface ImportMetaEnv {
	readonly VITE_HOSTNAME: string;
	readonly VITE_GD_API_TOKEN: string;
	readonly VITE_WORKSPACE_ID: string;
	readonly VITE_INSIGHT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

export {};
