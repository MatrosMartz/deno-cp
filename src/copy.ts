import type { CopyArgs } from 'args/types/main.ts'

import { DestType } from 'args/types/enums.ts'

import { isNotFound } from 'copy-errors/funcs.ts'

import { TargetError, NoSuchError, FailedAccessError } from 'copy-errors/errors.ts'

import { join, basename } from 'path'

export default async function ({ srcs, dest }: CopyArgs): Promise<void> {
  if (srcs.length === 1) {
    const [src] = srcs
    if (!src.stats.isDirectory && dest.type === DestType.NoSuchDir)
      throw new FailedAccessError(dest.path)

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
        if (isNotFound(err)) throw new NoSuchError(newFilePath)

        throw err
      }
    }
  }
  else if (dest.type !== DestType.Dir) throw new TargetError(dest.path)
}
