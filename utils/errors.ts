import type { existErrorCallback } from '../types/index.ts'

import { Dest } from '../types/enums.ts'

export function isNotFound(err: unknown) {
  return err instanceof Deno.errors.NotFound || (<Error>err).message.includes('os error 123')
}

export async function getDestType(path: string) {
  try {
    const stat = await Deno.stat(path)

    if (stat.isDirectory) return Dest.Dir
    if (stat.isFile)      return Dest.File
    if (stat.isSymlink)   return Dest.Link
  } catch (err) {
    if (isNotFound(err)) return Dest.NoSuch

    throw err
  }
}

export function rejectSrc(path: string, cb: existErrorCallback) {
  return (err: unknown) => {
    if (isNotFound(err)) cb(path)

    throw err
  }
}
