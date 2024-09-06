import { ensureDir, ensureFile } from "@std/fs";
import { Args, parseArgs } from "@std/cli";
const NOTES_DIR = "./notes";

function parseArguments(args: string[]): Args {
  const stringArgs = ["note"];

  const alias = { note: "n" };

  return parseArgs(args, {
    alias,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });
}

function printHelp(): void {
  console.log(`Usage: scribe [OPTIONS...]`);
  console.log(`\nOptional flags:`);
  console.log("  -h, --help                Display this help and exit");
  console.log("  -n, --note                Write to your daily note");
}

async function writeNote(note: string): Promise<void> {
  const today = new Date();
  today.setHours(today.getHours() + 1);
  const dateStr = today.toISOString().split("T")[0];
  const timeStr = today.toISOString().split("T")[1].toLocaleString();

  const todaysNote = `${NOTES_DIR}/${dateStr}.md`;

  await ensureDir(NOTES_DIR);
  await ensureFile(todaysNote);

  const noteTemplate = `---
${timeStr.slice(0, 5)}

---
${note}

`;
  await Deno.writeTextFile(todaysNote, noteTemplate, { append: true });
}

async function main(inputArgs: string[]): Promise<void> {
  const args = parseArguments(inputArgs);

  if (args.help) {
    printHelp();
    Deno.exit(0);
  }

  const note: string = args.note;

  await writeNote(note);
}
main(Deno.args);
