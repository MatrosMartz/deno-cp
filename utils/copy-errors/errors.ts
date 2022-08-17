import { CopyErrorType } from './types/enums.ts'

export class CopyError extends Error {
  name = 'CopyError'

  constructor(msg?: string) {
    super(msg)
  }

  MissingFiles() {
    return 'cp: missing file operand\nTry \'cp --help\' for more information.'
  }

  NoSuch(path: string) {
    return `cp: cannot stat '${path}': No such file or directory`
  }

  CannotCreate(path: string) {
    return `cp: cannot create regular file '${path}': Not a directory`
  }

  FailedAccess(path: string) {
    return `cp: failed to access '${path}': Not a directory`
  }

  Target(path: string) {
    return `cp: target '${path}' is not a directory`
  }

  CannotOverwrite(path: string) {
    return `cp: cannot overwrite non-directory '${path}' with directory 'copy'`
  }
}

export class MissingFilesError extends CopyError {
  name = CopyErrorType.MissingFiles

  constructor() {
    super()

    this.message = this.MissingFiles()
  }
}

export class NoSuchError extends CopyError {
  name = CopyErrorType.NoSuch

  constructor(path: string) {
    super()

    this.message = this.NoSuch(path)
  }
}

export class CannotCreateError extends CopyError {
  name = CopyErrorType.CannotCreate

  constructor(path: string) {
    super()

    this.message = this.CannotCreate(path)
  }
}

export class FailedAccessError extends CopyError {
  name = CopyErrorType.FailedAccess

  constructor(path: string) {
    super()
    
    this.message = this.FailedAccess(path)
  }
}

export class TargetError extends CopyError {
  name = CopyErrorType.Target

  constructor(path: string) {
    super()
    
    this.message = this.Target(path)
  }
}

export class CannotOverwriteError extends CopyError {
  name = CopyErrorType.CannotOverwrite

  constructor(path: string) {
    super()
    
    this.message = this.CannotOverwrite(path)
  }
}
