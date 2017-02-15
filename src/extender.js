import ko from 'knockout'
import { createValidatedObservable } from './index'

ko.extenders.validate = (obs, rules) => createValidatedObservable(obs, rules)
