import ko from 'knockout'
import test from 'tape'

import createValidatedTree from '../src'

test('array', (t) => {
  t.test('via createValidatedTree', (t) => {
    const foo = createValidatedTree(ko.observableArray(), {
      each: {
        inner_foo: {
          number: true,
          min: 1
        }
      }
    })
    runTests(t, foo)
    t.end()
  })

  t.test('via extender', (t) => {
    const foo = ko.observableArray().extend({
      validate: {
        each: {
          inner_foo: {
            number: true,
            min: 1
          }
        }
      }
    })
    runTests(t, foo)
    t.end()
  })

  t.test('composability', (t) => {
    const foo = ko.observableArray().extend({
      validate: {
        min: 1,
        each: {
          name: {
            required: true
          }
        }
      }
    })

    t.false(foo.isValid())

    foo.push({ name: ko.observable('Casey') })
    t.true(foo.isValid())

    foo()[0].name('')
    t.false(foo.isValid())

    t.end()
  })

  t.end()
})

function runTests(t, foo) {
  foo(undefined)
  t.true(foo.isValid(), 'arr.isValid() === true when undefined')

  foo([])
  t.true(foo.isValid(), 'arr.isValid() === true when empty')

  foo.push({ inner_foo: ko.observable(1) })
  t.true(foo()[0].isValid() && foo()[0].inner_foo.isValid())
  t.true(foo.isValid(), 'arr.isValid() === true when all child are valid')

  foo()[0].inner_foo(0)
  t.false(foo()[0].inner_foo.isValid())
  t.false(foo.isValid(), 'arr.isValid() === false when all children are not valid')

  foo.pop()
  t.true(foo.isValid(), 'arr.isValid() is re-executed when item is popped')
}
