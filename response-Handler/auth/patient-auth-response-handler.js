import Patient from "../../model/users/patient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const signInPatient =async (req,res,_)=>{
    try{
        const patientUser=await Patient.find({"id":req.body.id})//.select({"__v":0,})

        const checkPassword =await bcrypt.compare(req.body.password,patientUser[0].password)
        if(checkPassword){
            const token=await jwt.sign({
                id:patientUser[0].id,
                password:patientUser[0].password
            },'privateKey')
            console.log(token)
            res.status(200).header('x-auth-token',token).json({
                msg:"user Authorised",
                patient:patientUser[0],
                token:token,
            })
        }else{
            res.status(404).json({msg:' user not Authorised',token:"error pass"})
        }

    }
    catch (e){
        res.status(404).json({msg:' user not Authorised',token:"error"})
    }
}
export{
    signInPatient
}