import { isNumber } from 'lodash'

export default (v, max) => v && (isNumber(v) ? v : v.length) <= max
