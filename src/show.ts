import info from './data/information.ts'

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
