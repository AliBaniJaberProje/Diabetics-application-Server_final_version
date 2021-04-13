import express from "express"
import * as dailyReadingServesHandler from "./../response-Handler/dailyReadingServes-handler/dailyReadingServes-handler.js"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
const router = express.Router()

router.post("/add",isAuthorisedUser.isAuthorisedPatient,dailyReadingServesHandler.addNewReading)
router.post('/',isAuthorisedUser.isAuthorisedPatient,dailyReadingServesHandler.insertAndUpdate)
router.get('/doctor/lastWeek/:id',isAuthorisedUser.isAuthorisedDoctor,dailyReadingServesHandler.getTheLastWeek)

router.get("/:id/:year/:month",isAuthorisedUser.isAuthorisedDoctor,dailyReadingServesHandler.getDailyReadingToDoctor)
router.get("/:year/:month",isAuthorisedUser.isAuthorisedPatient,dailyReadingServesHandler.getDailyReadingToPatient)

router.get("/thisDay"/*,isAuthorisedUser.isAuthorisedPatient*/,dailyReadingServesHandler.getInformationDailyReadingAtThisDay)



export default router