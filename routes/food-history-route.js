import express from "express"
import * as foodHistoryHandler from "../response-Handler/food-history-serves-handler/food-history-servesHandler.js"
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'


const route =express.Router()

route.post("/",foodHistoryHandler.addFood)
route.get("/:year/:month/:day",isAuthorisedUser.isAuthorisedPatient,foodHistoryHandler.getFoodHistoryInDay)
route.get("/doctor/:id/:year/:month/:day",isAuthorisedUser.isAuthorisedDoctor,)


export  default  route