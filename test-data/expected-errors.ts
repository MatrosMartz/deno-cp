import type { ExpectedErrors } from '../types/expected.ts'

export default <ExpectedErrors> {
  err: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.\n',
    NotADirectory: 'cp: cannot create regular file \'./res/is-not-dir/\': Not a directory\n',
    NotADirectoryAlt: 'cp: cannot stat \'./res/no-exist-dir/\': No such file or directory\n',
    NoSuch: 'cp: cannot stat \'./res/no-exist\': No such file or directory\n',
    NoSuchAlt: 'cp: cannot stat \'./res/no-exist/dest-file.txt\': No such file or directory\n',
  },
  status: {
    code: 1,
    success: false
  },
}
