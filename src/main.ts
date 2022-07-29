import { CPErrors } from '../types/enums.ts'

import { showInfo, showVersion, showError } from './show.ts'

const firstArg = Deno.args[0]

const help = ['--help', '-h'].includes(firstArg)
const version = ['--version', '-V'].includes(firstArg)

async function exist(src: string) {
  try {
    const stat = await Deno.lstat(src)

    return {
      exist: true,
      stat
    }
  } catch (err) {
    if (err.name === 'NotFound') return {
      exist: false
    }

    throw err
  }
}

if (!Deno.args.length) showError(CPErrors.MissingFiles)
else if (help) showInfo()
else if (version) showVersion()
else if (Deno.args.length === 2) {
  const srcDir = Deno.args[0]
  const destDir = Deno.args[1]

  const src = await exist(srcDir)
  const dest = await exist(destDir)

  if (src.exist && dest.exist) {
    console.log(src.stat?.isFile, dest.stat?.isDirectory)
  }
}
else {
  const inputs = Deno.args.slice(0, -1)
  const output = <string>Deno.args.at(-1)

  console.log(inputs, output)
}
