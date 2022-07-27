export function cmd(args?: string[]) {
  if (!args) return ['deno', 'run', './src/main.ts']
  return ['deno', 'run', './src/main.ts', ...args]
}

const decoder = new TextDecoder()

export function decode (uiarr?: Uint8Array) {
  return decoder.decode(uiarr) 
}
