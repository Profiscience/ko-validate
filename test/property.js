import ko from 'knockout'
import test from 'tape'

import createValidatedTree from '../src'

test('property', (t) => {
  t.test('via createValidatedTree', (t) => {
    const foo = createValidatedTree(ko.observable(), { required: true })
    runTests(t, foo)
    t.end()
  })

  t.test('via extender', (t) => {
    const foo = ko.observable().extend({ validate: { required: true } })
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
