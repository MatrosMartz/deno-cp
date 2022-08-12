import type { CopyArgs } from '../types/index.ts'

import { DestType } from '../types/enums.ts'

import { isNotFound } from '../utils/errors.ts'

import { showErrors } from './show.ts'

import { join, basename } from 'path'

export default async function ({ srcs, dest }: CopyArgs): Promise<void> {
  if (srcs.length === 1) {
    const [src] = srcs
    if (!src.stats.isDirectory && dest.type === DestType.NoSuchDir)
      showErrors.NotADirectory(dest.path)

    if (src.stats.isFile) {
      const srcText = await Deno.readFile(src.path)

      const newFilePath =
        dest.type === DestType.Dir ?
          join(dest.path, basename(src.path)) :
          dest.path

      try {
        const destFile = await Deno.create(newFilePath)

        await destFile.write(srcText)
      } catch (err) {
        if (isNotFound(err)) showErrors.NoSuch(newFilePath)

        throw err
      }
    }
  }
  else if (dest.type !== DestType.Dir) showErrors.NotADirectory(dest.path)
}
