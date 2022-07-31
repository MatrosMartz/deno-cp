import { assertStrictEquals, assert, assertEquals } from 'testing/asserts.ts'

import { cmd } from '../utils/tests.ts'

import { expectedStatus } from '../test-data/expected-out.ts'

function testStatus(actualStatus: Deno.Process): () => Promise<void> {
  return async () => {
    assertEquals(
      await actualStatus.status(),
      expectedStatus
    )
  }
}

Deno.test('copy example.txt to example2.txt', async t => {
  const p = Deno.run({
    cmd: cmd(['./res/example.txt', './res/example2.txt'])
  })

  p.close()

  await t.step('correct execution', testStatus(p))

  await t.step('example2.txt create', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    assert(actualText)
  })

  await t.step('example2.txt is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/example2.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('example2.txt are equal to example.txt', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    const expectedText = await Deno.readTextFile('./res/example.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await Deno.remove('./res/example2.txt')
})

Deno.test('copy example.txt in to copy/', async t => {
  const p = Deno.run({
    cmd: cmd(['./res/example.txt', './res/copy/'])
  })

  p.close()

  await t.step('correct execution', testStatus(p))

  await t.step('copy/example.txt create', async () => {
    const actualText = await Deno.readTextFile('./res/example2.txt')
    
    assert(actualText)
  })

  await t.step('copy/example.txt is file', async () => {
    const actualExampleInfo = await Deno.lstat('./res/copy/example2.txt')

    assert(actualExampleInfo.isFile)
  })
  
  await t.step('copy/example.txt are equal to example.txt', async () => {
    const actualText = await Deno.readTextFile('./res/copy/example2.txt')
    
    const expectedText = await Deno.readTextFile('./res/example.txt')

    assertStrictEquals(
      actualText,
      expectedText
    )
  })

  await Deno.remove('./res/copy/example.txt')
})
