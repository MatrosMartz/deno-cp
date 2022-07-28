import expectedErrors from '../test-data/expected-errors.ts'
import { CPErrors } from './enums.ts'

type ExcErrorKeys = `${CPErrors}${'Alt' | ''}`

type ExcError = {
  [i in ExcErrorKeys]?: string
}

export interface ExpectedErrors {
  err: ExcError
  status: Deno.ProcessStatus
}

export interface ExpectedOuts {
  examplesFiles: string
  helpFlag: string
  versionFlag: string
}
