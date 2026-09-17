"use client";

import { useId, useState } from "react";
import {
  SquaresFourIcon,
  BellIcon,
  UsersIcon,
  ClockCounterClockwiseIcon,
  EnvelopeSimpleIcon,
  StackIcon,
  BookOpenIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  icon: keyof typeof icons;
  group?: string;
} & (
  { href: string; children?: never } | { href?: never; children: NavItem[] }
);

function filterItems(items: NavItem[], query: string): NavItem[] {
  return items.flatMap((item): NavItem[] => {
    if (item.label.toLowerCase().includes(query)) return [item];
    if (!item.children) return [];
    const children = filterItems(item.children, query);
    return children.length ? [{ ...item, children }] : [];
  });
}
function containsActive(item: NavItem, href: string): boolean {
  return (
    item.href === href ||
    !!item.children?.some((child) => containsActive(child, href))
  );
}
function NavigationItem({
  item,
  activeHref,
  searching,
  onNavigate,
}: {
  item: NavItem;
  activeHref: string;
  searching: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const id = useId();
  const Icon = icons[item.icon];
  const active = containsActive(item, activeHref);
  const open = searching || expanded;
  if (item.children)
    return (
      <li>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
            active && "text-foreground",
          )}
        >
          <Icon size={18} className="shrink-0" />
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          <CaretRightIcon
            size={13}
            className={cn(
              "transition-transform motion-reduce:transition-none",
              open && "rotate-90",
            )}
          />
        </button>
        <ul
          id={id}
          hidden={!open}
          className="mb-2 ml-5 space-y-1 border-l border-border pl-2"
        >
          {item.children.map((child) => (
            <NavigationItem
              key={child.href || child.label}
              item={child}
              activeHref={activeHref}
              searching={searching}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </li>
    );
  return (
    <li>
      <a
        href={item.href}
        onClick={onNavigate}
        aria-current={activeHref === item.href ? "page" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
          activeHref === item.href
            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            : "text-sidebar-foreground",
        )}
      >
        <Icon
          size={16}
          className="shrink-0"
          weight={activeHref === item.href ? "fill" : "regular"}
        />
        <span>{item.label}</span>
      </a>
    </li>
  );
}
export function Navigation({
  items,
  activeHref,
  onNavigate,
}: {
  items: NavItem[];
  activeHref: string;
  onNavigate: () => void;
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const filtered = filterItems(items, needle);
  return (
    <>
      <div className="relative mx-3 mb-5">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Search navigation"
          placeholder="Search navigation"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && query) {
              event.preventDefault();
              event.stopPropagation();
              setQuery("");
            }
          }}
          className="pl-8 pr-8 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-0.5 top-0.5 size-8"
            aria-label="Clear navigation search"
            onClick={() => setQuery("")}
          >
            <XIcon />
          </Button>
        )}
      </div>
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-y-auto px-3 pb-4"
      >
        <ul className="space-y-1">
          {filtered.map((item) => (
            <NavigationItem
              key={item.href || item.label}
              item={item}
              activeHref={activeHref}
              searching={!!needle}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
        {!filtered.length && (
          <p role="status" className="px-3 py-4 text-xs text-muted-foreground">
            No matching pages. Try another search.
          </p>
        )}
      </nav>
    </>
  );
}
