import express from "express"
import * as password_serves from "../response-Handler/update_password/passwprd_serves_handler.js"

const router=express.Router()

router.patch("/sendCodePatient",password_serves.sendCodeToPatient)
router.patch("/updatePassword",password_serves.updatePasswordPatient)


export default router





// const sendCodeToPatient=async (req,res,_)=>{
//
//     const patientInfo=await patient.find({id:req.bod})
//
// }