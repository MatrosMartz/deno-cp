export function cmd(str?: string) {
  const run = ['deno', 'run', './src/main.ts']
  if (str) return [...run, ...str.split(' ')]
  return run
}

const decoder = new TextDecoder()

export function decode (uiarr?: Uint8Array) {
  return decoder.decode(uiarr) 
}