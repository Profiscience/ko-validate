import { isNull, isUndefined } from 'lodash'

export default (v, regexp) => isUndefined(v) || isNull(v) || v.match(regexp) !== null
