import { assertEquals } from 'testing/asserts.ts'

import expected from '../test-data/expected-out.ts'

import { cmd, decode } from '../utils/tests.ts'

Deno.test('copy version flag', async t => {
  const versionTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expected.versionFlag
    )

    p.close()
  }

  await t.step('--version', async () => {
    const p = Deno.run({
      cmd: cmd(['--version']),
      stdout: 'piped'
    })

    await versionTest(p)
  })

  await t.step('-V', async () => {
    const p = Deno.run({
      cmd: cmd(['-V']),
      stdout: 'piped'
    })

    await versionTest(p)
  })
})

Deno.test('copy help flag', async t => {
  const helpTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expected.helpFlag
    )

    p.close()
  }

  await t.step('--help', async () => {
    const p = Deno.run({
      cmd: cmd(['--help']),
      stdout: 'piped'
    })

    await helpTest(p)
  })

  await t.step('-h', async () => {
    const p = Deno.run({
      cmd: cmd(['-h']),
      stdout: 'piped'
    })

    await helpTest(p)
  })
})