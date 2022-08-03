import { join } from 'path'

import { CPErrors } from '../types/enums.ts'

import { getFileError } from '../utils/errors.ts'

import { showInfo, showVersion, showError } from './show.ts'

const firstArg = Deno.args[0]

const help = ['--help', '-h'].includes(firstArg)
const version = ['--version', '-V'].includes(firstArg)

if (!Deno.args.length) showError(CPErrors.MissingFiles)
else if (help) showInfo()
else if (version) showVersion()
else if (Deno.args.length === 2) {
  try {
    const srcPath = Deno.args[0]
    const destPath = Deno.args[1]

    const srcStats = await Deno.lstat(srcPath)

    if (srcStats.isFile) {
      const srcText = await Deno.readFile(srcPath)

      const finPath = ['\\', '/'].includes(<string>destPath.at(-1)) ? destPath + srcPath : destPath

      const destFile = await Deno.create(finPath)

      await destFile.write(srcText)
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {

      const file = getFileError(err.message)

      showError(CPErrors.NoSuch, file)
    } else {
      throw err
    }
  }

}
else {
  try {
    const srcs = Deno.args.slice(0, -1)
    const dest = <string>Deno.args.at(-1)

    const destStat = await Deno.stat(dest)

    if (destStat.isDirectory) {
      const newFiles = srcs.map(str => join(dest, str))
      console.log(newFiles, dest)
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {

      const file = getFileError(err.message)

      showError(CPErrors.NotADirectory, file)
    } else {
      throw err
    }
  }
}
