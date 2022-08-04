import { CPErrors } from '../types/enums.ts'

import { showInfo, showVersion, showError } from '../utils/show.ts'

import copy from './copy.ts'

const help    = ['--help',    '-h'].includes(Deno.args[0])
const version = ['--version', '-V'].includes(Deno.args[0])

if (!Deno.args.length)
  showError(CPErrors.MissingFiles)
else if (help)
  showInfo()
else if (version)
  showVersion()
else
  copy(Deno.args.slice(0, -1), <string>Deno.args.at(-1))
