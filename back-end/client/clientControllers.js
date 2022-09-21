const Client  = require('./clientModel')
const { StatusCodes } = require('http-status-codes');
const { getFacturesClientService } = require('../facture/factureServices');
const CustomError = require('../shared-services/errors');
const {
  createClientService,
  getClientByIdService,
  getClientsService,
  updateClientService,
  getClientByDateService,
  deleteClientService
} = require('./clientServices');

/**
 * ? Create a client controller
 * @param {*} req
 * @param {*} res
 */
const createClientController = async (req, res) => {
  const userId = req.user.userId;
  const { codeClient, fullName, age, adresse1, adresse2,
  tel1, tel2, cin, profile, email, password, matFiscal } = req.body;
  if (!codeClient || !fullName || !age ||  !adresse1 || !adresse2 || !tel1 ||
    !tel2 || !cin || !profile || !email || !password || !matFiscal ) {
    throw new CustomError.BadRequestError(`All Client's data are mandatory`);
  }

  req.body.user = req.user.userId;


  const client = await createClientService({ ...req.body });
  res.status(StatusCodes.CREATED).send({ msg: `Client added successfully` });
};

/**
 * ? Get all the Clients within a specific project, created
 * ? by the connected user
 * @param {*} req
 * @param {*} res
 */
const getClientsController = async (req, res) => {
  const userId = req.user.userId;

  const clients = await getClientsService(userId);

  res.status(StatusCodes.OK).send(clients);
};

const getClientByIdController = async (req, res) => {
  const client_id = req.params.id;
  const userId = req.user.userId;
  if (!userId) {
    throw new CustomError.UnauthenticatedError('You are not authorized!');
  }
  const client = await getClientByIdService(client_id, userId);
 // console.log('erer',`${client}`);

  if (!client) {
    throw new CustomError.NotFoundError(
      `There is no client with the id : ${client_id}`
    );
  }

  res.status(StatusCodes.OK).send({ client: client });
};

const updateClientController = async (req, res) => {
  const {
    params: { id: client_id },
    user: { userId },
    body: { date, text, image },
  } = req;
  if (!userId) {
    throw new CustomError.UnauthenticatedError('You are not authorized!');
  }
  if (!date || !text || !image) {
    throw new CustomError.BadRequestError(`All fields needs to be filled`);
  }
  const find_client_using_id = await getClientByIdService(client_id, userId);
  if (!find_client_using_id) {
    throw new CustomError.NotFoundError('No client with the this id');
  }

  // * Find the clients with the same name except for this current client
  const isClientExist = await getClientByDateService(name, userId)
    .where('_id')
    .ne(client_id);
  console.log(isClientExist);
  if (isClientExist) {
    throw new CustomError.BadRequestError('This client is already exist');
  }
  const client = await updateClientService(client_id, req.body);
  if (!client) {
    throw new CustomError.NotFoundError('There is no client with this id');
  }
  res.status(StatusCodes.OK).send({ msg: `client updated successfully` });
};

const getFacturesOfClientController = async(req, res) => {
  const {
    params: {id: client_id},
    user: {userId}
  } = req
  const doesClientBelongsToConnctedUser = await getClientByIdService(client_id, userId)
  if(!doesClientBelongsToConnctedUser){
    throw new CustomError.NotFoundError('This client does not exist')
  }
  const squad = await getClientByIdService(client_id, userId).populate('factures')
  res.status(StatusCodes.OK).send({factures: squad})
}

const deleteClientController = async(req, res) => {
  const {
      params: {id: client_id},
  } = req
 
  const facture = await deleteClientService(client_id)

  res.status(StatusCodes.OK).send({msg: 'Client deleted successfully'})
}


module.exports = {
  createClientController,
  getClientByIdController,
  getClientsController,
  updateClientController,
  getFacturesOfClientController,
  deleteClientController
};
