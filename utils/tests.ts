export function cmd(args?: string[]): string[] {
  if (!args) return ['deno', 'run', './src/main.ts']
  return ['deno', 'run', './src/main.ts', ...args]
}

const decoder = new TextDecoder()

export function decode(uiarr?: Uint8Array): string {
  return decoder.decode(uiarr) 
}
