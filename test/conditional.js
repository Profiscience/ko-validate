import ko from 'knockout'
import test from 'tape'

import applyValidationRules from '../src'

test('conditional', (t) => {
  const foo = ko.observable()
  const required = ko.observable(false)
  const number = ko.observable(false)
  const min = ko.observable(false)

  applyValidationRules(foo, { required, number, min })

  t.true(foo.isValid())

  required(true)
  t.false(foo.isValid())

  foo('foo')
  t.true(foo.isValid())

  number(true)
  t.false(foo.isValid())

  foo(1)
  t.true(foo.isValid())

  min(2)
  t.false(foo.isValid())

  foo(3)
  t.true(foo.isValid())

  foo(undefined)
  required(false)
  t.true(foo.isValid())

  t.end()
})
