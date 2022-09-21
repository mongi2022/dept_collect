const factureRouter = require('express').Router()
const {
createFactureController,
    getFactureByIdController,
    getFacturesController,
    updateFactureController,
    getFacturesClientController,
    deleteFactureController,
    deleteClientController
} = require('./factureControllers')

const authenticateUser = require('../middlewares/authentication')

factureRouter.route('/').get(authenticateUser, getFacturesController).post(authenticateUser, createFactureController)
factureRouter.route('/:id').get(authenticateUser, getFactureByIdController).delete(authenticateUser, deleteFactureController)

factureRouter.route('/:id').get(authenticateUser, getFactureByIdController).patch(authenticateUser, updateFactureController)
factureRouter.route('/client').post(authenticateUser, getFacturesClientController)



module.exports = factureRouter