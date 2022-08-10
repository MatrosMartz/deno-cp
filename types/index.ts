import type { DestType } from './enums.ts'

export interface File {
  path: string
  stats: Deno.FileInfo
}

export interface DestInterface {
  path: string
  type: DestType
}

export interface CopyArgs {
  flags?: string[]
  srcs: File[]
  dest: DestInterface
}

export interface existErrorCallback {
  (path: string) : never
}

export interface ArgFunc {
  (args: string[], cb: existErrorCallback) : Promise<CopyArgs>
}
