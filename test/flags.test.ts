import { assertEquals } from 'testing/asserts.ts'

import expected, { expectedStatus } from '../test-data/expected-out.ts'

import { cmd, decode } from '../utils/tests.ts'

Deno.test('copy version flag', async t => {
  await t.step('--version', async t => {
    const process = Deno.run({
      cmd: cmd(['--version']),
      stdout: 'piped'
    })

    await t.step('output', async () => {
      const rawOutput = await process.output()

      const actualOutput = decode(rawOutput)

      assertEquals(
        actualOutput,
        expected.versionFlag
      )
    })
    
    process.close()

    await t.step('status', async () => {
      const actualStatus = await process.status() 
      assertEquals(
        actualStatus,
        expectedStatus
      )
    })
  })

  await t.step('-V', async t => {
    const process = Deno.run({
      cmd: cmd(['-V']),
      stdout: 'piped'
    })

    await t.step('output', async () => {
      const rawOutput = await process.output()

      const actualOutput = decode(rawOutput)

      assertEquals(
        actualOutput,
        expected.versionFlag
      )
    })

    process.close()

    await t.step('status', async () => {
      const actualStatus = await process.status() 
      assertEquals(
        actualStatus,
        expectedStatus
      )
    })
  })
})

Deno.test('copy help flag', async t => {
  await t.step('--help', async () => {
    const process = Deno.run({
      cmd: cmd(['--help']),
      stdout: 'piped'
    })

    await t.step('output', async () => {
      const rawOutput = await process.output()

      const actualOutput = decode(rawOutput)

      assertEquals(
        actualOutput,
        expected.helpFlag
      )
    })

    process.close()

    await t.step('status', async () => {
      const actualStatus = await process.status()

      assertEquals(
        actualStatus,
        expectedStatus
      )
    })
  })

  await t.step('-h', async () => {
    const process = Deno.run({
      cmd: cmd(['-h']),
      stdout: 'piped'
    })

    await t.step('output', async () => {
      const rawOutput = await process.output()

      const actualOutput = decode(rawOutput)

      assertEquals(
        actualOutput,
        expected.helpFlag
      )
    })

    process.close()

    await t.step('status', async () => {
      const actualStatus = await process.status()

      assertEquals(
        actualStatus,
        expectedStatus
      )
    })
  })
})