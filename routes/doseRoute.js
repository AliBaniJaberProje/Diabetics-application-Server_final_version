import express from 'express'
import * as doseServes_handler from "../response-Handler/doseServes-handler/doseServes-handler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

const router = express.Router()

router.get('/',isAuthorisedUser.isAuthorisedPatient,doseServes_handler.getDoseForPatient)
router.get('/doctor/:id',isAuthorisedUser.isAuthorisedDoctor,doseServes_handler.getDoseForPatient)
router.patch('/:id',isAuthorisedUser.isAuthorisedDoctor,doseServes_handler.updateDose)

export default router