import ko from 'knockout'
import test from 'tape'

import applyValidationRules from '../src'

test('plain object', (t) => {
  const foos = {
    foo: ko.observable(),
    bar: {
      bar_deep: ko.observable()
    }
  }

  const validationRules = {
    foo: { required: true },
    bar: {
      bar_deep: { required: true }
    }
  }

  applyValidationRules(foos, validationRules)

  t.ok(foos.isValid && foos.bar.isValid, 'adds isValid() computed to container objects')
  t.ok(foos.foo.isValid && foos.bar.bar_deep.isValid, 'adds isValid() computed to properties')
  t.false(foos.isValid() || foos.bar.isValid(), 'isValids for objects containing child validated properties is false when children are all invalid')


  foos.foo('foo')

  t.false(foos.isValid() || foos.bar.isValid(), 'isValid() === false when not all children are valid')
  t.true(foos.foo.isValid(), 'isValids() === true when prop is valid')

  foos.bar.bar_deep('bar')

  t.true(foos.isValid() && foos.bar.isValid(), 'isValid() === true when all children are valid')

  t.end()
})

test('observable object', (t) => {
  const foos = {
    foo: ko.observable({
      foo_deep: undefined
    })
  }

  const validationRules = {
    foo: {
      foo_deep: { required: true }
    }
  }

  applyValidationRules(foos, validationRules)

  t.ok(foos.isValid, 'adds isValid() computed to container object')
  t.ok(foos.foo.isValid, 'adds isValid() computed to container observable')

  t.false(foos.isValid(), 'isValids for objects containing child validated properties is false when a child is invalid')
  t.false(foos.foo.isValid(), 'isValids for observables containing child validated properties is false when a child is invalid')

  foos.foo({ foo_deep: 'foo' })

  t.true(foos.isValid(), 'isValids for objects containing child validated properties is true when all children are valid')
  t.true(foos.foo.isValid(), 'isValids for observables containing child validated properties is true when all children are valid')

  t.end()
})
