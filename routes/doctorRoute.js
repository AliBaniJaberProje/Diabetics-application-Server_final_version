import express from "express"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
import * as doctor_ServesApi from "../response-Handler/doctorServes-handler/doctorServesHandler.js";
const router=express.Router()

router.get("/",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.doctorInfoProfile)
router.get("/phoneToken/:id",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.getPhoneToken)
router.get("/allDoctor",doctor_ServesApi.getAllDoctors)
router.post("/addNewPatient",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.addNewPatient)
router.patch("/updateCurrentDoctor",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.updateCurrentDoctor)
router.patch("/doctor/update/:id",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.updatePatientFromDoctor)
router.get("/getMeAllPatient",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.getAllPatientForDoctor)
router.get("/patients/:id",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.getPatientInfoById)
router.patch("/update/info",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.updateInfo)
export default router