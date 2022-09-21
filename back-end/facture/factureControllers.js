const {
    createFactureService,
        getFactureByIdService,
        getFacturesService,
        updateFactureService,
        deleteFactureService,
        checkFactureNumberService,
        getFacturesClientService
    } = require('./factureServices')
    const {StatusCodes} = require('http-status-codes')
    const CustomError = require('../shared-services/errors')
   // const { getFacturesClientService } = require('../client/clientServices')
    
    const createFactureController = async(req, res) => {
        const userId = req.user.userId;
        const client = req.body.client

        const {
            numFacture,
            identifiant,
            refFacture,
            pointVente,
            DPC,
            montantCreance,
            soldeCreance
        } = req.body
        const user = req.user.userId

        if(!numFacture || !identifiant || !refFacture || !pointVente
            || !DPC || !montantCreance || !soldeCreance ) {

            throw new CustomError.BadRequestError('All fields are required, Please provide all facture data')
        }
        req.body.user = req.user.userId;

        const isClientBelongsToConnectedUser = await getFacturesClientService(client, user)
      //  console.log(isClientBelongsToConnectedUser)
      
      if(!isClientBelongsToConnectedUser){
          throw new CustomError.NotFoundError('This client does not exist, please check again!')
        }
         //     console.log(req.body);

        const facture = await createFactureService({...req.body})
     

        res.status(StatusCodes.CREATED).send({msg: 'Facture created successfully!'})
    }
    
    const getFactureByIdController = async(req, res) => {
        const facture_id = req.params.id
        const user = req.user.userId
        const facture = await getFactureByIdService(facture_id, user)
        
        if(!facture) {
            throw new CustomError.NotFoundError('No facture with this id')
        }
        res.status(StatusCodes.OK).send({facture: facture})
    }
    
    const getFacturesController = async ( req, res ) => {
        const userId = req.user.userId
        const factures = await getFacturesService(userId).populate('client')
        res.status(StatusCodes.OK).send({factures: factures})
    }
    const getFacturesClientController = async ( req, res ) => {
        const userId = req.user.userId
        const client= req.body.client
        const factures = await getFacturesClientService(client,userId)
        res.status(StatusCodes.OK).send({factures: factures})
    }



    const updateFactureController = async(req, res) => {
        const {
            params: {id: facture_id},
            body: {author,text, date, client}
        } = req
        if(!author || !text || !date || !client ) {
            throw new CustomError.BadRequestError('Fields should be filled')
        }
        const facture = await updateFactureService(facture_id, req.body)
        if(!facture){
            throw new CustomError.NotFoundError('No Facture with this id')
        }
        res.status(StatusCodes.OK).send({msg: 'Facture updated successfully'})
    }
    const deleteFactureController = async(req, res) => {
        const {
            params: {id: facture_id},
        } = req
       
        const facture = await deleteFactureService(facture_id)
     
        res.status(StatusCodes.OK).send({msg: 'Facture deleted successfully'})
    }
    
    
    module.exports = {
        createFactureController,
        getFactureByIdController,
        getFacturesController,
        updateFactureController,
        getFacturesClientController,
        deleteFactureController
    }