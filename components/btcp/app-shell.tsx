"use client";
import { useState, type ReactNode } from "react";
import {
  SquaresFourIcon,
  BellIcon,
  UsersIcon,
  ClockCounterClockwiseIcon,
  EnvelopeSimpleIcon,
  StackIcon,
  BookOpenIcon,
  CaretRightIcon,
  SidebarSimpleIcon,
  ArrowUpRightIcon,
  CubeIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
const icons = {
  overview: SquaresFourIcon,
  notifications: BellIcon,
  people: UsersIcon,
  activity: ClockCounterClockwiseIcon,
  email: EnvelopeSimpleIcon,
  kit: StackIcon,
  docs: BookOpenIcon,
};
export type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof icons;
  group?: string;
};
export function AppShell({
  children,
  brand = "BTCP",
  workspace = "Deployments",
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
  const [mobile, setMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const nav = (
    <>
      <a
        href={navigation[0]?.href || "/"}
        className="flex h-16 items-center gap-2.5 px-5"
      >
        <CubeIcon weight="fill" className="size-7 text-brand" />
        <span className="text-xl font-bold tracking-tight">
          {brand}
          <span className="ml-1.5 text-xs font-normal tracking-normal text-muted-foreground">
            console
          </span>
        </span>
      </a>
      <div className="mx-3 mb-5 flex items-center gap-3 rounded-md border bg-white px-3 py-2.5">
        <div className="flex size-7 items-center justify-center rounded bg-muted text-xs font-semibold">
          {brand.slice(0, 2)}
        </div>
        <div>
          <p className="text-xs font-medium">{workspace}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Internal workspace
          </p>
        </div>
      </div>
      <nav aria-label="Main navigation" className="px-3">
        {navigation.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.href}>
              {item.group &&
                (i === 0 || navigation[i - 1].group !== item.group) && (
                  <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[.08em] text-muted-foreground">
                    {item.group}
                  </p>
                )}
              <a
                href={item.href}
                onClick={() => setMobile(false)}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={cn(
                  "mb-1 flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] hover:bg-muted",
                  activeHref === item.href
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-sidebar-foreground",
                )}
              >
                <Icon
                  size={18}
                  weight={activeHref === item.href ? "fill" : "regular"}
                />
                {item.label}
                {activeHref === item.href && (
                  <CaretRightIcon size={12} className="ml-auto" />
                )}
              </a>
            </div>
          );
        })}
      </nav>
      <div className="mt-auto border-t p-5 text-[11px] leading-5 text-muted-foreground">
        {footer || (
          <>
            <p className="font-medium text-foreground">
              {brand} internal tools
            </p>
            <p>Built for the way we work.</p>
          </>
        )}
      </div>
    </>
  );
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3"
      >
        Skip to content
      </a>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-[232px] flex-col border-r bg-sidebar lg:flex",
          collapsed && "lg:hidden",
        )}
      >
        {nav}
      </aside>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="left-0 top-0 h-dvh w-[280px] max-w-[85vw] translate-x-0 translate-y-0 gap-0 rounded-none border-y-0 p-0 sm:max-w-[280px]">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <DialogDescription className="sr-only">
            Workspace navigation
          </DialogDescription>
          <div className="flex h-full flex-col bg-sidebar">{nav}</div>
        </DialogContent>
      </Dialog>
      <div className={cn(!collapsed && "lg:pl-[232px]")}>
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Open navigation"
              className="lg:hidden"
              onClick={() => setMobile(true)}
            >
              <SidebarSimpleIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <SidebarSimpleIcon />
            </Button>
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
    </div>
  );
}
