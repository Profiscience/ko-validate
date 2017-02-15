import ko from 'knockout'
import test from 'tape'

import applyValidationRules from '../src'

test('conditional', (t) => {
  t.test('observable', (t) => {
    const foo = ko.observable()
    const required = ko.observable(false)

    applyValidationRules(foo, {
      required: true,
      if: required
    })

    t.true(foo.isValid(), 'isValid() === true when invalid but if() === false')
    required(true)
    t.false(foo.isValid(), 'isValid() === false when invalid but if() === false')

    foo('foo')

    t.true(foo.isValid(), 'validator still works')

    t.end()
  })

  t.test('function (computed shorthand)', (t) => {
    const foo = ko.observable()
    const required = ko.observable(false)

    applyValidationRules(foo, {
      required: true,
      if: () => required()
    })

    t.true(foo.isValid(), 'isValid() === true when invalid but if() === false')
    required(true)
    t.false(foo.isValid(), 'isValid() === false when invalid but if() === false')

    foo('foo')

    t.true(foo.isValid(), 'validator still works')

    t.end()
  })

  t.end()
})
