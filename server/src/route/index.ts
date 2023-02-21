import { Router } from 'express'
import { body } from 'express-validator'
import UserController from '../controller/UserController'
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = Router()

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max:10}),
  UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getUsers)

export default router