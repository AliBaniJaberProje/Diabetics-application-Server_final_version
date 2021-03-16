import express from "express"
import * as dailyReadingServesHandler from "./../response-Handler/dailyReadingServes-handler/dailyReadingServes-handler.js"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
const router = express.Router()

router.get("/add",dailyReadingServesHandler.addNewReading)
router.get("/thisDay"/*,isAuthorisedUser.isAuthorisedPatient*/,dailyReadingServesHandler.getInformationDailyReadingAtThisDay)



export default router