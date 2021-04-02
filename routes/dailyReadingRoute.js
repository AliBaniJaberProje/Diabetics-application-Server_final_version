import express from "express"
import * as dailyReadingServesHandler from "./../response-Handler/dailyReadingServes-handler/dailyReadingServes-handler.js"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
const router = express.Router()

router.post("/add"/*,isAuthorisedUser.isAuthorisedPatient*/,dailyReadingServesHandler.addNewReading)
router.post('/',isAuthorisedUser.isAuthorisedPatient,dailyReadingServesHandler.insertAndUpdate)
router.get("/:id",isAuthorisedUser.isAuthorisedDoctor,dailyReadingServesHandler.getDailyReadingToDoctor)
router.get("/thisDay"/*,isAuthorisedUser.isAuthorisedPatient*/,dailyReadingServesHandler.getInformationDailyReadingAtThisDay)



export default router