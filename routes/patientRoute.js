import express from "express"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import * as patient_requestHandler from "../response-Handler/patientServes-handler/patientServesHandler.js"


const router=express.Router()

router.patch("/updateInfo",isAuthorisedUser.isAuthorisedPatient,patient_requestHandler.updateInfo)
router.post("/test",patient_requestHandler.test)

router.post("/t",patient_requestHandler.t)


export default router