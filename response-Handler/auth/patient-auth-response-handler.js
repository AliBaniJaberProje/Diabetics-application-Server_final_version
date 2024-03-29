import Patient from "../../model/users/patient.js"
import doctor from "../../model/users/doctor.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const signInPatient =async (req,res,_)=>{
    try{
        const patientUser=await Patient.find({"id":req.body.id})//.select({"__v":0,})

        const checkPassword =await bcrypt.compare(req.body.password,patientUser[0].password)
        if(checkPassword){
            await Patient.findOneAndUpdate({id:req.body.id},{isOnline:true})
            const doctorName=await doctor.findOne({id:patientUser[0]['currentDoctor']}).select({username:true})
            const token=await jwt.sign({
                id:patientUser[0].id,
                password:patientUser[0].password,
                _id:patientUser[0]["_id"]
            },'privateKey')
            console.log(token)
            res.status(200).header('x-auth-token',token).json({
                msg:"user Authorised",
               // patient:patientUser[0],
                token:token,
                username:doctorName["username"]
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