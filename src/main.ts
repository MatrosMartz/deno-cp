import { showInfo, showVersion, showErrors } from './show.ts'

import getArgs from '../utils/args.ts'

import copy from './copy.ts'

const help    = ['--help',    '-h'].includes(Deno.args[0])
const version = ['--version', '-V'].includes(Deno.args[0])

if (!Deno.args.length)
  showErrors.MissingFiles()
else if (help)
  showInfo()
else if (version)
  showVersion()
else
  copy(
    await getArgs(Deno.args, showErrors.NoSuch)
  )
