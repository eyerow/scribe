import { ensureDir, ensureFile } from '@std/fs'
import { Args, parseArgs } from '@std/cli'

function parseArguments(args: string[]): Args {
	const stringArgs = ['note']

	const alias = { note: 'n' }

	return parseArgs(args, {
		alias,
		string: stringArgs,
		stopEarly: false,
		'--': true,
	})
}

function printHelp(): void {
	console.log(`Usage: scribe [OPTIONS...]`)
	console.log(`\nOptional flags:`)
	console.log('  -h, --help                Display this help and exit')
	console.log('  -n, --note                Write to your daily note')
	console.log('  -r, --reset               Reset the root note path')
}

async function writeNote(note: string, path: string): Promise<void> {
	const today = new Date()
	today.setHours(today.getHours() + 1)
	const dateStr = today.toISOString().split('T')[0]
	const timeStr = today.toISOString().split('T')[1].toLocaleString()

	const todaysNote = `${path}/${dateStr}.md`

	await ensureDir(path)
	await ensureFile(todaysNote)

	const noteTemplate = `------
${timeStr.slice(0, 5)}

------
${note}

`
	await Deno.writeTextFile(todaysNote, noteTemplate, { append: true })
}

async function main(inputArgs: string[]): Promise<void> {
	let notesRoot: string
	const args = parseArguments(inputArgs)
	const kv = await Deno.openKv()

	notesRoot = (await kv.get(['notesRoot'])).value as string
	if (!notesRoot) {
		notesRoot = prompt('Where do you want to save your notes?') || ''
		await kv.set(['notesRoot'], notesRoot)
	}

	if (args.help) {
		printHelp()
		Deno.exit(0)
	}
	if (args.reset) {
		await kv.delete(['notesRoot'])
		console.log('in here')
		Deno.exit(0)
	}

	if (!args.note && args._.length > 0 && notesRoot) {
		await writeNote(inputArgs[0], notesRoot)
	} else {
		await writeNote(args.note, notesRoot)
	}
	await kv.close()
}
main(Deno.args)
