import type { ArgFunc, File } from '../types/index.ts'

import { getDestType, rejectSrc } from './errors.ts'

export default <ArgFunc> async function(args, cb) {
  const srcPaths = args.slice(0, -1)
  const destPath = <string>args.at(-1)

  const promiseSrc = srcPaths.map(path =>
    Deno.stat(path)
      .then(stats => <File> { path, stats })
      .catch(rejectSrc(path, cb))
  )

  return {
    srcs: await Promise.all(promiseSrc),
    dest: {
      path: destPath,
      type: await getDestType(destPath)
    }
  }
}