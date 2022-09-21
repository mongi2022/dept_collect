const Token = require('./tokenModel')



const deleteTokenService = (id) => {
    const token = Token.findOneAndDelete({user: id})
    return token
}


module.exports = {
    deleteTokenService
}