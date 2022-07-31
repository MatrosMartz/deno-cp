import { assertStrictEquals, assert, assertEquals } from 'testing/asserts.ts'

import { cmd } from '../utils/tests.ts'

import { expectedStatus } from '../test-data/expected-out.ts'

Deno.test('copy one file to a new file', async t => {
  const p = Deno.run({
    cmd: cmd(['./res/example.txt', './res/example2.txt'])
  })

  p.close()

  await t.step('correct execution', async () => {
    const actualStatus = await p.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file create', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    assert(actualText)
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/example2.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original file content', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    const expectedText = await Deno.readTextFile('./res/example.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('delete a new file', async () => {
    assert(
      await Deno.remove('./res/copy/example.txt')
    )
  })
})

Deno.test('copy one file to a new file within a directory dest', async t => {
  const p = Deno.run({
    cmd: cmd(['./res/example.txt', './res/copy/'])
  })

  p.close()

  await t.step('correct execution', async () => {
    const actualStatus = await p.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file in directory dest create', async () => {
    const actualText = await Deno.readTextFile('./res/copy/example2.txt')
    
    assert(actualText)
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/copy/example2.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original content', async () => {
    const actualText = await Deno.readTextFile('./res/copy/example2.txt')
    
    const expectedText = await Deno.readTextFile('./res/example.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('delete a new file', async () => {
    assert(
      await Deno.remove('./res/copy/example.txt')
    )
  })
})
