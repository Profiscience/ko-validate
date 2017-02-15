import { every } from 'lodash'

export default (arr = []) => every(arr, (x) => x.isValid())
