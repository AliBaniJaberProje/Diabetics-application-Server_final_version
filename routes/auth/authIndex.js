import express from "express"
const router = express.Router();
import doctorAuthRoutes from "./doctor-auth-router.js"
import patientAuthRoutes from "./patient-auth-router.js"

router.use('/doctor',doctorAuthRoutes)

router.use('/patient',patientAuthRoutes)

export default router

