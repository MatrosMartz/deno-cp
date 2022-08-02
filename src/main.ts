import { CPErrors } from '../types/enums.ts'

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
      const initFile = err.message.indexOf('\'')

      const file = err.message.slice(initFile).replaceAll('\'', '')

      showError(CPErrors.NoSuch, file)
    } else {
      throw err
    }
  }

}
else {
  const inputs = Deno.args.slice(0, -1)
  const output = <string>Deno.args.at(-1)

  console.log(inputs, output)
}
