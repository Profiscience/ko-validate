import ko from 'knockout'
import test from 'tape'

import applyValidationRules from '../src'

test('array', (t) => {
  t.test('via applyValidationRules', (t) => {
    const foo = ko.observableArray()
    applyValidationRules(foo, {
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

  t.end()
})

function runTests(t, foo) {
  t.test('plain object children', (t) => {
    foo(undefined)
    t.true(foo.isValid(), 'arr.isValid() === true when undefined')

    foo([])
    t.true(foo.isValid(), 'arr.isValid() === true when empty')

    foo.push({ inner_foo: 1 })
    t.true(foo.isValid(), 'arr.isValid() === true when all child are valid')

    foo.push({ inner_foo: 0 })
    t.false(foo.isValid(), 'arr.isValid() === false when all children are not valid')

    foo.pop()
    foo.pop()
    t.true(foo.isValid(), 'arr.isValid() is re-executed when item is popped')

    t.end()
  })

  t.test('observable object children', (t) => {
    foo(undefined)
    t.true(foo.isValid(), 'arr.isValid() === true when undefined')

    foo([])
    t.true(foo.isValid(), 'arr.isValid() === true when empty')

    foo.push({ inner_foo: ko.observable(1) })
    t.true(foo.isValid(), 'arr.isValid() === true when all child are valid')

    foo()[0].inner_foo(0)
    t.false(foo.isValid(), 'arr.isValid() === false when all children are not valid')

    foo.pop()
    foo.pop()
    t.true(foo.isValid(), 'arr.isValid() is re-executed when item is popped')

    t.end()
  })
}
