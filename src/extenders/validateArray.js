import { each, every } from 'lodash'
import ko from 'knockout'

import { applyValidationRules } from '../'

ko.extenders.validateArray = (_arr, rule) => {
  const validated = ko.pureComputed({
    read: () => {
      each(_arr(), (v) => applyValidationRules(v, rule))
      return _arr()
    },
    write: (vs) => _arr(vs)
  })


  validated.isValid = ko.pureComputed(() => every(validated(), (x) => x.isValid()))

  each(ko.observableArray.fn, (fn, name) => validated[name] = () => _arr[fn](...arguments))

  return validated
}
