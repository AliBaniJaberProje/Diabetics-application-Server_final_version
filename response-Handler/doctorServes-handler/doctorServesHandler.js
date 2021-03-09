import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken";

const addNewPatient=async (req,res,_)=>{
    try{

        const newPatient=new Patient(req.body)
        console.log(newPatient)
        await newPatient.save()
        res.status(200).json({
            msg:"operation accomplished successfully",
            status:200,
        })


    }catch(e){
        res.status(400).json({
            msg:e.message,
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
        console.log(req.headers["token"])
        const resultDecodeJWT= await jwt.decode(req.headers["token"]);

        const patuiontResult=await Patient.find({"currentDoctor":resultDecodeJWT.id}," id ").populate("patient").select({currentDoctor:true,imgURL:true,isOnline:true})

        console.log(patuiontResult)
        }catch(e){
        res.status(401).json({

        })
    }


}







export {
    addNewPatient,
    getAllPatientForDoctor,
    updateCurrentDoctor
}