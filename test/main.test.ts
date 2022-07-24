import { assertEquals } from 'testing/asserts.ts'

import expected from '../data/expected-data.ts'

import { cmd, decode } from '../utils/tests.ts'

Deno.test('cp missing file', async t => {
  const p = Deno.run({
    cmd: cmd(),
    stderr: 'piped'
  })
  
  await t.step('status code diferent to 0', async () => {
    const actualStatus = await p.status()

    assertEquals(
      actualStatus,
      expected.missingFiles.status
    )
  })
  
  await t.step('error output', async () => {
    const rawErrorOutput = await p.stderr.readable.getReader().read()

    const actualErrorOutput = decode(rawErrorOutput.value)
    
    assertEquals(
      actualErrorOutput,
      expected.missingFiles.errorOutput
    )
  })
  p.stderr.close()
  p.close()
})

Deno.test('cp help flag', async t => {
  const helpTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expected.helpFlagOutput
    )

    p.close()
  }

  await t.step('--help', async () => {
    const p = Deno.run({
      cmd: cmd('--help'),
      stdout: 'piped'
    })

    await helpTest(p)
  })

  await t.step('-h', async () => {
    const p = Deno.run({
      cmd: cmd('-h'),
      stdout: 'piped'
    })

    await helpTest(p)
  })
})

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
