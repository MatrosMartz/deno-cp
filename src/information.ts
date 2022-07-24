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
    'missingFiles': 'cp: missing file operand\nTry \'cp --help\' for more information.'
  }
}

export default information
