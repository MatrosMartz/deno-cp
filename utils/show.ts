import { CPErrors } from '../types/enums.ts'
import { ShowErrors } from '../types/information.ts'

import info from '../data/information.ts'

export function showInfo() {
  console.log(info.description)
  console.log('Options:')

  for (const { names, description } of info.options) {
    console.log('   ' + names.join(', ') + ':')
    console.log('       ' + description)
  }

}

export function showVersion() {
  console.log(info.version)
}

export const showErrors: ShowErrors = {
  MissingFiles() {
    console.error(info.errors[CPErrors.MissingFiles])
    Deno.exit(1)
  },
  NoSuch(str) {
    console.error(info.errors[CPErrors.NoSuch](str))
    Deno.exit(1)
  },
  NotADirectory(str) {
    console.error(info.errors[CPErrors.NotADirectory](str))
    Deno.exit(1)
  },
}