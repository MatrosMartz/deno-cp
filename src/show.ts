import information from './help.ts'

export function showInfo() {
  console.log(information.description)
  console.log('Options:')
  for (const { names, description } of information.options) {
    console.log('   ' + names.join(', ') + ':')
    console.log('       ' + description)
  }
}

export function showVersion() {
  console.log('deno cp 0.0.1')
}

export function showMissingFileError() {
  console.error('cp: missing file operand\nTry \'cp --help\' for more information.')
  Deno.exit(1)
}
