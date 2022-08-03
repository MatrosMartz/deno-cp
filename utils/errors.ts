import { CPErrors } from '../types/enums.ts'
import { showError } from './show.ts'

type Exists = Deno.FileInfo | 'NotFound'

export async function exists(path: string): Promise<Exists> {
  try {
    const pathStats = await Deno.stat(path)

    return pathStats

  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return 'NotFound'
    
    throw err
  }
}

export function srcsExist(arr: string[]): Promise<Deno.FileInfo[]> {
  const arrStats = arr.map(path =>
    Deno.stat(path).catch(err => {
      if (err instanceof Deno.errors.NotFound) showError(CPErrors.NoSuch, path)

      throw err
    })
  )

  return Promise.all(arrStats)
}
