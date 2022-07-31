import { assertStrictEquals, assert, assertEquals } from 'testing/asserts.ts'

import { cmd } from '../utils/tests.ts'

import { expectedStatus } from '../test-data/expected-out.ts'

Deno.test('copy one file to a new file', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/create-file.txt'])
  })

  process.close()

  await t.step('correct execution', async () => {
    const actualStatus = await process.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file create', async () => {
    const actualText = await Deno.readTextFile('./res/create-file.txt')
    
    assert(actualText)
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/create-file.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original file content', async () => {
    const actualText = await Deno.readTextFile('./res/create-file.txt')
    
    const expectedText = await Deno.readTextFile('./res/copy-file-1.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('delete a new file', async () => {
    assert(
      await Deno.remove('./res/copy/create-file.txt')
    )
  })
})

Deno.test('copy one file in to directory dest', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/copy/'])
  })

  process.close()

  await t.step('correct execution', async () => {
    const actualStatus = await process.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file in directory dest create', async () => {
    const actualText = await Deno.readTextFile('./res/copy/create-file.txt')
    
    assert(actualText)
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/copy/create-file.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original content', async () => {
    const actualText = await Deno.readTextFile('./res/copy/create-file.txt')
    
    const expectedText = await Deno.readTextFile('./res/copy-file-1.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('delete a new file', async () => {
    assert(
      await Deno.remove('./res/copy/create-file.txt')
    )
  })
})
