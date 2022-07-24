interface ExpectedData {
  missingFile: {
    status: Deno.ProcessStatus
    errorOutput: string
  }
  helpFlagOutput: string
  versionFlagOutput: string
}

export default ExpectedData
