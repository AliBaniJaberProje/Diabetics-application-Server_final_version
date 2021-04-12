import express from "express"
import * as foodHistoryHandler from "../response-Handler/food-history-serves-handler/food-history-servesHandler.js"


const route =express.Router()

route.post("/",foodHistoryHandler.addFood)
route.get("/:year/:month/:day",foodHistoryHandler.getFoodHistoryInDay)



export  default  route