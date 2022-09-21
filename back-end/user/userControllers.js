const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');
const CustomError = require('../shared-services/errors');
// const serialNumber = require('serial-number');
const { createTokenUser, attachCookiesToResponse } = require('../utils');
const {
  registerUserService,
  getUserByEmailService,
  getUserByIdService,
  updateUserPasswordService,
  updateUserProfileService,
} = require('./userServices');
const Token = require('../token/tokenModel');
const { deleteTokenService } = require('../token/tokenServices');
const { get } = require('http');

const registerUserController = async (req, res) => {
  const { fullname,tel, email, password } = req.body;

 
  if (!fullname || !tel || !email || !password) {
    throw new CustomError.BadRequestError('You need to provide your data');
  } 

  const emailAlreadyExists = await getUserByEmailService(email);
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const user = await registerUserService({ fullname,tel, email, password });
  res.status(StatusCodes.CREATED).send({ msg: 'Success!', user: user });

};

const loginUserController = async (req, res) => {
  const { email,tel, password } = req.body;
  if (!email || !tel || !password) {
    throw new CustomError.BadRequestError('Please provide your credentials');
  }
  const user = await getUserByEmailService( email );
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  const tokenUser = createTokenUser(user);
  let refreshToken = '';
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await Token.create(userToken)
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).send({ user: tokenUser });
};

const logoutUserController = async (req, res) => {
    const token = await deleteTokenService(req.user.userId)
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).send({msg: 'You logged out!'})
}

const updateProfileUserController = async(req, res) => {
  const {
    body: {fullname, email},
    user: {userId},
    params:{id: user}
  } = req

  if(user !== userId){
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  const objectToUpdate = {}
  
  const getConnectedUser = await getUserByIdService(user).select('-password')
  if(!getConnectedUser){
    throw new CustomError.UnauthenticatedError('Invalid authentication')
  }
  if(fullname){
    objectToUpdate.fullname = fullname
  }
  // ! if email to be updated
  if(email){
    if(email === getConnectedUser.email) {
      //? Check if the typed new email is exist
      const isMailExist = await getUserByEmailService(email).where('_id').ne(getConnectedUser._id).select('-password')
      if(isMailExist){
        throw new CustomError.BadRequestError('Invalid credentials - email')
      }
    }
    objectToUpdate.email = email
  }
  // if(password){
  //   const isMatch = getConnectedUser.comparePassword(password)
  //   if(!isMatch){
  //     throw new CustomError.BadRequestError('Invalid authentication - password')
  //   }
  //   if(password.length < process.env.PASSWORD_LENGTH){
  //     throw new CustomError.BadRequestError('Your password should be at least 8 characters')
  //   }
  //   objectToUpdate.password = password
  // }
  const updateUser = await updateUserProfileService(user, objectToUpdate)
  if(!updateUser){
    throw new CustomError.NotFoundError('It appears that you are connected or some details are wrongly typed !')
  }
  res.status(StatusCodes.OK).send({msg: 'You data updated successfully !', user: updateUser})
}

const udpateUserPasswordController = async(req, res) => {
  const {old_password, new_password} = req.body
  const user_id = req.params.id
  const userConnected = req.user.userId
  if(userConnected !== user_id) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  if(!old_password || !new_password){
    throw new CustomError.BadRequestError('Please provide both of your old and new passwords')
  }
  const user = await getUserByIdService(user_id)
  const isMatch = user.comparePassword(old_password)
  if(!isMatch){
    throw new CustomError.BadRequestError('You need to provide the correct old password')
  }
  user.password = new_password
  await updateUserPasswordService(user)
  
  res.status(StatusCodes.OK).send({msg: 'password updated successfully'})
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  updateProfileUserController,
  udpateUserPasswordController
};
