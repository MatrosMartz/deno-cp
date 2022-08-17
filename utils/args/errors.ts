import { DestType } from './types/enums.ts'

import { isNotFound } from 'copy-errors/funcs.ts'

export async function getDestType(path: string) {
  try {
    const stat = await Deno.stat(path)

    if (stat.isDirectory) return DestType.Dir
    if (stat.isFile)      return DestType.File
    if (stat.isSymlink)   return DestType.Link
  } catch (err) {
    if (isNotFound(err))  {
      if (['\\', '/'].includes(<string>path.at(-1))) return DestType.NoSuchDir
      
      return DestType.NoSuch
    }

    throw err
  }
}