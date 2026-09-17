# BTCP UI

BTCP UI is the shared visual foundation for internal BTCP deployments. It starts with shadcn/ui, uses Phosphor icons, and follows the compact spacing, neutral surfaces, blue controls, and persistent navigation of Cloudflare's dashboard. The implementation uses BTCP branding; it does not include Cloudflare logos or assets.

## Install in another deployment

Use a React 19, Next.js, Tailwind CSS 4 project with shadcn configured. Initialize shadcn first if the app does not have `components.json`:

```sh
npx shadcn@latest init
npx shadcn@latest add https://raw.githubusercontent.com/JoshMayerr/btcp-ui/v0.1.0/public/r/btcp-ui.json
```

Review overwrite prompts if the app already has customized shadcn components. This installs source into your configured UI, components, and library directories. The theme goes to `styles/btcp-theme.css` at the project root. Application routes, database access, notification actions, and credentials are excluded.

Import the theme in your global stylesheet. For `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/inter";
@import "../styles/btcp-theme.css";
```

For `src/app/globals.css`, the theme import is `../../styles/btcp-theme.css`. Keep CSS imports at the top of the stylesheet. Remove or reconcile the starter shadcn token declarations below those imports so they do not override BTCP tokens. If Tailwind does not scan components outside your usual source directory, add an explicit `@source` for that directory.

The registry installs `@fontsource-variable/inter`, `@phosphor-icons/react`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, and `tw-animate-css` using the source project's dependency ranges. Next.js, React, and Tailwind are supplied by the consuming application.

## Components and tokens

Use `components/ui` for the familiar shadcn Button, Input, Badge, Card, Table, Label, Separator, Dialog, Tabs, and Select APIs. Use `components/btcp` for shared application layout and presentation primitives. Import `cn` from `lib/utils` to merge utility classes.

The BTCP layer exposes these reusable pieces:

| Component     | Purpose                                         | Main props                                                                                                           |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `AppShell`    | Responsive navigation, header, and content area | `project`, `navigation`, `activeHref`, `children`; optional `brand`, `workspace`, `breadcrumb`, `footer`, `docsHref` |
| `PageHeader`  | Page title and action row                       | `title`, `description`, `eyebrow`, `actions`                                                                         |
| `Panel`       | Bordered content section                        | `title`, `description`, `action`, `children`, `className`, `id`                                                      |
| `MetricCard`  | Summary value                                   | `label`, `value`, `detail`, `icon`                                                                                   |
| `StatusBadge` | Text status with a colored dot                  | `children`, `tone`: `success`, `warning`, `neutral`, or `info`                                                       |
| `EmptyState`  | Empty content message and action                | `title`, `description`, `icon`, `action`, `compact`                                                                  |
| `Notice`      | Informational or error message                  | `children`, `tone`: `info`, `warning`, or `error`                                                                    |

Navigation items accept `label`, `href`, `icon`, and optional `group`. Supported icon keys are `overview`, `notifications`, `people`, `activity`, `email`, `kit`, and `docs`. The shell does not fetch data or enforce authentication.

```tsx
import { Panel, PageHeader, StatusBadge } from "@/components/btcp/primitives";
import { Button } from "@/components/ui/button";

export function ServiceOverview() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Your deployment workspace"
        actions={<Button>Add service</Button>}
      />
      <Panel title="Deployment status">
        <div className="p-5">
          <StatusBadge tone="success">Healthy</StatusBadge>
        </div>
      </Panel>
    </>
  );
}
```

Prefer semantic classes such as `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, and `bg-primary`. Update shared CSS variables in `styles/btcp-theme.css` when changing the look across deployments. The initial theme is light; a dark theme is not included. Keep application-specific layout and business logic in the consuming app. Phosphor's React SSR exports can be used in server components; interactive icons may use its standard React entry point.

## Distribution and versioning

Current kit version: **0.1.0**. Source: `JoshMayerr/btcp-ui`, in `components/ui`, `components/btcp`, `lib/utils.ts`, and `styles/btcp-theme.css`.

Run `npx tsx scripts/build-ui-registry.ts` after editing shared source. The script discovers all TSX files in the two component directories and emits `public/r/btcp-ui.json` with embedded source plus a root `registry.json` index. The item includes `meta.version` and a deterministic `meta.sourceHash` covering source and dependencies, so copied installations can record exactly which kit snapshot they use. Bump the version in package.json when releasing changes to consumers.

Commit generated registry files and tag each release `v<version>`. Install using the matching tag in the raw GitHub URL shown above for a reproducible snapshot. Consumers own their installed source; updates are deliberate CLI installs and reviewed diffs rather than automatic runtime changes.

Registry file targets use shadcn's configured-directory placeholders. The theme uses an explicit project-root target. These follow the official [registry item specification](https://ui.shadcn.com/docs/registry/registry-item-json) and [registry examples](https://ui.shadcn.com/docs/registry/examples).
