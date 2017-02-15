import test from 'tape'

import validate from '../../src/validators/number'

test('number', (t) => {
  t.true(validate(0), 'true when number')

  t.false(validate(undefined), 'false when undefined')
  t.false(validate(''), 'false when string')
  t.false(validate([]), 'false when array')
  t.false(validate([]), 'false when object')
  t.false(validate(false), 'false when boolean')

  t.end()
})
