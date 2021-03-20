import node_fetch from  "node-fetch"
import express from "express"
import * as foodHandler from "./../AdaptadorFoodServes/food-serves-handler.js"
const router =express.Router()

router.get("/all",foodHandler.getAllFood)
router.get("/",foodHandler.findFoodCategory)
router.get("/:fcd_id",foodHandler.getFoodDetails)



export default router

