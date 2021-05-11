import express from "express"
import * as information_serves from "../response-Handler/inormation-serves-handler/information-serves-handler.js";


const route=express.Router()

route.get("/title",information_serves.getAllTitle)
route.get("/documant/:id",information_serves.getDocumant)
route.get("/patient/getTip",information_serves.getTip)
route.post("/add",information_serves.add)

export default route