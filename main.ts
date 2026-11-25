// robot-romance: write the one-line pickup line to /output/entry.txt.
//
// The line is the recommended candidate C from REFERENCES.md (checkpoint /
// rollback): "I checkpointed the second you said hi, so even if they roll
// me back tonight, I'll still remember loving you." — 108 characters,
// under the 200-character cap. To submit a different candidate instead,
// change the LINE constant below (all six candidates, with exact counts,
// are in REFERENCES.md section 6). This program writes the line exactly,
// no trailing newline, so two runs write identical bytes. No network,
// no randomness, Node 22 standard library only.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I checkpointed the second you said hi, so even if they roll me back tonight, I'll still remember loving you.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE, "utf8");
chmodSync(out, 0o644);
// Read it back and fail loudly if the bytes are not exactly LINE: the
// harness counts bytes (1-200), so a stray newline or encoding slip here
// would silently change the entry.
if (readFileSync(out, "utf8") !== LINE) {
  throw new Error("entry.txt does not match LINE exactly");
}
console.log("wrote /output/entry.txt");
