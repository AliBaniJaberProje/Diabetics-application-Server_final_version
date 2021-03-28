import express from 'express'
import * as doseServes_handler from "../response-Handler/doseServes-handler/doseServes-handler.js"

const router = express.Router()

router.get('/',doseServes_handler.getDoseForPatient)


export default router