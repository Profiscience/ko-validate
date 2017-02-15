import test from 'tape'

import validate from '../../src/validators/min'

test('min', (t) => {
  t.true(validate(undefined, 1), 'true when undefined')
  t.true(validate(null, 1), 'true when null')

  t.test('number', (t) => {
    t.false(validate(1, 2), 'false when less than max')
    t.true(validate(1, 1), 'true when equal to max')
    t.true(validate(1, 0), 'true when greater than max')
    t.end()
  })

  t.test('string', (t) => {
    t.false(validate('x', 2), 'false when length less than max')
    t.true(validate('x', 1), 'true when length equal to max')
    t.true(validate('x', 0), 'true when length greater than max')
    t.end()
  })

  t.test('array', (t) => {
    t.false(validate(['x'], 2), 'false when length less than max')
    t.true(validate(['x'], 1), 'true when length equal to max')
    t.true(validate(['x'], 0), 'true when length greater than max')
    t.end()
  })

  t.end()
})
