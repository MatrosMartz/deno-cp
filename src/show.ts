import type { CPErrors } from '../types/enums.ts'

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

export function showError(errorType: CPErrors) {
  console.error(information.errors[errorType])
  Deno.exit(1)
}
