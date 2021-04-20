

import jwt from "jsonwebtoken"
import Patient from "../../model/users/patient.js"
import doctor from "../../model/users/doctor.js"
import bcrypt from "bcryptjs";

async  function hashPassword(password,salt)  {
    return await bcrypt.hash(password,salt)
}

function getRandom() {
    const minm = 10000;
    const maxm = 99999;
    return  Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}


const sendCodeToPatient=async (req,res,_)=>{
  try{

      const randomCode=getRandom()
      const patientInfo=await Patient.findOneAndUpdate({id:req.body.id,phoneNumber:req.body.phoneNumber},{$set:{pinCode:randomCode}})
      if(patientInfo!=null){
          res.status(200).json({
              "code":randomCode,
          })
      }else{
          res.status(201).json({"msg":"بيانات خاطىء "})
      }
  }catch (e){
      res.status(404).json({"msg":e.message})
  }
    ///// send Code to phone
}

const updatePasswordPatientForgetIt=async (req, res, _)=>{
   try {
       const saltRounds=10;
       console.log(req.body)
       const  salt=await bcrypt.genSalt(saltRounds);
       const passwordD=await hashPassword( req.body.password,salt)

       const patientInfo=await Patient.findOneAndUpdate({id:req.body.id,phoneNumber:req.body.phoneNumber,pinCode:req.body.pinCode},{$set:{password:passwordD}})
       res.status(200).json(req.body.password)
   }catch (e) {
       res.status(404).json(e.message)
   }

}

const updatePasswordPatientNotForgetIt=async (req,res,_)=>{
    try{
        const resultJWTDecode=await jwt.decode(req.headers['x-auth-token'])
        const patientUser=await Patient.findOne({"id":resultJWTDecode.id})
        if(patientUser!=null){
            const checkPassword =await bcrypt.compare(req.body.password,patientUser[0].password)
            if(checkPassword){
                const saltRounds=10;
                console.log(req.body)
                const  salt=await bcrypt.genSalt(saltRounds);
                const passwordD=await hashPassword( req.body.newPassword,salt)

                const patientInfo=await Patient.findOneAndUpdate({id:req.body.id},{$set:{password:passwordD}})
                res.status(200).json({
                    "msg":"تم تغير كلمة السر بنجاح"
                })
                // done

            }else{
                res.status({
                    "msg":"كلمة السر السابقة غير صحيحة"
                })
            }
        }
        else{
            res.status(400).json({
                "msg":"العملية خاطئ "
            })
        }


    }
    catch (e) {
        res.status(404).json({"msg":"error"+e.message})
    }
}








export {
    sendCodeToPatient,
    updatePasswordPatientForgetIt,
    updatePasswordPatientNotForgetIt
}