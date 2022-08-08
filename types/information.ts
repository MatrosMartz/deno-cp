import type { CPErrors } from './enums.ts'

import type { ReturnString } from './index.ts'

interface Option {
  names: string[]
  description: string
}

export interface Information {
  description: string
  options: Option[]
  version: string
  errors: {
    [CPErrors.MissingFiles]: string
    [CPErrors.NoSuch]: ReturnString
    [CPErrors.NotADirectory]: ReturnString
  }
}

export interface ShowErrors {
  [CPErrors.MissingFiles]: () => never
  [CPErrors.NoSuch]: ReturnString
  [CPErrors.NotADirectory]: ReturnString
}
