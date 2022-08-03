import { assertEquals } from 'testing/asserts.ts'

import expected from '../../test-data/expected-errors.ts'

import { cmd, decode } from '../../utils/tests.ts'

Deno.test('copy error: missing file', async t => {
  const process = Deno.run({
    cmd: cmd(),
    stderr: 'piped'
  })
  
  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })

  const rawErrorOutput = await process.stderrOutput()
  
  await t.step('error output', () => {
    const actualErrorOutput = decode(rawErrorOutput)
    
    assertEquals(
      actualErrorOutput,
      expected.err.MissingFiles
    )
  })

  process.close()
})
