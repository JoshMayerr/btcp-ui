"use client";
import { type ReactNode, type CSSProperties, type ComponentProps } from "react";
import {
  CaretRightIcon,
  ArrowUpRightIcon,
  CubeIcon,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Navigation, type NavItem } from "@/components/btcp/navigation";
export type { NavItem } from "@/components/btcp/navigation";
function ShellContent({
  children,
  brand = "BTCP",
  project,
  navigation,
  activeHref,
  breadcrumb = "Overview",
  footer,
  docsHref,
}: {
  children: ReactNode;
  brand?: string;
  workspace?: string;
  project: string;
  navigation: NavItem[];
  activeHref: string;
  breadcrumb?: string;
  footer?: ReactNode;
  docsHref?: string;
}) {
  const { setOpenMobile: setMobile } = useSidebar();
  const nav = (
    <>
      <a
        href={navigation[0]?.href || "/"}
        className="flex h-16 items-center gap-2.5 px-5"
      >
        <CubeIcon weight="fill" className="size-7 text-brand" />
        <span className="text-xl font-bold tracking-tight">{brand}</span>
      </a>
      <Navigation
        items={navigation}
        activeHref={activeHref}
        onNavigate={() => setMobile(false)}
      />
      {footer && (
        <div className="mt-auto border-t p-5 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </>
  );
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3"
      >
        Skip to content
      </a>
      <Sidebar collapsible="offcanvas" className="overflow-hidden">
        <SidebarTrigger className="absolute right-2 top-2 md:hidden" />
        {nav}
      </Sidebar>
      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger />
            <span className="truncate text-xs text-muted-foreground">
              {project}
            </span>
            <CaretRightIcon
              size={12}
              className="shrink-0 text-muted-foreground"
            />
            <span className="truncate text-xs">{breadcrumb}</span>
          </div>
          {docsHref && (
            <a
              className="btcp-link flex shrink-0 items-center gap-1 text-xs"
              href={docsHref}
            >
              UI kit
              <ArrowUpRightIcon size={13} />
            </a>
          )}
        </header>
        <main id="main-content" className="btcp-page">
          {children}
        </main>
      </div>
    </>
  );
}

export function AppShell(props: ComponentProps<typeof ShellContent>) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "232px" } as CSSProperties}>
      <ShellContent {...props} />
    </SidebarProvider>
  );
}
