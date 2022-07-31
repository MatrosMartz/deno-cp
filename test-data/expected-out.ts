import type { ExpectedOuts } from '../types/expected.ts'

export default <ExpectedOuts> {
  examplesFiles: 'hello, I\'m example file for copy :3\n',
  helpFlag: 'cp command for copi :D\nOptions:\n   -h, --help:\n       Print information.\n   -V, --version:\n       Print version.\n',
  versionFlag: 'deno cp 0.0.1\n',
}

export const expectedStatus: Deno.ProcessStatus = {
  code: 0,
  success: true
}
