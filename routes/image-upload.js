import express from 'express'
const router = express.Router()
import * as isAuthorisedUser from '../middleware/auth/isAuthorisedUser.js'
import multer from "multer";
import path from "path";
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

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

router.post("/patient",isAuthorisedUser.isAuthorisedPatient,updlode.single('img'),(req,res,_)=>{
    console.log(req.file)
    res.status(200).json({
        msg:"success",
        'imgUrl':"https://jaber-server.herokuapp.com/"+"images/patient"+req.file.filename
    })
})



export default router