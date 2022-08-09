import type { CopyArgs } from '../types/index.ts'

import { Dest } from '../types/enums.ts'

import { isNotFound } from '../utils/errors.ts'

import { showErrors } from './show.ts'

import { join, basename } from 'path'

export default async function ({ srcs, dest }: CopyArgs): Promise<void> {
  if (srcs.length === 1) {
    if (srcs[0].stats.isFile) {
      const srcText = await Deno.readFile(srcs[0].path)

      const newFilePath =
        dest.type === Dest.Dir ?
          join(dest.path, basename(srcs[0].path)) :
          dest.path

      try {
        const destFile = await Deno.create(newFilePath)

        await destFile.write(srcText)
      } catch (err) {
        if (isNotFound(err)) showErrors.NoSuch(dest)

        throw err
      }
    }
  }
  else if (dest.type !== Dest.Dir) showErrors.NotADirectory(dest.path)
}
