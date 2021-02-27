import express from "express"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"
import * as doctor_ServesApi from "../response-Handler/doctorServes-handler/doctorServes.js";
const router=express.Router()


router.post("/addNewPatient"/*,isAuthorisedUser.isAuthorisedDoctor*/,doctor_ServesApi.addNewPatient)


export default router