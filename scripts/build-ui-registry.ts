import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const dependencyNames = [
  "@fontsource-variable/inter",
  "@phosphor-icons/react",
  "radix-ui",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "tw-animate-css",
  "sonner",
];

async function components(directory: string): Promise<string[]> {
  const entries = await readdir(path.join(root, directory), {
    withFileTypes: true,
  });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const relative = `${directory}/${entry.name}`;
      return entry.isDirectory()
        ? components(relative)
        : entry.name.endsWith(".tsx")
          ? [relative]
          : [];
    }),
  );
  return nested.flat().sort();
}

const paths = [
  ...(await components("components/ui")),
  ...(await components("components/btcp")),
  "lib/utils.ts",
  "hooks/use-mobile.ts",
  "styles/btcp-theme.css",
];
const files = await Promise.all(
  paths.map(async (source) => {
    const type = source.startsWith("components/ui/")
      ? "registry:ui"
      : source.startsWith("components/")
        ? "registry:component"
        : source.startsWith("hooks/")
          ? "registry:hook"
          : source.startsWith("lib/")
            ? "registry:lib"
            : "registry:file";
    const target = source.startsWith("components/ui/")
      ? source.replace("components/ui/", "@ui/")
      : source.startsWith("components/")
        ? source.replace("components/", "@components/")
        : source.startsWith("hooks/")
          ? source.replace("hooks/", "@hooks/")
          : source.startsWith("lib/")
            ? source.replace("lib/", "@lib/")
            : `~/${source}`;
    return {
      path: source,
      type,
      target,
      content: await readFile(path.join(root, source), "utf8"),
    };
  }),
);
const dependencies = dependencyNames.map((name) => {
  const version =
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name];
  if (!version)
    throw new Error(
      `UI registry dependency ${name} is missing from package.json`,
    );
  return `${name}@${version}`;
});
const sourceHash = createHash("sha256")
  .update(JSON.stringify({ files, dependencies }))
  .digest("hex");
const item = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "btcp-ui",
  type: "registry:block",
  title: "BTCP UI",
  description:
    "A compact operations UI with shadcn components, Phosphor icons, and shared BTCP design tokens.",
  dependencies,
  files,
  docs: "Import styles/btcp-theme.css at the top of your global stylesheet after the Tailwind import; reconcile existing theme declarations so they do not override BTCP tokens. See docs/ui-kit.md in the source repository. This kit installs shared UI source only; bring your own routes and data.",
  meta: {
    version: packageJson.version,
    sourceHash,
    source: "JoshMayerr/btcp-ui",
  },
};
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "btcp",
  homepage: "https://github.com/JoshMayerr/btcp-ui",
  items: [
    { ...item, files: files.map(({ content: _content, ...file }) => file) },
  ],
};
await mkdir(path.join(root, "public/r"), { recursive: true });
await writeFile(
  path.join(root, "public/r/btcp-ui.json"),
  `${JSON.stringify(item, null, 2)}\n`,
);
await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
);
console.log(
  `Built BTCP UI v${item.meta.version}: ${files.length} files (${sourceHash.slice(0, 12)}).`,
);
