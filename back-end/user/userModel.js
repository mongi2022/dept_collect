const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserAppSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'You need to provide your fullname'],
   
  },
  tel: {
    type: String,
    required: [true, 'You need to provide your telephone'],
   
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'You need to provide your email address'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
 
  }
});

UserAppSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserAppSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('UserApp', UserAppSchema);
