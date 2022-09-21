const Facture = require('./factureModel')



const createFactureService = (data) => {
    const facture = Facture.create(data)
    return facture
}

const getFactureByIdService = (id, userId) => {
    const facture = Facture.findOne({_id:id, user: userId})
    return facture
}

const getFacturesService = (userId) => {
    const factures = Facture.find({user: userId})
    return factures
}
// const checkFactureNumberService = (number) => {
//     return Facture.findOne({number})
// }

const updateFactureService = (id,userId, data) => {
    const facture = Facture.findOneAndUpdate({_id: id, user: userId}, data, {new: true, runValidators: true})
    return facture
}
const deleteFactureService = (id,userId) => {
    const facture = Facture.deleteOne({_id: id, user: userId}, {new: true, runValidators: true})
    return facture
}
const getFacturesClientService = (client, user) => {
    
    const factures = Facture.find({client, user})
    return factures
}





module.exports = {
    createFactureService,
    getFactureByIdService,
    getFacturesService,
    updateFactureService,
    getFacturesClientService,
    deleteFactureService
    
}