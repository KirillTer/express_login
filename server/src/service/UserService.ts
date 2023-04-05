import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import UserModel from '../model/userModel'
import MailService from './MailService'
import TokenService from './TokenService'
import UserDto from '../dto/userDto'
import ApiError from '../error/ApiError'

class UserService {
  async registration(email, userName, password) {
    const candidate = await UserModel.findOne({email})
    if(candidate) {
      throw ApiError.badRequest(`User with email ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()
    const user = await UserModel.create({email, userName, password: hashPassword, activationLink})
    // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})
    if(!user) {
      throw ApiError.badRequest('Incorrect activation link')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const candidate = await UserModel.findOne({email})
    if(!candidate) {
      throw ApiError.forbidden(`User with email ${email} doesn't exist`)
    }
    const isPasswordWquals = await bcrypt.compare(password, candidate.password)
    if(!isPasswordWquals) {
      throw ApiError.forbidden(`Incorrect password`)
    }
    const userDto = new UserDto(candidate)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.forbidden('user not authorized')
    }
    const userData = await TokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await TokenService.findToken(refreshToken)
    if(!userData || !tokenFromDB) {
      throw ApiError.forbidden('Expired or invalid token, please login again')
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async getAllUsers() {
    const users = await UserModel.find()
    return users
  }
}

export default new UserService()