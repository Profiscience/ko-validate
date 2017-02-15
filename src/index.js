import { each, every, includes, keys, some } from 'lodash'
import ko from 'knockout'
import { fromJS } from 'ko-contrib-utils'

import './extender'
import validators from './validators'

export default function applyValidationRules(data, rules) {
  // property/array to be validated
  if (isValidationRule(rules)) {
    if (!ko.isObservable(data)) {
      throw new Error('[ko-validate] properties/arrays must be observable to validate')
    }
    data.extend({ validate: rules })

  // observable object with validated properties
  } else if (ko.isObservable(data)) {
    data.isValid = ko.pureComputed(() => {
      // reform ko.observable({ foo: bar }) => { foo: ko.observable(bar) }
      // so properties can be validated
      const _data = fromJS(ko.unwrap(data))
      applyValidationRulesToAllProperties(_data, rules)
      return areAllPropertiesValid(_data, rules)
    })

  // plain object
  } else {
    applyValidationRulesToAllProperties(data, rules)
    data.isValid = ko.pureComputed(() => areAllPropertiesValid(data, rules))
  }

  return data
}

function applyValidationRulesToAllProperties(data, rules) {
  each(rules, (rule, prop) => applyValidationRules(data[prop], rule))
}

function isValidationRule(rule) {
  return some(keys(rule), (k) => includes(keys(validators).concat('each'), k))
}

function areAllPropertiesValid(data, rules) {
  return every(rules, (r, prop) => data[prop].isValid())
}
