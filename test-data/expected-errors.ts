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
      target: 'cp: target \'./res/not-exist\': Not a directory\n',
      create: 'cp: cannot create regular file \'./res/is-not-dir.txt/\': Not a directory\n',
      NoExist: 'cp: cannot create regular file \'./res/not-exist/\': Not a directory\n',
      overwrite: 'cp: cannot overwrite non-directory \'./res/dest-file.txt\' with directory \'copy\'\n',
    },
  },
  status: {
    code: 1,
    success: false
  },
}
