import express from 'express'
const router = express.Router()


import * as patient_auth_mid from "../../middleware/auth/patient-auth-middleware.js"
import * as patient_auth_handler from "../../response-Handler/auth/patient-auth-response-handler.js"

router.post("/signIn",patient_auth_mid.signInValidationPatient,patient_auth_handler.signInPatient)



export default router