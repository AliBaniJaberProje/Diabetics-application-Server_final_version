import express from "express"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
import * as doctor_ServesApi from "../response-Handler/doctorServes-handler/doctorServesHandler.js";
const router=express.Router()


router.post("/addNewPatient",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.addNewPatient)
router.patch("/updateCurrentDoctor"/*,isAuthorisedUser.isAuthorisedDoctor*/,doctor_ServesApi.updateCurrentDoctor)

router.get("/getMeAllPatient",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.getAllPatientForDoctor)
router.get("/patients/:id",isAuthorisedUser.isAuthorisedDoctor,doctor_ServesApi.getPatientInfoById)
export default router