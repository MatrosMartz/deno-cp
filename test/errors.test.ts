import { assertEquals } from 'testing/asserts.ts'

import expected from '../test-data/expected-errors.ts'

import { cmd, decode } from '../utils/tests.ts'

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

Deno.test('copy error: No such file or directory', async t => {
  await t.step('copy src file no exist', async t => {
    const process = Deno.run({
      cmd: cmd(['./res/no-exist','./res/dest-file.txt']),
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
      const actualErrotOutput = decode(rawErrorOutput)
      
      assertEquals(
        actualErrotOutput,
        expected.err.NoSuch
        )
      })
    
    process.close()
  })

  await t.step('copy dest directory no exist', async t => {
    const process = Deno.run({
      cmd: cmd(['./res/example.txt', './res/no-exist/example3.txt'])
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
        expected.err.NoSuchAlt
      )
    })
  })
})

Deno.test('copy error: Not a directory', async t => {
  await t.step('copy multiple files to a non-directory', async t => {
    const process = Deno.run({
      cmd: cmd(['./res/example.txt', './res/example1.txt', './res/not-is-dir'])
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

  await t.step('copy one file to a non-directory', async t => {
    const process = Deno.run({
      cmd: cmd(['./res/example.txt', './res/no-is-dir/'])
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

  await t.step('copy file to a non-exist directory', async t => {
    const process = Deno.run({
      cmd: cmd(['./res/example.txt', './res/no-exits-dir/'])
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
})
