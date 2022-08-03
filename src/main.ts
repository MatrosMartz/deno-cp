import { join, basename } from 'path'

import { CPErrors } from '../types/enums.ts'

import { exists, srcsExist } from '../utils/errors.ts'

import { showInfo, showVersion, showError } from '../utils/show.ts'

const firstArg = Deno.args[0]

const help = ['--help', '-h'].includes(firstArg)
const version = ['--version', '-V'].includes(firstArg)

if (!Deno.args.length) showError(CPErrors.MissingFiles)
else if (help) showInfo()
else if (version) showVersion()
else {
  const srcs = Deno.args.slice(0, -1)
  const dest = <string>Deno.args.at(-1)

  const srcsStat = await srcsExist(srcs)

  const destStat = await exists(dest)

  const srcsBasename = srcs.map(str => basename(str))

  if (srcs.length === 1) {
    if (srcsStat[0].isFile) {
      const srcText = await Deno.readFile(srcs[0])

      const destIsDir = ['\\', '/'].includes(<string>dest.at(-1))

      if (destIsDir) {
        if (destStat === 'NotFound' || !destStat.isDirectory) showError(CPErrors.NotADirectory, dest)


      } else {
        const destFile = await Deno.create(dest)
        
        await destFile.write(srcText)
      }
    }
  }

  if (destStat === 'NotFound' || !destStat.isDirectory) showError(CPErrors.NotADirectory, dest)
  else {
    const newFiles = srcs.map(str => join(dest, str))
    console.log(newFiles, dest)
  }
}