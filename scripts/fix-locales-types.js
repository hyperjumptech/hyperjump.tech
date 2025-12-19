import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "locales", ".generated", "types.ts");

if (!fs.existsSync(filePath)) {
  console.warn(
    `[fix-locales-types] File not found at ${filePath}, skipping patch.`
  );
  process.exit(0);
}

const content = fs.readFileSync(filePath, "utf8");

if (content.includes("ArgsProps")) {
  // Already patched
  process.exit(0);
}

const patched = `${content.trimEnd()}\n\nexport type ArgsProps = Record<string, string>;\n`;

fs.writeFileSync(filePath, patched, "utf8");
console.log(
  "[fix-locales-types] Added ArgsProps type to locales .generated types."
);
