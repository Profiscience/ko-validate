import ko from 'knockout'
import test from 'tape'

import createValidatedTree from '../src'

test('nested object', (t) => {
  const _foos = {
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

  const foos = createValidatedTree(_foos, validationRules)

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
