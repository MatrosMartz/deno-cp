import { assertStrictEquals, assert, assertEquals } from 'testing/asserts.ts'

import { cmd } from '../../utils/tests.ts'

import { expectedStatus } from '../../test-data/expected-out.ts'

Deno.test('copy one file to a new file', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/create-file.txt'])
  })
  
  await t.step('correct execution', async () => {
    const actualStatus = await process.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  process.close()

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

  await t.step('deleted new file', async () => {
    await Deno.remove('./res/create-file.txt')
  })
})
