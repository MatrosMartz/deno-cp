import { assertEquals } from 'testing/asserts.ts'

import expected from '../test-data/expected-errors.ts'

import { cmd, decode } from '../utils/tests.ts'

function errStatus(p: Deno.Process<{ cmd: string[], stderr: 'piped' }>) {
  return async () => {
    const actualStatus = await p.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  }
}

Deno.test('copy error: missing file', async t => {
  const p = Deno.run({
    cmd: cmd(),
    stderr: 'piped'
  })
  
  await t.step('status code diferent to 0', errStatus(p))

  const rawErrorOutput = await p.stderrOutput()
  
  await t.step('error output', () => {
    const actualErrorOutput = decode(rawErrorOutput)
    
    assertEquals(
      actualErrorOutput,
      expected.err.MissingFiles
    )
  })

  p.close()
})

Deno.test('copy error: No such file or directory', async t => {
  const p = Deno.run({
    cmd: cmd(['./res/no-exist-file','example2.txt']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', errStatus(p))
  
  const rawErrorOutput = await p.stderrOutput()

  await t.step('error output', () => {
    const actualErrotOutput = decode(rawErrorOutput)

    assertEquals(
      actualErrotOutput,
      expected.err.NoSuch
    )
  })

  p.close()
})

Deno.test('copy error: Not a directory', async t => {
  await t.step('copy multiple files to a non-directory', async t => {
    const p = Deno.run({
      cmd: cmd(['./res/example.txt', './res/example1.txt', './res/not-is-dir'])
    })

    await t.step('status code diferent to 0', errStatus(p))
  
    const rawErrorOutput = await p.stderrOutput()
  
    await t.step('error output', () => {
      const actualErrorOutput = decode(rawErrorOutput)
  
      assertEquals(
        actualErrorOutput,
        expected.err.NotADirectory
      )
    })

    p.close()
  })

  await t.step('copy one file to a non-directory', async t => {
    const p = Deno.run({
      cmd: cmd(['./res/example.txt', './res/not-is-dir/'])
    })

    await t.step('status code diferent to 0', errStatus(p))
  
    const rawErrorOutput = await p.stderrOutput()
  
    await t.step('error output', () => {
      const actualErrorOutput = decode(rawErrorOutput)
  
      assertEquals(
        actualErrorOutput,
        expected.err.NotADirectory
      )
    })

    p.close()
  })

  await t.step('copy file to a non-exist directory', async t => {
    const p = Deno.run({
      cmd: cmd(['./res/example.txt', './res/not-exits-dir/'])
    })

    await t.step('status code diferent to 0', errStatus(p))
  
    const rawErrorOutput = await p.stderrOutput()
  
    await t.step('error output', () => {
      const actualErrorOutput = decode(rawErrorOutput)
  
      assertEquals(
        actualErrorOutput,
        expected.err.NotADirectoryAlt
      )
    })

    p.close()
  })
})
