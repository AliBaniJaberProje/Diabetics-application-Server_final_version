import express from "express"

import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import * as EventHistoryServesHandler from "../response-Handler/event_history_servesHandler/event_history_servesHandler.js";
const Route =express.Router()


Route.get("/",EventHistoryServesHandler.getEventHistoryToDoctor)







export default Route;