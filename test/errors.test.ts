import { assertEquals } from 'testing/asserts.ts'

import expected from '../data/expected-errors.ts'

import { cmd, decode } from '../utils/tests.ts'

function errOut(p: Deno.Process<{ cmd: string[], stderr: 'piped' }>) {
  return async () => {
    const rawErrorOutput = await p.stderr.readable.getReader().read()

    const actualErrorOutput = decode(rawErrorOutput.value)
    
    assertEquals(
      actualErrorOutput,
      expected.err.MissingFiles
    )
  }
}

Deno.test('copy missing file', async t => {
  const p = Deno.run({
    cmd: cmd(),
    stderr: 'piped'
  })
  
  await t.step('status code diferent to 0', async () => {
    const actualStatus = await p.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })
  
  await t.step('error output', errOut(p))
  p.stderr.close()
  p.close()
})

Deno.test('copy No such file or directory', async t => {
  const p = Deno.run({
    cmd: cmd('.res/example.txt non-exist/'),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', errOut(p))

  await t.step('error output', async t => {

  })
})
