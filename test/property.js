import ko from 'knockout'
import test from 'tape'

import applyValidationRules from '../src'

test('property', (t) => {
  t.test('via applyValidationRules', (t) => {
    const foo = ko.observable()
    applyValidationRules(foo, { required: true })
    runTests(t, foo)
    t.end()
  })

  t.test('via extender', (t) => {
    const foo = ko.observable()
    foo.extend({ validate: { required: true } })
    runTests(t, foo)
    t.end()
  })

  t.end()
})

function runTests(t, foo) {
  t.false(foo.isValid(), 'adds isValid() computed')
  foo('foo')
  t.true(foo.isValid(), 'validator works')
}
