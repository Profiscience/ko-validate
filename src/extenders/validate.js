import { isArray, each, every } from 'lodash'
import ko from 'knockout'

import applyValidationRules from '../'
import validators from '../validators'

ko.extenders.validate = (obs, rule) => {
  if (isArray(obs)) {
    return validateArray(obs, rule)
  } else {
    obs.isValid = createValidator(obs, rule)
    return obs
  }
}

function validateArray(_arr, rule) {
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

function createValidator(obs, rule) {
  return ko.pureComputed(() => every(rule, (arg, validator) => validators[validator](obs(), arg)))
}
