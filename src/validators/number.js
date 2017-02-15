import { isNull, isNumber, isUndefined } from 'lodash'

export default (v) => isUndefined(v) || isNull(v) || isNumber(v)
