import { join, basename } from 'path'

import { exists, srcsExist } from '../utils/errors.ts'

import { showErrors } from './show.ts'

export default async function (srcs: string[], dest: string): Promise<void> {

  const srcsStat = await srcsExist(srcs, showErrors.NoSuch)

  const destStat = await exists(dest)
  
  if (srcs.length === 1) {
    if (srcsStat[0].isFile) {
      const srcText = await Deno.readFile(srcs[0])

      const newFilePath =
        destStat === 'NotFound' || !destStat.isDirectory ?
        dest :
        join(dest, basename(srcs[0]))

      try {
        const destFile = await Deno.create(newFilePath)

        await destFile.write(srcText)
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) showErrors.NoSuch(dest)

        throw err
      }
    }
  } else {
    if (destStat === 'NotFound' || !destStat.isDirectory) showErrors.NotADirectory(dest)

    const newFiles = srcs.map(str => join(dest, basename(str)))
    console.log(newFiles, dest)
  }
}
