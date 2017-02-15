import ko from 'knockout'
import test from 'tape'

import { validators } from '../src'

validators['custom'] = (a, b) => a === b

test('custom', (t) => {
  const foo = ko.observable().extend({ validate: { custom: 'foo' } })

  t.false(foo.isValid())

  foo('bar')
  t.false(foo.isValid())

  foo('foo')
  t.true(foo.isValid())

  t.end()
})
