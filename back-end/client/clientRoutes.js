const clientRouter = require('express').Router()
const {
createClientController,
    getClientByIdController,
    getClientsController,
    updateClientController,
    getFacturesOfClientController,
  deleteClientController

} = require('./clientControllers')

const authenticateUser = require('../middlewares/authentication')

clientRouter.route('/').post(authenticateUser, createClientController)
clientRouter.route('/').get(authenticateUser, getClientsController)

clientRouter.route('/:id').get(authenticateUser, getClientByIdController).patch(authenticateUser, updateClientController)
clientRouter.route('/:id').get(authenticateUser, getClientByIdController).delete(authenticateUser,   deleteClientController
    )

clientRouter.route('/:id/factures').get(authenticateUser, getFacturesOfClientController)

module.exports = clientRouter