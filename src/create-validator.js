import { isArray, every, map } from 'lodash'
import ko from 'knockout'
import { fromJS } from 'ko-contrib-utils'

import applyValidationRules from './'
import validators from './validators'

export default function createValidator(_obs, rule) {
  const obs = isArray(ko.unwrap(_obs))
    ? ko.pureComputed(() => map(_obs(), (v) => applyValidationRules(fromJS(v), rule.each)))
    : _obs

  return ko.pureComputed(() => every(rule, (arg, validator) => ko.unwrap(arg) === false || validators[validator](obs(), ko.unwrap(arg))))
}
