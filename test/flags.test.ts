import { assertEquals } from 'testing/asserts.ts'

import expected from '../data/expected-data.ts'

import { cmd, decode } from '../utils/tests.ts'

Deno.test('cp version flag', async t => {
  const versionTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expected.versionFlagOutput
    )

    p.close()
  }

  await t.step('--version', async () => {
    const p = Deno.run({
      cmd: cmd('--version'),
      stdout: 'piped'
    })

    await versionTest(p)
  })

  await t.step('-V', async () => {
    const p = Deno.run({
      cmd: cmd('-V'),
      stdout: 'piped'
    })

    await versionTest(p)
  })
})
