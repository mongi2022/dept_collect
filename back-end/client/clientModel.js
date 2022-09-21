const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    codeClient: {
      type: String,
      required: [true, 'You need to enter the code of the client'],
    },
    fullName:{
      type: String,
      required: [true, 'You need to enter the full name of the client'],
    },
    age:{
      type: String,
      required: [true, 'You need to enter the age of the client'],
    },
    adresse1:{
      type: String,
      required: [true, 'You need to enter the first adress of the client'],
    },
    adresse2:{
      type: String,
    },
    tel1:{
      type: String,
      required: [true, 'You need to enter the first phone number of the client'],
    },
    tel2:{
      type: String,
    },
    cin:{
      type: String,
      required: [true, 'You need to enter the CIN of the client'],
    },
    profile:{
      type: String,
      required: [true, 'You need to enter the profile of the client'],
    },
    email:{
      type: String,
      required: [true, 'You need to enter the email of the client'],
    },
    password:{
      type: String,
      required: [true, 'You need to enter the password of the client'],
    },
    matFiscal:{
      type: String,
      required: [true, 'You need to enter the matricule of the client'],
    },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'UserApp',
    //   required: true
    // },
 
  },
  { timestamps: true, toJSON:{virtuals: true}, toObject: {virtuals: true} }
  );
  
  // ClientSchema.virtual('factures', {
  //   ref: 'Facture',
  //   localField: '_id',
  //   foreignField: 'client',
  //   justOne: false
  // })
module.exports = mongoose.model('Client', ClientSchema);
