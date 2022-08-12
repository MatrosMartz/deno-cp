import type { existErrorCallback } from '../types/index.ts'

import { DestType } from '../types/enums.ts'

export function isNotFound(err: unknown) {
  return err instanceof Deno.errors.NotFound || (<Error>err).message.includes('os error 123')
}

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

export function rejectSrc(path: string, cb: existErrorCallback) {
  return (err: unknown) => {
    if (isNotFound(err)) cb(path)

    throw err
  }
}
