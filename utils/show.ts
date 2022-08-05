import { CPErrors } from '../types/enums.ts'
import { ShowErrors } from '../types/information.ts'

import information from '../data/information.ts'

export function showInfo() {
  console.log(information.description)
  console.log('Options:')
  for (const { names, description } of information.options) {
    console.log('   ' + names.join(', ') + ':')
    console.log('       ' + description)
  }
}

export function showVersion() {
  console.log(information.version)
}

export const showErrors: ShowErrors = {
  MissingFiles() {
    console.error(information.errors[CPErrors.MissingFiles])

    Deno.exit(1)
  },
  NoSuch(str) {
    console.error(information.errors[CPErrors.NoSuch](str))
  
    Deno.exit(1)
  },
  NotADirectory(str) {
    console.error(information.errors[CPErrors.NotADirectory](str))
  
    Deno.exit(1)
  },
}