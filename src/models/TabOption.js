export default class TabOption {
  id = 'id'
  name = 'name'
  firstInputText = 'Enter something'
  secondInputText = 'Enter something 2'
  firstInputValidators = []

  constructor (data = {}) {
    Object.assign(this, data)
    this.firstInputValidators = this.getValidatorsAsArray(data.firstInputValidators)
  }

  getValidatorsAsArray (validators = {}) {
    return Object
      .keys(validators)
      .map(key => validators[key])
  }
}
