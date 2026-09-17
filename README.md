# BTCP UI

Shared UI for BTCP deployments: shadcn/ui primitives, Phosphor icons, Inter typography, and a compact Cloudflare-inspired theme.

This repository is the source of truth. It includes components, design tokens, an interactive Next.js gallery, and a versioned shadcn registry. No notification backend, credentials, or production data are included.

## Install

In a shadcn-ready Next.js / React 19 / Tailwind 4 application:

```sh
npx shadcn@latest add https://raw.githubusercontent.com/JoshMayerr/btcp-ui/v0.3.0/public/r/btcp-ui.json
```

Follow [the installation guide](docs/ui-kit.md) to import the theme and font. Consumers own installed source copies, following the shadcn model; updates are deliberate installs and reviewed diffs.

## Run the gallery

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or database are needed.

## Develop and release

```sh
npm run ui:build
npm run build
npm run typecheck
```

Edit `components/ui`, `components/btcp`, and `styles/btcp-theme.css`. Gallery examples are in `app/page.tsx` and `components/ui-kit-examples.tsx`.

For a release, bump package.json version, update example install URLs, regenerate the registry, and commit generated JSON. Tag that commit v<version> and push the tag after checks pass. Pinned raw GitHub URLs work without hosting the gallery. CI checks registry/source consistency.

Genesis Notifications retains an installed copy of v0.3.0 and its compatibility registry endpoint. Shared changes should originate here.

MIT licensed; see THIRD_PARTY_NOTICES.md for shadcn/ui attribution. This is a BTCP implementation and contains no Cloudflare logos or assets.
