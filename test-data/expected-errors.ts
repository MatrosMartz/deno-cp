import type { ExpectedErrors } from '../types/expected-data.ts'

export default <ExpectedErrors> {
  err: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.\n',
    NotADictory: 'cp: cannot create regular file \'./res/no-exist-dir/\': Not a directory',
    NoSuch: 'cp: cannot stat \'./res/no-exist\': No such file or directory',
  },
  status: {
    code: 1,
    success: false
  },
}
