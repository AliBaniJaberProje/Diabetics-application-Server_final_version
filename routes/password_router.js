import express from "express"
import * as password_serves from "../response-Handler/update_password/passwprd_serves_handler.js"
import * as isAuthorisedUser from "../middleware/auth/isAuthorisedUser.js"

const router=express.Router()

router.patch("/sendCodePatient",password_serves.sendCodeToPatient)
router.patch("/updatePassword",password_serves.updatePasswordPatientForgetIt)
router.patch("/forgetPassword",isAuthorisedUser.isAuthorisedPatient,password_serves.updatePasswordPatientNotForgetIt)
router.patch("/doctor/updatePassword",isAuthorisedUser.isAuthorisedDoctor,password_serves.updatePasswordDoctorNotForgetIt)
router.post("/doctor/sendCodeToDoctor",password_serves.sendCodeToDoctor)
router.patch("/doctor/forgetPassword",password_serves.updatePasswordDoctorForgetIt)

export default router





// const sendCodeToPatient=async (req,res,_)=>{
//
//     const patientInfo=await patient.find({id:req.bod})
//
// }