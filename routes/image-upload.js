import express from 'express'
const router = express.Router()
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import multer from "multer";
import jwt from "jsonwebtoken"
import patient from "../model/users/patient.js";

const storagePatient = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/images/patient/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now().toString()+file.originalname)
    }
})
const updlode = multer({
    storage: storagePatient
})

router.post("/patient",isAuthorisedUser.isAuthorisedPatient,updlode.single('img'),async(req,res,_)=>{
    const resultJWT=await jwt.decode(req.headers["x-auth-token"])

    await patient.findOneAndUpdate({id:resultJWT.id},{imgURL:"https://jaber-server.herokuapp.com/"+"images/patient/"+req.file.filename})
    res.status(200).json({
        msg:"success",
        'imgUrl':"https://jaber-server.herokuapp.com/"+"images/patient/"+req.file.filename
    })
})



export default router