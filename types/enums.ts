export enum CPErrors {
  MissingFiles = 'MissingFiles',
  NoSuch = 'NoSuch',
  Target = 'Target',
  FailedAccess = 'FailedAccess',
  CannotCreate = 'CannotCreate',
  CannotOverwrite = 'CannotOverwrite'
}

export enum DestType {
  Dir = 'Directory',
  Link = 'SymbolycLink',
  File = 'File',
  NoSuch = 'NoSuch',
  NoSuchDir = 'NoSuchDir'
}
