const mongoose = require('mongoose')


const FactureSchema = new mongoose.Schema({
    numFacture: {
        type: String,
        required: [true, 'You have to enter the number of the Facture'],
        
    },
    identifiant: {
        type: String,
        required: [true, 'You have to enter the identifier of the Facture']
    },
    refFacture: {
        type: String,
        required: [true, 'You have to enter client code number of the facture'],
    },
    pointVente: {
        type: String,
        required: [true, 'You have to enter the selling point of the facture'],
    },
    DPC: {
        type: String,
        required: [true, 'You have to enter DPC of the facture'],
    },
    montantCreance: {
        type: Number,
        required: [true, 'You have to enter montantCreance of the facture'],
    },
    soldeCreance: {
        type: Number,       
        required: [true, 'You have to enter soldeCreance of the facture'],
    },
  
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: [true, 'You have to enter the client of the facture'],
    },
 
    // user: {
    //     type: mongoose.Types.ObjectId,
    //     ref : 'UserApp',
    //     required: true
    // }
},   { timestamps: true })


module.exports = mongoose.model('Facture', FactureSchema)