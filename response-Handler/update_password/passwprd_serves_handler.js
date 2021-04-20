

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

const updatePasswordPatient=async (req,res,_)=>{
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



export {
    sendCodeToPatient,
    updatePasswordPatient
}