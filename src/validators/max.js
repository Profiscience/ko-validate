import { isNull, isNumber, isUndefined } from 'lodash'

export default (v, max) => isUndefined(v) || isNull(v) || (isNumber(v) ? v : v.length) <= max
