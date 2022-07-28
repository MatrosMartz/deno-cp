import type { ExpectedErrors } from '../types/expected.ts'

export default <ExpectedErrors> {
  err: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.\n',
    NotADirectory: 'cp: cannot create regular file \'./res/not-is-dir/\': Not a directory\n',
    NotADirectoryAlt: 'cp: cannot create regular file \'./res/no-exist-dir/\': Not a directory\n',
    NoSuch: 'cp: cannot stat \'./res/no-exist\': No such file or directory\n',
    NotParseable: 'cp:  parse error near: \'}\'\n',
    NotParseableAlt: 'cp:  parse error near: \'}./res-not-exist\'\n',
  },
  status: {
    code: 1,
    success: false
  },
}
