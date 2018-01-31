export default class TabOption {
  id = 'id'
  name = 'name'
  firstInputText = 'Enter something'
  firstInputId = 'firstInputId'
  secondInputText = 'Enter something 2'
  secondInputId = 'secondInputId'

  constructor (data = {}) {
    Object.assign(this, data)
  }
}
