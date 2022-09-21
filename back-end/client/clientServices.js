const Client = require('./clientModel')

const createClientService = (data) => {
    const client = Client.create(data)
    return client
}

const getClientsService = (user) => {
    const clients = Client.find({user})
    return clients
}

const getClientByIdService = (id, user) => {
    return Client.findOne({_id:id, user: user})
}

// ! find the Client with the specific name
// ? check if the id of the project equals to the objects gotten by the name

const getClientByDateService = (date, user) => {
    const client = Client.findOne({ date, user });
    return client
}

const updateClientService = (id, userId,data) => {
    const client = Client.findByIdAndUpdate({_id: id, user: userId}, data, {new: true, runValidators: true})
    return client
}
const deleteClientService = (id,userId) => {
    const client = Client.deleteOne({_id: id, user: userId}, {new: true, runValidators: true})
    return client
}
// const findPlayers


module.exports = {
    createClientService,
    getClientByIdService,
    getClientsService,
    updateClientService,
    getClientByDateService,
    deleteClientService
}