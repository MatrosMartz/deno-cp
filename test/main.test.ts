import { assertEquals } from 'testing/asserts.ts'

import { cmd, decode } from './utils.ts'

Deno.test('cp without params', async t => {
  const p = Deno.run({
    cmd: cmd(),
    stderr: 'piped'
  })
  
  await t.step('status code diferent to 0', async () => {
    const actualStatus = await p.status()

    const expectedStatus: Deno.ProcessStatus = {
      code: 1,
      success: false
    }

    assertEquals(
      actualStatus,
      expectedStatus
    )
  })
  
  await t.step('error output', async () => {
    const rawErrorOutput = await p.stderr.readable.getReader().read()

    const actualErrorOutput = decode(rawErrorOutput.value)

    const expectErrorOutput =
`cp: missing file operand
Try 'cp --help' for more information.
`
    
    assertEquals(
      actualErrorOutput,
      expectErrorOutput
    )
  })
  p.stderr.close()
  p.close()
})

Deno.test('cp help flag', async t => {
  const expectOutput =
`cp command for copi :D
Options:
   -h, --help:
       Print information.
   -V, --version:
       Print version.
`
  const helpTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expectOutput
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
  const expectedOutput = 'deno cp 0.0.1\n'

  const versionTest = async (p: Deno.Process) => {
    const rawOutput = await p.output()

    const actualOutput = decode(rawOutput)

    assertEquals(
      actualOutput,
      expectedOutput
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
