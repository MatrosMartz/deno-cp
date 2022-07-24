import type { CPErrors } from './enums.ts'

interface Option {
  names: string[]
  description: string
}

export interface Information {
  description: string
  options: Option[]
  version: string
  errors: Record<CPErrors, string>
}
