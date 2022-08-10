import type { ExpectedErrors } from '../types/expected.ts'

export default <ExpectedErrors> {
  err: {
    MissingFiles: 'cp: missing file operand\nTry \'cp --help\' for more information.\n',
    NoSuch: {
      File: 'cp: cannot stat \'./res/no-exist.txt\': No such file or directory\n',
      Dir: 'cp: cannot stat \'./res/no-exist/\': No such file or directory\n',
      InDir: 'cp: cannot stat \'./res/no-exist/in\': No such file or directory\n',
    },
    NotDir: {
      File: 'cp: target \'./res/is-not-dir.txt\' is not a directory\n',
      NoExist: 'cp: target \'./res/not-exist/\' is not a directory\n',
      overwrite: 'cp: cannot overwrite non-directory \'./res/dest-file.txt\' with directory \'copy\'\n',
    },
  },
  status: {
    code: 1,
    success: false
  },
}
