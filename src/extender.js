import ko from 'knockout'
import createValidator from './create-validator'

ko.extenders.validate = (obs, rule) => {
  obs.isValid = createValidator(obs, rule)
  return obs
}
