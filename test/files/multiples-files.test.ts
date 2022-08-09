import { assertStrictEquals, assert, assertEquals } from 'testing/asserts.ts'

import { cmd } from '../../utils/tests.ts'

import { expectedStatus } from '../../test-data/expected-out.ts'

Deno.test('copy multiple files in to directory dest', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/copy-file-2.txt', './res/dest-dir'])
  })

  const actualStatus = await process.status() 
  
  await t.step('correct execution', () => {
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  process.close()

  await t.step('new files are files', async t =>{
    await t.step('first file is file', async() => {
      const fileStat = await Deno.stat('./res/copy-file-1.txt')

      assert(fileStat.isFile)
    })

    await t.step('second file is file', async() => {
      const fileStat = await Deno.stat('./res/copy-file-2')

      assert(fileStat.isFile)
    })
  })

  await t.step('new files content are equal to original files content', async t => {
    await t.step('first file content is equal to original first file content', async () => {
      const actualText = await Deno.readTextFile('./res/dest-dir/copy-file-1.txt')
      
      const expectedText = await Deno.readTextFile('./res/copy-file-1.txt')

      assertStrictEquals(
        actualText,
        expectedText
      )
    })

    await t.step('second file content is equal to original second file content', async () => {
      const actualText = await Deno.readTextFile('./res/dest-dir/copy-file-2.txt')
      
      const expectedText = await Deno.readTextFile('./res/copy-file-2.txt')

      assertStrictEquals(
        actualText,
        expectedText
      )
    })
  })
  await t.step('removed new files',async t => {
    await t.step('removed first new file', async () => {
      await Deno.remove('./res/dest-dir/copy-file-1.txt')
    })

    await t.step('removed second new file', async () => {
      await Deno.remove('./res/dest-dir/copy-file-2.txt')
    })
  })
})
