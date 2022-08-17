import type { ArgFunc, File } from './types/main.ts'

import { getDestType } from './funcs.ts'

import { isNotFound } from 'copy-errors/funcs.ts'

import { NoSuchError } from 'copy-errors/errors.ts'

export default <ArgFunc> async function(args) {
  const srcPaths = args.slice(0, -1)
  const destPath = <string>args.at(-1)

  const promiseSrc = srcPaths.map(path =>
    Deno.stat(path)
      .then(stats => <File> { path, stats })
      .catch(err => {
        if (isNotFound(err)) throw new NoSuchError(path)

        throw err
      })
  )

  return {
    srcs: await Promise.all(promiseSrc),
    dest: {
      path: destPath,
      type: await getDestType(destPath)
    }
  }
}