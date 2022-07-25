import { assertStrictEquals, assert } from 'testing/asserts.ts'

import { cmd } from '../utils/tests.ts'

Deno.test('copy example.txt to example2.txt', async t => {
  const p = Deno.run({
    cmd: cmd('./res/example.txt ./res/example2.txt')
  })

  p.close()

  await t.step('./res/example2.txt create', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    assert(actualText)
  })

  await t.step('example2.txt is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/example2.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('./res/example2.txt are equal to example.txt', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    const expectedText = await Deno.readTextFile('./res/example.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })
})
