import { isNull, isNumber, isUndefined } from 'lodash'

export default (v, min) => isUndefined(v) || isNull(v) || (isNumber(v) ? v : v.length) >= min
