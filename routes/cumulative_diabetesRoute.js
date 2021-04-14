import express from "express"
import * as cumulative_dServesHandler from "../response-Handler/cumulative_diabetes-servesHandler/cumulative_diabetes-servesHandler.js"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"

const router=express.Router()

router.post("/",isAuthorisedUser.isAuthorisedDoctor,cumulative_dServesHandler.addNewCumulative)




export default router