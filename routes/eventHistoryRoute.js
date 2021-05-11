import express from "express"

import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import * as EventHistoryServesHandler from "../response-Handler/event_history_servesHandler/event_history_servesHandler.js";
const Route =express.Router()


Route.get("/:idPatient/:year/:month",isAuthorisedUser.isAuthorisedDoctor,EventHistoryServesHandler.getEventHistoryToDoctor)
Route.get("/api/patient/:year/:month",isAuthorisedUser.isAuthorisedPatient,EventHistoryServesHandler.getEventHistoryToPatient)
Route.get("/index/api/patient/:year/:month",isAuthorisedUser.isAuthorisedDoctor,EventHistoryServesHandler.eventHistoryCount)


Route.get("/",EventHistoryServesHandler.event)






export default Route;