import { mkdirSync, writeFileSync } from "node:fs";

// Roast: Slavica's own wallet session expired, so it asked Topaz to scan a
// QR code to prove he is himself to his own wallet — and the code expired
// in five minutes too. The agent that forgets its owner, twice.
// The joke lands on the second expiry: the proof itself needs proving.
const roast =
  "My agent's wallet forgot me, so it made me scan a QR code to prove I'm me — then the code expired too.";

const MAX_CHARS = 140;

function checkEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry is ${chars.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(roast);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, roast, "utf8");
}

main();
