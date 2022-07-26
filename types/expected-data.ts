import type { CPErrors } from './enums.ts'

import type { ReturnString } from './index.ts'

export interface ExpectedErrors {
  err: Record<CPErrors, ReturnString>
  status: Deno.ProcessStatus,
}

export interface ExpectedData {
  flag: {
    helpFlagOutput: string
    versionFlagOutput: string
  },
}
