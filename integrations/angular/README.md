# Angular

This integration uses Angular 21 with React 19 for GoodData visualizations.

# step 1

- install dependencies
- install `npm install --save invariant react@^19.2.3 react-dom@^19.2.3 @gooddata/sdk-ui-all @gooddata/sdk-backend-tiger`
- install `npm install --save-dev @types/react@^19.2.3 @types/react-dom@^19.2.3 @types/invariant`

# step 2

- edit tsconfig
- `skipLibCheck: true` (compiler options)
- `strictPropertyInitialization: false`
- `moduleResolution: "bundler"` (for proper package.json exports support)

# step 3

- create component
- `ng generate component chart`
- add GoodData component using React 19's `createRoot` API from `react-dom/client`

# step 4

- add styles (styles.css)
- ensure proper cleanup in `ngOnDestroy()` using `reactRoot.unmount()`
