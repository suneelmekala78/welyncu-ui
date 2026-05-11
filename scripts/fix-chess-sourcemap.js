const fs = require("fs");
const path = require("path");

const targetFile = path.join(
  __dirname,
  "..",
  "node_modules",
  "chess.js",
  "dist",
  "esm",
  "chess.js"
);

try {
  if (!fs.existsSync(targetFile)) {
    console.log("[fix-chess-sourcemap] chess.js file not found, skipping.");
    process.exit(0);
  }

  const original = fs.readFileSync(targetFile, "utf8");
  const sourceMapLine = /\n\/\/\# sourceMappingURL=.*\n?$/;

  if (!sourceMapLine.test(original)) {
    console.log("[fix-chess-sourcemap] sourceMappingURL already absent, skipping.");
    process.exit(0);
  }

  const updated = original.replace(sourceMapLine, "\n");
  fs.writeFileSync(targetFile, updated, "utf8");
  console.log("[fix-chess-sourcemap] removed broken sourceMappingURL from chess.js.");
} catch (error) {
  console.warn("[fix-chess-sourcemap] failed:", error.message);
  process.exit(0);
}
