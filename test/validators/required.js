import test from 'tape'

import validate from '../../src/validators/required'

test('required', (t) => {
  t.false(validate(undefined), 'false when undefined')
  t.false(validate(''), 'false when empty string')
  t.false(validate([]), 'false when empty array')

  t.true(validate('foo'), 'true when non-empty string')
  t.true(validate([0]), 'true when non-empty array')
  t.true(validate(0), 'true when number')
  t.true(validate(false), 'true when boolean')

  t.end()
})
