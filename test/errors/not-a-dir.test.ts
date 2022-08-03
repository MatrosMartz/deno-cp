import { assertEquals } from 'testing/asserts.ts'

import expected from '../../test-data/expected-errors.ts'

import { cmd, decode } from '../../utils/tests.ts'

Deno.test('copy multiple files to a non-directory', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/copy-file-2.txt', './res/is-not-dir/']),
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
      expected.err.NotADirectory
    )
  })

  process.close()
})

Deno.test('copy one file to a non-directory', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/is-not-dir/']),
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
      expected.err.NotADirectory
    )
  })

  process.close()
})

Deno.test('copy file to a non-exist directory', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/no-exist-dir/']),
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
      expected.err.NotADirectoryAlt
    )
  })

  process.close()
})
