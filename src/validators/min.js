import { isNumber } from 'lodash'

export default (v, min) => v && (isNumber(v) ? v : v.length) >= min
