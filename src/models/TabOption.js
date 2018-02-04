export default class TabOption {
  id = 'id'
  name = 'name'
  firstInputText = 'Enter something'
  secondInputText = 'Enter something 2'
  firstInputValidators = []
  secondInputValidators = []
  submitButtonName = 'submitButtonName'
  submitButtonStyle = ''

  constructor (data = {}) {
    Object.assign(this, data)
  }

  get firstInputValidatorsAsArray () {
    return this.getValidatorsAsArray(this.firstInputValidators)
  }

  get secondInputValidatorsAsArray () {
    return this.getValidatorsAsArray(this.secondInputValidators)
  }

  getValidatorsAsArray (validators = {}) {
    return Object
      .keys(validators)
      .map(key => validators[key])
  }
}
