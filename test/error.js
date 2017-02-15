import test from 'tape'

import createValidatedTree from '../src'

test('error', (t) => {
  try {
    createValidatedTree(
      {
        foo: undefined
      },
      {
        foo: { required: true }
      })
    t.fail('does not throw error when attempting to validate non-observable')
  } catch (e) {
    t.pass('throws error when attempting to validate non-observable')
  }

  t.end()
})
