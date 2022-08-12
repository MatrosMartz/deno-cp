export enum CPErrors {
  MissingFiles    = 'MissingFiles',
  NoSuch          = 'NoSuch',
  NotADirectory   = 'NotADirectory',
  CannotOverwrite = 'CannotOverwrite'
}

export enum DestType {
  Dir       = 'Directory',
  Link      = 'SymbolycLink',
  File      = 'File',
  NoSuch    = 'NoSuch',
  NoSuchDir = 'NoSuchDir'
}
