import express from 'express'
import * as doseServes_handler from "../response-Handler/doseServes-handler/doseServes-handler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

const router = express.Router()

router.get('/:id'/*,isAuthorisedUser.isAuthorisedPatient*/,doseServes_handler.getDoseForPatient)


export default router