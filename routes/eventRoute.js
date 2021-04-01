import express from 'express'
import * as eventServesHandler from "../response-Handler/eventServes-handler/eventServesHandler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'

const router = express.Router()
router.post("/",isAuthorisedUser.isAuthorisedDoctor,eventServesHandler.addNewEvent)
router.get("/",isAuthorisedUser.isAuthorisedDoctor,eventServesHandler.getAllEventToDoctor)
router.delete("/:id",isAuthorisedUser.isAuthorisedDoctor,eventServesHandler.deleteEventFromDoctor)
router.get("/myEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getEventWhereUserId)
router.post("/selectEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.selectEventForUser)
router.get("/getMyEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getMyEvent)
router.post("/AvailableEvent",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.getAllAvailableEvent)
router.delete("/:id",isAuthorisedUser.isAuthorisedPatient,eventServesHandler.deleteEvent)


export default router