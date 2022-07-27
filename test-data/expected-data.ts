import type { ExpectedData } from '../types/expected-data.ts'

export default <ExpectedData> {
  flag: {
    helpFlagOutput: 'cp command for copi :D\nOptions:\n   -h, --help:\n       Print information.\n   -V, --version:\n       Print version.\n',
    versionFlagOutput: 'deno cp 0.0.1\n'
  }
}
