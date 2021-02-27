import express from "express"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser'
import * as patient_requestHandler from "../response-Handler/patientServes-handler/patientServes"
const router=express.Router()

router.patch("/updateInfo",isAuthorisedUser.isAuthorisedPatient,patient_requestHandler.updateInfo)



export default router