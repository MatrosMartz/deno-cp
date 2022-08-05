import { join, basename } from 'path'

import { exists, srcsExist } from '../utils/errors.ts'

import { showErrors } from '../utils/show.ts'

export default async function (srcs: string[], dest: string): Promise<void> {

  const srcsStat = await srcsExist(srcs)

  const destStat = await exists(dest)
  
  if (srcs.length === 1) {
    if (srcsStat[0].isFile) {
      const srcText = await Deno.readFile(srcs[0])

      const destIsDir = ['\\', '/'].includes(<string>dest.at(-1))

      console.log(destIsDir)

      if (destIsDir) {
        if (destStat === 'NotFound' || !destStat.isDirectory) showErrors.NotADirectory(dest)


      } else {
        try {
          const destFile = await Deno.create(dest)
          
          await destFile.write(srcText)
        } catch (err) {
          if (err instanceof Deno.errors.NotFound) showErrors.NoSuch(dest)
        }
      }
    }
  } else {
    if (destStat === 'NotFound' || !destStat.isDirectory) showErrors.NotADirectory(dest)

    const newFiles = srcs.map(str => join(dest, basename(str)))
    console.log(newFiles, dest)
  }
}
