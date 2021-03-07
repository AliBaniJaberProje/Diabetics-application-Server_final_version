import express from 'express'
import * as eventServesHandler from "../response-Handler/eventServes-handler/eventServesHandler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

const router = express.Router()

router.get("/myEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getEventWhereUserId)

router.post("/selectEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.selectEventForUser)
router.get("/getMyEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getMyEvent)

export default router