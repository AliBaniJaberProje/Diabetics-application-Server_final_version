import express from "express"
import * as information_serves from "../response-Handler/inormation-serves-handler/information-serves-handler.js";


const route=express.Router()

route.get("/title",information_serves.getAllTitle)
route.get("/documant/:id",information_serves.getDocumant)



export default route