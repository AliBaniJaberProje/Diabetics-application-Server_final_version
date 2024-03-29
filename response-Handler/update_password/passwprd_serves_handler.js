

import jwt from "jsonwebtoken"
import Patient from "../../model/users/patient.js"
import doctor from "../../model/users/doctor.js"
import bcrypt from "bcryptjs";
import client from "twilio";

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

          const accountSid = 'AC0b9475923abd11f5ba71acd3eaa14cbd';
          const authToken = '234330d1198b1b72fa226dc1634e1a44';
          const client1 =client(accountSid, authToken);
          client1.messages
              .create({
                  body: "\n"+randomCode,
                  from: '+13613362834',
                  to: '+97'+req.body.phoneNumber,
              })
              .then(message => console.log(message.sid))
              .done();


          res.status(200).json({
              "code":randomCode,
          })
      }else{
          res.status(201).json({"msg":"بيانات خاطىء "})
      }
  }catch (e){
      res.status(404).json({"msg":e.message})
  }
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
        console.log(req.body)
        const resultJWTDecode=await jwt.decode(req.headers['x-auth-token'])
        const patientUser=await Patient.findOne({"id":resultJWTDecode.id})
        if(patientUser!=null){
            const checkPassword =await bcrypt.compare(req.body.password,patientUser.password)
            if(checkPassword){
                const saltRounds=10;
                console.log(req.body)
                const  salt=await bcrypt.genSalt(saltRounds);
                const passwordD=await hashPassword( req.body.newPassword,salt)

                const patientInfo=await Patient.findOneAndUpdate({id:resultJWTDecode.id},{$set:{password:passwordD}})
                res.status(200).json({
                    "msg":"تم تغير كلمة السر بنجاح"
                })
                // done

            }else{
                res.status(201)({
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


const sendCodeToDoctor=async (req,res,_)=>{
    try{

        const randomCode=getRandom()
        const result=await doctor.updateOne({id:req.body.id},{$set:{"pinCode":randomCode}})
        console.log(result)
        if(result!=null){

            const accountSid = 'AC0b9475923abd11f5ba71acd3eaa14cbd';
            const authToken = '234330d1198b1b72fa226dc1634e1a44';
            const client1 =client(accountSid, authToken);
            client1.messages
                .create({
                    body: "\n"+randomCode,
                    from: '+13613362834',
                    to: '+970598045018',
                })
                .then(message => console.log(message.sid))
                .done();



            res.status(200).json({
                "code":randomCode,
            })
        }else{
            res.status(201).json({"msg":"بيانات خاطىء "})
        }
    }catch (e){
        res.status(404).json({"msg":e.message})
    }

}



const updatePasswordDoctorNotForgetIt=async (req,res,_)=>{
    try{
        console.log(req.body)
        const resultJWTDecode=  jwt.decode(req.headers.authorization.split(" ")[1]);

        const doctorUser=await doctor.findOne({"id":resultJWTDecode.id})

        if(doctorUser!=null){
            const checkPassword =await bcrypt.compare(req.body.password,doctorUser.password)
            if(checkPassword){
                const saltRounds=10;
                console.log(req.body)
                const  salt=await bcrypt.genSalt(saltRounds);
                const passwordD=await hashPassword( req.body.newPassword,salt)

                const doctorInfo=await doctor.findOneAndUpdate({id:resultJWTDecode.id},{$set:{password:passwordD}})
               res.status(200).json({
                    "msg":"تم تغير كلمة السر بنجاح"
                })
                // done

            }else{

                res.status(200).json({
                    "msg":"كلمة المرور غير  صحيحة"
                })
            }
        }
        else{
           res.status(404).json({
                "msg":"العملية خاطئ "
            })
        }


    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({"msg":"error"+e.message})
    }
}

const updatePasswordDoctorForgetIt=async (req, res, _)=>{
    try {
        const saltRounds=10;
        console.log(req.body)
        const  salt=await bcrypt.genSalt(saltRounds);
        const passwordD=await hashPassword( req.body.password,salt)

        const patientInfo=await doctor.updateOne({id:req.body.id},{$set:{password:passwordD}})


        console.log(patientInfo)
        res.status(200).json(req.body.password)
    }catch (e) {
        res.status(404).json(e.message)
    }

}


export {
    sendCodeToPatient,
    updatePasswordPatientForgetIt,
    updatePasswordPatientNotForgetIt,
    updatePasswordDoctorNotForgetIt,
    sendCodeToDoctor,
    updatePasswordDoctorForgetIt
}