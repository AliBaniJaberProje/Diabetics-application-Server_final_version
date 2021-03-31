import express from "express"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import * as patient_requestHandler from "../response-Handler/patientServes-handler/patientServesHandler.js"


const router=express.Router()

router.patch("/updateInfo",isAuthorisedUser.isAuthorisedPatient,patient_requestHandler.updateInfo)
//router.post("/test",patient_requestHandler.test)
router.get("/getIdCurrentDoctorAndMyId"/*,isAuthorisedUser.isAuthorisedPatient*/,patient_requestHandler.getIdAndIdCurrentDoctor)
router.get("/getIdDoctors",isAuthorisedUser.isAuthorisedPatient,patient_requestHandler.getAllDoctorToChat)
router.get("/",isAuthorisedUser.isAuthorisedPatient,patient_requestHandler.getProfileInfo)





router.get("/t",patient_requestHandler.t)


export default router