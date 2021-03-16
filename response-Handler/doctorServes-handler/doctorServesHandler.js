import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken";
import dose from '../../model/dose.js'
import mongoose from "mongoose";


const addNewPatient=async (req,res,_)=>{

    console.log(req.body)

    const resultDecodeJWT=  jwt.decode(req.headers.authorization.split(" ")[1]);
    console.log(resultDecodeJWT.id)

    try{
        let  r
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

        const resultAddDose=await newdose.save()
        console.log(newPatient+resultDecodeJWT)
        console.log(resultAddDose)
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
//
const updateCurrentDoctor=async (req,res,next)=>{
    try {

        const idPatient =req.body.id;
        const patient=await Patient.find({id:idPatient})
        await Patient.updateOne({id:req.body.id},{$push:{"lastDoctor":patient[0].currentDoctor}})
        await Patient.updateOne({id:req.body.id},{$set:{"currentDoctor":req.body.newDoctor}})
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

        const patuiontResult=await Patient.find({"currentDoctor":"999999999"}," id ").populate("patient").select({currentDoctor:true,imgURL:true,isOnline:true})
        ///const lastPatient=await Patient.find({lastDoctor:{$in:[]}})

        console.log(patuiontResult)
        res.status(401).json({
            "msg":patuiPaent
        })
        }catch(e){

    }


}







export {
    addNewPatient,
    getAllPatientForDoctor,
    updateCurrentDoctor
}