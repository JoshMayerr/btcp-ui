"use client";

import { useState, type FormEvent } from "react";
import {
  CheckIcon,
  CopyIcon,
  PlusIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notice, Panel } from "@/components/btcp/primitives";

const installCommand =
  "npx shadcn@latest add https://raw.githubusercontent.com/JoshMayerr/btcp-ui/v0.1.0/public/r/btcp-ui.json";

export function InstallKit() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <Panel
      title="Use it in your next deployment"
      description="Add the shared components and theme to a shadcn-ready Next.js project."
    >
      <div className="p-5">
        <div className="flex items-start gap-3 rounded-md border bg-muted/60 p-3">
          <code className="min-w-0 flex-1 break-all text-xs leading-6">
            {installCommand}
          </code>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={copied ? "Command copied" : "Copy install command"}
            onClick={copy}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>
        <p aria-live="polite" className="mt-2 text-xs text-muted-foreground">
          {error
            ? "Clipboard unavailable. Select and copy the command above."
            : copied
              ? "Copied to clipboard."
              : "Source lives in your project. Customize once, reuse everywhere."}
        </p>
        <details className="mt-4 border-t pt-3 text-xs">
          <summary className="cursor-pointer font-medium">
            Finish setup in your app
          </summary>
          <p className="mt-3 leading-5 text-muted-foreground">
            Requires React 19, Tailwind CSS 4, and shadcn. Add these imports at
            the top of app/globals.css, and remove conflicting starter theme
            tokens.
          </p>
          <pre className="mt-3 overflow-auto rounded-md bg-muted p-3 text-[11px] leading-6">
            <code>
              {
                '@import "tailwindcss";\n@import "tw-animate-css";\n@import "@fontsource-variable/inter";\n@import "../styles/btcp-theme.css";'
              }
            </code>
          </pre>
          <p className="mt-2 leading-5 text-muted-foreground">
            For src/app/globals.css, use ../../styles/btcp-theme.css. Customize
            the semantic tokens in that file to theme your deployment.
          </p>
        </details>
      </div>
    </Panel>
  );
}

export function InteractiveExamples() {
  const [action, setAction] = useState(
    "Choose an action to preview its feedback.",
  );
  const [frequency, setFrequency] = useState("daily");
  const [saved, setSaved] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState("");
  const [created, setCreated] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }
  function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreated(project.trim());
    setDialogOpen(false);
  }
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Buttons"
          description="A clear primary action, quiet secondary actions."
        >
          <div className="space-y-5 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => setAction("Primary action selected.")}>
                <PlusIcon />
                Primary
              </Button>
              <Button
                variant="outline"
                onClick={() => setAction("Outline action selected.")}
              >
                Outline
              </Button>
              <Button
                variant="secondary"
                onClick={() => setAction("Secondary action selected.")}
              >
                Secondary
              </Button>
              <Button
                variant="ghost"
                onClick={() => setAction("Ghost action selected.")}
              >
                Ghost
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  setAction("Destructive style previewed. Nothing was deleted.")
                }
              >
                Destructive
              </Button>
              <Button
                variant="link"
                onClick={() => setAction("Link action selected.")}
              >
                Link
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t pt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAction("Small button selected.")}
              >
                Small
              </Button>
              <Button disabled>Disabled</Button>
              <Button disabled>
                <SpinnerGapIcon className="animate-spin" />
                Processing
              </Button>
              <span className="text-xs text-muted-foreground">
                32 / 36 px heights
              </span>
            </div>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {action}
            </p>
          </div>
        </Panel>
        <Panel
          title="Fields & selection"
          description="Visible labels, focused inputs, useful feedback."
        >
          <form className="space-y-4 p-5" onSubmit={submit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="demo-email">Recipient email</Label>
                <Input
                  id="demo-email"
                  type="email"
                  required
                  defaultValue="team@example.com"
                  onChange={() => setSaved(false)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-frequency">Frequency</Label>
                <Select
                  value={frequency}
                  onValueChange={(value) => {
                    setFrequency(value);
                    setSaved(false);
                  }}
                >
                  <SelectTrigger id="demo-frequency" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="outline" size="sm">
                Save example
              </Button>
              <p className="text-xs text-muted-foreground" aria-live="polite">
                {saved
                  ? `Example saved locally · ${frequency} digest.`
                  : "Demo only. No email will be sent."}
              </p>
            </div>
          </form>
        </Panel>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Tabs"
          description="Keyboard-friendly navigation within a panel."
        >
          <Tabs defaultValue="overview" className="gap-0">
            <div className="border-b px-5">
              <TabsList variant="line" aria-label="Example panel">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="overview"
              className="p-5 text-xs leading-6 text-muted-foreground"
            >
              Use tabs to keep related views together. This overview is example
              content.
            </TabsContent>
            <TabsContent
              value="settings"
              className="p-5 text-xs leading-6 text-muted-foreground"
            >
              Settings belong close to the resource they control. Keep forms
              short and label every field.
            </TabsContent>
            <TabsContent
              value="history"
              className="p-5 text-xs leading-6 text-muted-foreground"
            >
              No example events yet. Show timestamps and outcomes when activity
              is available.
            </TabsContent>
          </Tabs>
        </Panel>
        <Panel
          title="Dialogs"
          description="Focused tasks with a clear way back."
        >
          <div className="space-y-3 p-5">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusIcon />
                  Create example project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={create} className="space-y-5">
                  <DialogHeader>
                    <DialogTitle>Create an example project</DialogTitle>
                    <DialogDescription>
                      This demonstrates the dialog pattern. It will not create a
                      deployment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="demo-project">Project name</Label>
                    <Input
                      id="demo-project"
                      value={project}
                      onChange={(event) => setProject(event.target.value)}
                      placeholder="My internal tool"
                      maxLength={80}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={!project.trim()}>
                      Create example
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {created
                ? `“${created}” created in this preview only.`
                : "Try the form, Escape key, and focus handling."}
            </p>
          </div>
        </Panel>
      </div>
      <Notice>
        All controls on this page are interactive previews. They never change
        your watchlist, email settings, or deployments.
      </Notice>
    </>
  );
}
