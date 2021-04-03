import express from "express"
const router =express.Router()
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import * as doseHistoryServes from "../response-Handler/history-dose-Serves-handler/history-dose-serves-handler.js"
router.get("/:id/:year/:month",isAuthorisedUser.isAuthorisedDoctor,doseHistoryServes.getHistoryDosesToDoctor)


export default router