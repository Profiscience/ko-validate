import { isArray, each, every, extendWith, includes, keys, map, some } from 'lodash'
import ko from 'knockout'

import './extender'
import validators from './validators'

export { validators }

export default function createValidatedTree(data, rules) {
  return isValidationRule(rules)
    ? createValidatedObservable(data, rules)
    : createValidatedObject(data, rules)
}

export function createValidatedObservable(_obs, rule) {
  if (!ko.isObservable(_obs)) {
    throw new Error('[ko-validate] properties/arrays must be observable to validate')
  }

  let obs
  if (isArray(ko.unwrap(_obs))) {
    obs = ko.pureComputed({
      read: () => map(_obs(), (v) => createValidatedTree(v, rule.each)),
      write: (v) => _obs(v)
    })
    each(keys(ko.observableArray.fn), (fn) => obs[fn] = _obs[fn].bind(_obs))
  } else {
    obs = ko.observable(_obs())
  }

  obs.isValid = ko.pureComputed(() => every(rule, (arg, validator) =>
    ko.unwrap(arg) === false || validators[validator](obs(), ko.unwrap(arg))))

  return obs
}

function createValidatedObject(data, rules) {
  const validated = extendWith({}, data, (dest, src, k) => createValidatedTree(src, rules[k]))
  validated.isValid = ko.pureComputed(() => areAllPropertiesValid(validated, rules))
  return validated
}

function isValidationRule(rule) {
  return some(keys(rule), (k) => includes(keys(validators), k))
}

function areAllPropertiesValid(data, rules) {
  return every(keys(rules), (k) => data[k].isValid())
}
