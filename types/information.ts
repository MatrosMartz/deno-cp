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
    [CPErrors.NotADirectory]: (str: string) => string
    [CPErrors.CannotOverwrite]: (str: string) => string
  }
}

export interface ShowErrors {
  [CPErrors.MissingFiles]: () => never
  [CPErrors.NoSuch]: (str: string) => never
  [CPErrors.NotADirectory]: (str: string) => never
  [CPErrors.CannotOverwrite]: (str: string) => never
}
