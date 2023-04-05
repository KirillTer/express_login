export default class UserDto {
  email
  userName
  id
  isActivated

  constructor(model) {
    this.email = model.email
    this.userName = model.userName
    this.id = model._id
    this.isActivated = model.isActivated
  }
}