import type { CPErrors } from './enums.ts'

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
    [CPErrors.NoSuch]: (str: string) => string
    [CPErrors.Target]: (str: string) => string
    [CPErrors.FailedAccess]: (str: string) => string
    [CPErrors.CannotCreate]: (str: string) => string
    [CPErrors.CannotOverwrite]: (str: string) => string
  }
}

export interface ShowErrors {
  [CPErrors.MissingFiles]: () => never
  [CPErrors.NoSuch]: (str: string) => never
  [CPErrors.Target]: (str: string) => never
  [CPErrors.FailedAccess]: (str: string) => never
  [CPErrors.CannotCreate]: (str: string) => never
  [CPErrors.CannotOverwrite]: (str: string) => never
}
