import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken";
import dose from '../../model/dose.js'
import mongoose from "mongoose";
import event from "../../model/event";


const addNewPatient=async (req,res,_)=>{

    console.table(req.body)
    console.table(req.headers)
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


        const dose= new dose({
                idPatient:req.body['id'],
                inject:req.body['inj']
            })


        const newEvent=new event({
            startEventTime:new Date(2021, 2, 8,23,20,0,0),
            endEventTime:new Date(2021, 2, 8,23,55,0,0),
            typeEvent:"8/3/2021",
            taken:{
                available:true,
                userTake:null,
            }

        })

        var result= await newEvent.save()


        const resultAddDose=await dose.save()
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