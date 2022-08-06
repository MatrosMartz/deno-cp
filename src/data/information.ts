import type { Information } from '../../types/information.ts'

export default <Information> {
  description: 'cp command for copi :D',
  options: [
    {
      names: ['-h', '--help'],
      description: 'Print information.'
    },
    {
      names: ['-V', '--version'],
      description: 'Print version.'
    }
  ],
  version: 'deno cp 0.0.1',
  errors: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.',
    NotADirectory: (src) => `cp: cannot create regular file '${src}': Not a directory`,
    NoSuch: (src) => `cp: cannot stat '${src}': No such file or directory`,
  }
}
