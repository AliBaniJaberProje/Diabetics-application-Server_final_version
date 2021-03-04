import express from 'express'
import * as eventServesHandler from "../response-Handler/eventServes-handler/eventServesHandler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

const router = express.Router()

router.get("/myEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getEventWhereUserId)




export default router