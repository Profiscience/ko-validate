import { isBoolean, isEmpty, isNumber } from 'lodash'

export default (v) => isBoolean(v) || !isEmpty(v) || isNumber(v)
