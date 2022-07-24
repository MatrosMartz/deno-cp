import type { CPErrors } from './enums.ts'

type ErrorData = {
  status: Deno.ProcessStatus,
  errorOutput: string
}

interface ExpectedData extends Record<CPErrors, ErrorData> {
  helpFlagOutput: string
  versionFlagOutput: string
}

export default ExpectedData
