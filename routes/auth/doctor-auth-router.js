import express from "express"
const router=express.Router()

import * as auth_doctor_mid from "../../middleware/auth/doctor-auth-middleware.js"
import * as auth_handler_doctor from "../../response-Handler/auth/doctor-auth-response-handler.js"

router.post("/signUp",auth_doctor_mid.signUpValidationDoctor,auth_handler_doctor.signUpDoctor)

router.post("/signIn",auth_doctor_mid.signInValidationDoctor,auth_handler_doctor.signInDoctor)



export default router
