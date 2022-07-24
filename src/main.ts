import { showInfo, showVersion } from './show.ts'

const firstArg = Deno.args[0]

const help = ['--help', '-h'].includes(firstArg)
const version = ['--version', '-V'].includes(firstArg)

if (!Deno.args.length) {
  console.error('cp: missing file operand\nTry \'cp --help\' for more information.')
  Deno.exit(1)
}
else if (help) showInfo()
else if (version) showVersion()
else {
  const inputs = Deno.args.slice(0, -1)
  const output = <string>Deno.args.at(-1)

  console.log(inputs, output)
}
