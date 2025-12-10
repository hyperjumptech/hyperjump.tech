import { readFileSync, writeFileSync } from "fs";

const filePath = "locales/.generated/client/hooks.tsx";
let content = readFileSync(filePath, "utf-8");

// Remove ArgsProps from import
content = content.replace(/,\s*type ArgsProps,\s*\n/g, ",\n");
content = content.replace(/type ArgsProps,\s*\n/g, "");

// Add ArgsProps definition after react import if not present
if (!content.includes("type ArgsProps = Record<string, string>")) {
  content = content.replace(
    /import { useState, useEffect, useMemo } from "react";/,
    'import { useState, useEffect, useMemo } from "react";\n\ntype ArgsProps = Record<string, string>;'
  );
}

writeFileSync(filePath, content);
