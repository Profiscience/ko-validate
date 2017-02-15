import ko from 'knockout'
import test from 'tape'

import createValidatedTree from '../src'

test('composability', (t) => {
  const foo = createValidatedTree(ko.observable(), { required: true, number: true, min: 0, max: 100 })

  t.false(foo.isValid(), 'isValid() === false when no validators pass')

  foo(101)
  t.false(foo.isValid(), 'isValid() === false when some validators pass')

  foo(99)
  t.true(foo.isValid(), 'isValid() === false when all validators pass')

  t.end()
})
