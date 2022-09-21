const authenticateUser = require('../middlewares/authentication')
const { registerUserController, loginUserController, logoutUserController, updateProfileUserController, udpateUserPasswordController } = require('./userControllers')

const userRouter = require('express').Router()



userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.delete('/logout', authenticateUser, logoutUserController)
userRouter.patch('/:id/profile', authenticateUser, updateProfileUserController)
userRouter.patch('/:id/profile/password-update', authenticateUser, udpateUserPasswordController)


module.exports = userRouter