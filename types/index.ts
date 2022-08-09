import type { Dest } from './enums.ts'

export interface File {
  path: string
  stats: Deno.FileInfo
}

export interface DestType {
  path: string
  type: Dest
}

export interface CopyArgs {
  flags?: string[]
  srcs: File[]
  dest: DestType
}

export interface existErrorCallback {
  (path: string) : void
}

export interface ArgFunc {
  (args: string[], cb: existErrorCallback) : Promise<CopyArgs>
}
