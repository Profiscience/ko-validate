import { isBoolean, isEmpty, isNumber } from 'lodash'

export default function(v) {
  return isBoolean(v) || !isEmpty(v) || isNumber(v)
}
