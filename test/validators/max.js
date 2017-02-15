import test from 'tape'

import validate from '../../src/validators/max'

test('max', (t) => {
  t.true(validate(1, 2), 'true when less than max')
  t.true(validate(1, 1), 'true when equal to max')
  t.false(validate(1, 0), 'false when greater than max')

  t.end()
})
