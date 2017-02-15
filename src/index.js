import { isArray, each, every, includes, keys, some } from 'lodash'
import ko from 'knockout'
import { fromJS } from 'ko-contrib-utils'

import './extender'
import validators from './validators'

export default function applyValidationRules(data, rules) {
  if (isValidationRule(rules)) {
    if (!ko.isObservable(data)) {
      throw new Error('[ko-validate] properties must be observable to validate')
    }
    data.extend({ validate: rules })

  } else if (isArray(rules)) {
    if (!ko.isObservable(data)) {
      throw new Error('[ko-validate] arrays must be observable to validate')
    }
    data.extend({ validateArray: [rules] })

  } else if (ko.isObservable(data)) {
    data.isValid = ko.pureComputed(() => {
      const _data = fromJS(ko.unwrap(data))
      each(rules, (rule, prop) => applyValidationRules(_data[prop], rule))
      return every(rules, (r, prop) => _data[prop].isValid())
    })
  } else {
    each(rules, (rule, prop) => applyValidationRules(data[prop], rule))
    data.isValid = ko.pureComputed(() => every(rules, (r, prop) => data[prop].isValid()))
  }
}

function isValidationRule(rule) {
  return some(keys(rule), (k) => includes(keys(validators), k))
}
