import { each, every, includes, keys, some } from 'lodash'
import ko from 'knockout'
import { fromJS } from 'ko-contrib-utils'

import './extender'
import validators from './validators'

// expose for adding custom validators
export { validators }

// applies validation to a tree, adding an isValid computed on each
// validated property, and their containing objects. If an object has multiple
// validated properties, its isValid computed is a composition of all of them
export default function applyValidationRules(data, rules) {

  // property/array to be validated must be observable array so that new items
  // are extended with validators
  if (isValidationRule(rules)) {
    if (!ko.isObservable(data)) {
      throw new Error('[ko-validate] properties/arrays must be observable to validate')
    }
    data.extend({ validate: rules })

  // observable object with validated properties
  } else if (ko.isObservable(data)) {
    data.isValid = ko.pureComputed(() => {
      // reform ko.observable({ foo: bar }) => { foo: ko.observable(bar) } so
      // properties can be validated
      const _data = fromJS(ko.unwrap(data))
      // do inside computed so the previos line triggers revalidation
      applyValidationRulesToAllProperties(_data, rules)
      return areAllPropertiesValid(_data, rules)
    })

  // plain object
  } else {
    applyValidationRulesToAllProperties(data, rules)
    data.isValid = ko.pureComputed(() => areAllPropertiesValid(data, rules))
  }

  // return for safety/convenience (esp. w/ fp)
  return data
}

function applyValidationRulesToAllProperties(data, rules) {
  each(rules, (rule, prop) => applyValidationRules(data[prop], rule))
}

function isValidationRule(rule) {
  return some(keys(rule), (k) => includes(keys(validators), k))
}

function areAllPropertiesValid(data, rules) {
  return every(keys(rules), (k) => data[k].isValid())
}
