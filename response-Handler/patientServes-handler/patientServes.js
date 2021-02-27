import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken"

const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);

const updateInfo=async (req,res,next)=>{
    Patient.findOneAndUpdate({id:resultDecodeJWT.id},{$set:req.body}).then(value=>{

        res.status(200).json({
            status:200,
            message:'update success'
        })
    }).catch(error=>{
        res.status(400).json({
            status:400,
            message:'error update'
        })
    })

}

export {
    updateInfo
}
