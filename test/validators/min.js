import test from 'tape'

import validate from '../../src/validators/min'

test('min', (t) => {
  t.false(validate(1, 2), 'false when less than min')
  t.true(validate(1, 1), 'true when equal to min')
  t.true(validate(1, 0), 'true when greater than min')

  t.end()
})
