import { CPErrors } from '../types/enums.ts' 

import { showInfo, showVersion, showError } from './show.ts'

const firstArg = Deno.args[0]

const help = ['--help', '-h'].includes(firstArg)
const version = ['--version', '-V'].includes(firstArg)

if (!Deno.args.length) showError(CPErrors.MissingFiles)
else if (help) showInfo()
else if (version) showVersion()
else {
  const inputs = Deno.args.slice(0, -1)
  const output = <string>Deno.args.at(-1)

  console.log(inputs, output)
}
