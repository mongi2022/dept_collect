const createTokenUser = (user) => {
    return { fullname: user.fullname, userId: user._id};
  };
  
  module.exports = createTokenUser;
  