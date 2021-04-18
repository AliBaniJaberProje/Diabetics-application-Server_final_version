import express from "express"
import * as NumberOfStepHandler from  "../response-Handler/number-of-stepServes-Handler/number-of-stepServes-Handler.js"
const router = express.Router();
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

router.post('/',isAuthorisedUser.isAuthorisedPatient,NumberOfStepHandler.addNewStep)
router.get('/:year/:month',isAuthorisedUser.isAuthorisedPatient,NumberOfStepHandler.getAllStepsToPatient)
router.get('/lastWeak',isAuthorisedUser.isAuthorisedPatient,NumberOfStepHandler.selectInLastWeek)
router.get('/:id/:year/:month',isAuthorisedUser.isAuthorisedPatient,NumberOfStepHandler.getAllStepsToDoctor)
router.get('/timestamp',NumberOfStepHandler.getTimestamp)
export default router
