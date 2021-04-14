import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken";
import dose from '../../model/dose.js'
import bcrypt from "bcryptjs";
const saltRounds=10;
async  function hashPassword(password,salt)  {
    return await bcrypt.hash(password,salt)
}


const addNewPatient=async (req,res,_)=>{

    console.log(req.body)
    const  salt=await bcrypt.genSalt(saltRounds);
    req.body.password = await hashPassword( req.body.password,salt)
    const resultDecodeJWT=  jwt.decode(req.headers.authorization.split(" ")[1]);

    try{
        const newPatient=new Patient({
                id:req.body.id,
                username:req.body.username,
                gender:req.body.gender,
                location:req.body.location,
                birthDate:req.body.birthDate,
                diagnosisYear:req.body.diagnosisYear,
                phoneNumber:req.body.phoneNumber,
                diabetesType:req.body.diabetesType,
                weight:req.body.weight,
                height:req.body.height,
                notes:req.body.notes,
                currentDoctor:resultDecodeJWT.id,
                password:req.body.password,
                imgURL:req.body.imgURL,
                numberOFinjCard:req.body.numberOFinjCard,
        })
           await newPatient.save()


        const newdose= new dose({
                idPatient:req.body['id'],
                inject:req.body['inj']
            })

        await newdose.save()

        res.status(200).json({
            message:"operation accomplished successfully",
            status:200,
        })


    }catch(e){
        res.status(401).json({
             message:e.message,
            status:400,
        })
    }
}

const updateCurrentDoctor=async (req,res,next)=>{
    try {
        console.log(req.body)

        const resultDecodeJWT=  jwt.decode(req.headers.authorization.split(" ")[1]);
        const idPatient =req.body.id;
        const patient=await Patient.find({id:idPatient})
        await Patient.updateOne({id:req.body.id},{$push:{"lastDoctor":patient[0].currentDoctor}})
        await Patient.updateOne({id:req.body.id},{$set:{"currentDoctor":resultDecodeJWT.id}})
        res.status(200).json({
            msg:"operation accomplished successfully",
            status:200,
        })
    }catch (e) {
        res.status(401).json({
            msg:e.message,
            status:401,
        })
    }

}

const getAllPatientForDoctor=async (req,res,_)=>{

    try {

       // const resultDecodeJWT= await jwt.decode(req.headers['token']);
        //console.log(req.headers.authorization.split(" ")[1])
        const resultDecodeJWT=  jwt.decode(req.headers.authorization.split(" ")[1]);
        //console.log(resultDecodeJWT.id)
        const patuiontResult=await Patient.find({"currentDoctor":resultDecodeJWT.id}," id ").populate(" patient ").select({imgURL:true,_id :false,username:true,phoneToken:true})

        ///const lastPatient=await Patient.find({lastDoctor:{$in:[]}})
      //  console.log(patuiontResult)
        console.log(patuiontResult)
        res.status(200).json({
            "patient":patuiontResult
        })
        }catch(e){
        res.status(400).json({
            'msg':e.message
        })

    }


}

const getPatientInfoById=async (req,res,_)=>{

    try{
        const idPatient=(req.params.id).trimEnd()
        const patientInfo=await Patient.findOne({"id":idPatient}).select({_id:false,__v:false,lastDoctor:false,currentDoctor:false,password:false,numberOFinjCard:false,isOnline:false});
        //console.log(patientInfo)
        res.status(200).json({"patientInfo":patientInfo})
    }catch(e){
        res.status(401).json({
            "patientInfo":e.message
        })
    }
}

const updatePatientFromDoctor=async (req,res,_)=>{
    try {
        await Patient.updateOne({id:req.params.id},{$set:{
            "username":req.body["name"],
             "birthDate":res.body["birthdate"],
             "diagnosisYear":res.body["yearOfdiagnosis"],
             "location":res.body["location"],
             "phoneNumber":res.body["phoneNum"],
             "diabetesType":res.body["diabetesType"],
             "weight":res.body["weight"],
             "height": res.body["height"],
             "notes":res.body["drNote"],
              "id":  res.body["idNum"],
                "gender": res.body["gender"]

        }})
        res.status(200).json({
            msg:"operation accomplished successfully",
            status:200,
        })
    }catch (e) {
        res.status(404).json({
            "error":e.message
        })
    }
}



export {
    addNewPatient,
    getAllPatientForDoctor,
    updateCurrentDoctor,
    getPatientInfoById,
    updatePatientFromDoctor
}