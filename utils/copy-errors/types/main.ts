import type { CopyErrorType } from './enums.ts'

export interface CopyErrorInterface {
  [CopyErrorType.CannotCreate](path: string): string
  [CopyErrorType.CannotOverwrite](path: string): string
  [CopyErrorType.FailedAccess](path: string): string
  [CopyErrorType.NoSuch](path: string): string
  [CopyErrorType.Target](path: string): string
  [CopyErrorType.MissingFiles](): string
}