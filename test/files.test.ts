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
    assert(
      await Deno.remove('./res/create-file.txt')
    )
  })
})

Deno.test('copy one file in to directory dest', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/dest-dir/'])
  })

  process.close()

  await t.step('correct execution', async () => {
    const actualStatus = await process.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/dest-dir/copy-file-1.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original content', async () => {
    const actualText = await Deno.readTextFile('./res/dest-dir/copy-file-1.txt')
    
    const expectedText = await Deno.readTextFile('./res/copy-file-1.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('deleted new file', async () => {
    assert(
      await Deno.remove('./res/dest-dir/copy-file-1.txt')
    )
  })
})

Deno.test('copy one file in to directory dest renaming id', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/dest-dir/created-file'])
  })

  process.close()

  await t.step('correct execution', async () => {
    const actualStatus = await process.status() 
    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new file is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/dest-dir/created-file.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('new file content is equal to original content', async () => {
    const actualText = await Deno.readTextFile('./res/dest-dir/created-file.txt')
    
    const expectedText = await Deno.readTextFile('./res/copy-file-1.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await t.step('deleted new file', async () => {
    assert(
      await Deno.remove('./res/dest-dir/created-file.txt')
    )
  })
})

Deno.test('copy multiple files in to directory dest', async t => {
  const process = Deno.run({
    cmd: cmd(['copy-file-1', 'copy-file-2', 'dest-dir'])
  })

  process.close()

  await t.step('correct execution', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expectedStatus
    )
  })

  await t.step('new files are files', async t =>{
    await t.step('first file is file', async() => {
      const fileStat = await Deno.stat('copy-file-1')

      assert(fileStat.isFile)
    })

    await t.step('second file is file', async() => {
      const fileStat = await Deno.stat('copy-file-2')

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

    await t.step('removed new files',async t => {
      await t.step('removed first new file', async () => {
        await Deno.remove('./res/dest-dir/copy-file-1.txt')
      })

      await t.step('removed second new file', async () => {
        await Deno.remove('./res/dest-dir/copy-file-2.txt')
      })
    })
  })
})
