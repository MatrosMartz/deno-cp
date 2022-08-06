type Exists = Deno.FileInfo | 'NotFound'

type existCallback = (path: string) => void

export function exists(path: string): Promise<Exists> {
  const stat: Promise<Exists> = Deno.stat(path).catch(err => {
    if (err instanceof Deno.errors.NotFound || (<Error>err).message.includes('os error 123'))
      return 'NotFound'

    else throw err
  })

  return stat
}

export function srcsExist(arr: string[], cbError: existCallback): Promise<Deno.FileInfo[]> {
  const arrStats = arr.map(path =>
    Deno.stat(path).catch(err => {
      if (err instanceof Deno.errors.NotFound || (<Error>err).message.includes('os error 123'))
        cbError(path)

      throw err
    })
  )

  return Promise.all(arrStats)
}
