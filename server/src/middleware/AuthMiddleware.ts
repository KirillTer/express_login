import ApiError from '../error/ApiError'
import TokenService from '../service/TokenService'

export default function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.forbidden("User unauthorized"))
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if(!accessToken) {
      return next(ApiError.forbidden("User unauthorized"))
    }
    const userData = TokenService.validateAccessToken(accessToken)
    if(!userData) {
      return next(ApiError.forbidden("User unauthorized"))
    }
    res.user = userData
    next()
  } catch(e) {
    return next(ApiError.forbidden("User unauthorized"))
  }    
}