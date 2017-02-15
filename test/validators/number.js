import test from 'tape'

import validate from '../../src/validators/number'

test('number', (t) => {
  t.true(validate(undefined), 'true when undefined')
  t.true(validate(null), 'true when null')
  t.true(validate(0), 'true when number')

  t.false(validate(''), 'false when string')
  t.false(validate([]), 'false when array')
  t.false(validate([]), 'false when object')
  t.false(validate(false), 'false when boolean')

  t.end()
})
