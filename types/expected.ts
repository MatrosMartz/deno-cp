interface ExcError {
  MissingFiles: string
  NoSuch: {
    File: string
    Dir: string
    InDir: string
  }
  NotDir: {
    File: string
    NoExist: string
    overwrite: string
  }
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
