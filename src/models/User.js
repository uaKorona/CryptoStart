import UserStates from './UserStates'

export default class User {
  id;
  name;
  password;
  state = UserStates.nonAuthorized;

  constructor ({id, name, password} = {}) {
    Object.assign(this, {id, name, password})
  }

  setAuthorized () {
    this.state = UserStates.authorized
  }

  setNonAuthorized () {
    this.state = UserStates.nonAuthorized
  }

  isUserAuthorized () {
    return this.state === UserStates.authorized
  }
}
