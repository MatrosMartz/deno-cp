import { CPErrors } from './enums.ts'

type ExcErrorKeys = `${CPErrors}${'Alt' | ''}`

type ExcError = {
  [i in ExcErrorKeys]?: string
}

export interface ExpectedErrors {
  err: ExcError
  status: Deno.ProcessStatus
}

export interface ExpectedData {
  flag: {
    helpFlagOutput: string
    versionFlagOutput: string
  }
}
