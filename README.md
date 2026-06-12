# ReactFlow Canvas

An "App Graph Builder" UI built with React, TypeScript, ReactFlow, TanStack Query, Zustand, and shadcn/ui.

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |

## Key Decisions

- **Zustand over prop drilling** — `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab` kept in global store. Node label updates also flow through Zustand to keep ReactFlow in sync.
- **TanStack Query for mock APIs** — `useApps` and `useGraph` hooks simulate real API calls with `setTimeout`. Caching means switching back to a previously loaded app is instant.
- **Custom slider** — shadcn Slider had rendering issues with Tailwind v4, replaced with a native range input styled manually.
- **ReactFlowProvider at App root** — allows TopBar's "Fit View" button to call `fitView()` from outside the canvas.

## Known Limitations

- Node edits (name, config value) are not persisted — refreshing resets to mock data.
- Mobile drawer tested visually but not on a real device.
- No backend — all data is mocked in-memory.
