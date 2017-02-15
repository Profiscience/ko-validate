import test from 'tape'

import validate from '../../src/validators/pattern'

test('pattern', (t) => {
  t.true(validate(undefined, /foo/), 'true when undefined')
  t.true(validate(undefined, /foo/), 'true when null')

  t.true(validate('foo', /foo/), 'true when matches pattern')
  t.false(validate('foo', /bar/), 'false when doesn\'t match pattern')

  t.end()
})
