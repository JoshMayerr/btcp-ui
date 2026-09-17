import {
  CubeIcon,
  StackIcon,
  CheckCircleIcon,
  ClockIcon,
  TrayIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AppShell, type NavItem } from "@/components/btcp/app-shell";
import {
  EmptyState,
  MetricCard,
  Notice,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/btcp/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstallKit, InteractiveExamples } from "@/components/ui-kit-examples";

export const metadata = { title: "UI kit · BTCP" };

const navigation: NavItem[] = [
  { label: "UI kit", href: "/", icon: "kit", group: "Design system" },
  {
    label: "Components",
    href: "/#components",
    icon: "overview",
    group: "Design system",
  },
  {
    label: "Foundations",
    href: "/#foundations",
    icon: "docs",
    group: "Design system",
  },
  {
    label: "Patterns",
    href: "/#patterns",
    icon: "notifications",
    group: "Design system",
  },
];
const colors = [
  { name: "Action", token: "primary", className: "bg-primary", hex: "#0051C3" },
  { name: "Brand", token: "brand", className: "bg-brand", hex: "#F48120" },
  {
    name: "Text",
    token: "foreground",
    className: "bg-foreground",
    hex: "#202020",
  },
  {
    name: "Canvas",
    token: "background",
    className: "bg-background",
    hex: "#FCFCFC",
  },
  { name: "Border", token: "border", className: "bg-border", hex: "#E2E3E5" },
  {
    name: "Success",
    token: "success",
    className: "bg-success",
    hex: "#18794E",
  },
];

export default function UIKitPage() {
  return (
    <AppShell
      docsHref="https://github.com/JoshMayerr/btcp-ui"
      project="BTCP UI"
      navigation={navigation}
      activeHref="/"
      breadcrumb="UI kit"
    >
      <PageHeader
        eyebrow="BTCP design system / v0.1.0"
        title="One kit. Every deployment."
        description="A shared foundation for our internal tools. Familiar console patterns, compact layouts, and components you can make your own."
        actions={
          <Badge variant="outline">
            <CubeIcon />
            shadcn/ui + Phosphor
          </Badge>
        }
      />
      <div className="btcp-tabs mb-6" aria-label="Jump to UI kit section">
        <a className="btcp-tab" href="#components">
          Components
        </a>
        <a className="btcp-tab" href="#foundations">
          Foundations
        </a>
        <a className="btcp-tab" href="#patterns">
          Patterns
        </a>
      </div>
      <div className="space-y-6">
        <InstallKit />
        <section id="components" className="scroll-mt-5 space-y-5">
          <div className="flex items-center gap-2">
            <StackIcon className="size-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Components</h2>
            <span className="text-xs text-muted-foreground">
              Small pieces, consistent behavior
            </span>
          </div>
          <InteractiveExamples />
        </section>
        <section id="foundations" className="scroll-mt-5 space-y-5">
          <h2 className="text-base font-semibold">Foundations</h2>
          <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
            <Panel
              title="Semantic colors"
              description="Use tokens rather than hard-coded colors in your components."
            >
              <div className="grid grid-cols-3 gap-4 p-5 sm:grid-cols-6">
                {colors.map((color) => (
                  <div key={color.token}>
                    <div
                      className={`mb-3 h-12 rounded-md border ${color.className}`}
                    />
                    <p className="text-xs font-medium">{color.name}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {color.hex}
                    </p>
                    <code className="text-[10px] text-muted-foreground">
                      {color.token}
                    </code>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel
              title="Typography"
              description="Inter · readable, compact, and deliberate."
            >
              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="text-[30px] font-semibold tracking-tight">Aa</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    30 px / Page title
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Section title</p>
                  <p className="mt-2 text-sm">Body text</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    12 px / Supporting text
                  </p>
                </div>
              </div>
            </Panel>
          </div>
          <Panel
            title="Status & labels"
            description="Pair color with words; every status should be understandable on its own."
          >
            <div className="flex flex-wrap items-center gap-3 p-5">
              <StatusBadge tone="success">Healthy</StatusBadge>
              <StatusBadge tone="warning">Needs attention</StatusBadge>
              <StatusBadge tone="info">Running</StatusBadge>
              <StatusBadge>Paused</StatusBadge>
              <span className="mx-1 h-5 border-l" />
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Production</Badge>
              <Badge variant="destructive">Failed</Badge>
            </div>
          </Panel>
        </section>
        <section id="patterns" className="scroll-mt-5 space-y-5">
          <div>
            <h2 className="text-base font-semibold">Console patterns</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Sample data below illustrates reusable layouts.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Example deployments"
              value="12"
              detail="Across your workspace"
              icon={<StackIcon />}
            />
            <MetricCard
              label="Example healthy services"
              value="24"
              detail="All systems operational"
              icon={<CheckCircleIcon />}
            />
            <MetricCard
              label="Example response time"
              value="142 ms"
              detail="Median over the last 24 hours"
              icon={<ClockIcon />}
            />
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
            <Panel
              title="Resource table"
              description="Illustrative rows · not connected to production."
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="pl-5">Example service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Environment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Example web app",
                      status: "Healthy",
                      tone: "success" as const,
                      env: "Production",
                    },
                    {
                      name: "Example worker",
                      status: "Running",
                      tone: "info" as const,
                      env: "Production",
                    },
                    {
                      name: "Example preview",
                      status: "Paused",
                      tone: "neutral" as const,
                      env: "Development",
                    },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="py-4 pl-5 font-medium">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {row.env}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Panel>
            <Panel title="Empty state">
              <EmptyState
                compact
                icon={<TrayIcon />}
                title="A useful place to start"
                description="Explain what belongs here, then point to one clear next step."
                action={
                  <Button variant="outline" size="sm" asChild>
                    <a href="#components">Explore components</a>
                  </Button>
                }
              />
            </Panel>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Notice tone="warning">
              Example notice: a service needs your attention. Describe the issue
              and give a practical next step.
            </Notice>
            <Notice tone="error">
              Example error: the change could not be saved. Keep the user's
              input so they can try again.
            </Notice>
          </div>
        </section>
        <p className="border-t pt-5 text-xs leading-5 text-muted-foreground">
          Built on shadcn/ui and Radix primitives, with Phosphor icons.
          Cloudflare-inspired visual language, adapted for BTCP internal tools.
        </p>
      </div>
    </AppShell>
  );
}
