import { showInfo, showVersion } from './show.ts'

import { CopyError, MissingFilesError } from 'copy-errors/errors.ts'

import getArgs from 'args/mod.ts'

import copy from './copy.ts'

const help    = ['--help',    '-h'].includes(Deno.args[0])
const version = ['--version', '-V'].includes(Deno.args[0])

try {
  if (!Deno.args.length)
    throw new MissingFilesError
  else if (help)
    showInfo()
  else if (version)
    showVersion()
  else
    copy(
      await getArgs(Deno.args)
    )
} catch (err) {
  if (err instanceof CopyError) {
    console.error(err.message)

    Deno.exit(1)
  }

  throw err
}
