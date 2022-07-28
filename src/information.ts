import type { Information } from '../types/information.ts'

const information: Information = {
  description: 'cp command for copi :D',
  options: [
    {
      names: ['-h','--help'],
      description: 'Print information.'
    },
    {
      names: ['-V', '--version'],
      description: 'Print version.'
    }
  ],
  version: 'deno cp 0.0.1',
  errors: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.\n',
    NotADirectory: (src) => `cp: cannot create regular file '${src}': Not a directory\n`,
    NoSuch: (src) => `cp: cannot stat '${src}': No such file or directory\n`,
    NotParseable: (src) => `cp: parse error near: '${src}'\n`,
  }
}

export default information
