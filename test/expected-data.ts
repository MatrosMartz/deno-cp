import type ExpectedData from '../types/expected-data.ts'

export default <ExpectedData>{
  missingFile: {
    status: {
      code: 1,
      success: false
    },
    errorOutput: 'cp: missing file operand\nTry \'cp --help\' for more information.\n'
  },
  helpFlagOutput: 'cp command for copi :D\nOptions:\n   -h, --help:\n       Print information.\n   -V, --version:\n       Print version.\n',
  versionFlagOutput: 'deno cp 0.0.1\n'
}
