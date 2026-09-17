import type { ReactNode } from "react";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="text-[28px] font-semibold tracking-[-0.035em] leading-tight md:text-[30px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 pt-1">{actions}</div>}
    </div>
  );
}
export function Panel({
  title,
  description,
  action,
  children,
  className,
  id,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("btcp-panel overflow-hidden", className)}>
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "success" | "warning" | "neutral" | "info";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium",
        {
          success: "bg-success-subtle text-success",
          warning: "bg-warning-subtle text-warning",
          neutral: "bg-muted text-muted-foreground",
          info: "bg-accent text-primary",
        }[tone],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="btcp-panel p-5">
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{label}</span>
        <span
          aria-hidden="true"
          className="text-muted-foreground [&>svg]:size-[18px]"
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-[30px] font-medium leading-none tracking-tight tabular-nums">
        {value}
      </p>
      {detail && <p className="mt-3 text-xs text-muted-foreground">{detail}</p>}
    </div>
  );
}
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-5 text-center",
        compact ? "py-9" : "py-14",
      )}
    >
      {icon && (
        <div
          className="mb-4 flex size-11 items-center justify-center rounded-xl border bg-muted/60 text-muted-foreground [&>svg]:size-6"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function Notice({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "warning" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-xs leading-5",
        tone === "error"
          ? "border-destructive/25 bg-red-50 text-destructive"
          : tone === "warning"
            ? "border-amber-200 bg-warning-subtle text-warning"
            : "border-blue-200 bg-accent/50 text-foreground",
      )}
    >
      <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
