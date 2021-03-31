import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken"
import event from "../../model/event.js";
import doctor  from "../../model/users/doctor.js";

const updateInfo=async (req,res,next)=>{
    const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
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

const getIdAndIdCurrentDoctor=async (req, res, _)=>{
    try{
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        const patientUser=await Patient.findOne({id:resultDecodeJWT.id},"id currentDoctor")
        const docotrimgURL=await doctor.findOne({id:patientUser["currentDoctor"]},"imgURL username")

        patientUser["doctorusername"]=docotrimgURL["username"]

        console.log(patientUser)
        res.status(200).json({

            patient: {
                patientUser,
                'imgURLDoctor':docotrimgURL["imgURL"]
            },

        })
    }catch(error){
        res.status(400).json({
            msg:"error"
        })
    }
}

const getAllDoctorToChat=async (req,res,_)=>{
    try{
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);

        const infoPatient=await Patient.findOne({id:resultDecodeJWT.id},"id currentDoctor imgURL lastDoctor ").populate("doctor")
        infoPatient["lastDoctor"].push(infoPatient["currentDoctor"])
        const infoDoctors=await doctor.find({id:{$in:infoPatient["lastDoctor"]}},"imgURL id isOnline username");
        console.log(infoPatient)
        console.log(infoDoctors)
        res.status(200).json({
            patientInfo:infoPatient,
            doctorsInfo:infoDoctors,
        })
    }catch(error){
        res.status(400).json({
            msg:"error"
        })
    }
}

const getProfileInfo=async (req,res,_)=>{

    try{
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        const result=await Patient.findOne({id:resultDecodeJWT.id})
        res.status(200).json({
            "msg":result
        })
    }catch(error){
        res.status(400).json({
            msg:"error"
        })

    }

}

const t=async (req,res,next)=>{
    try{


            const newEvent=new event({
                startEventTime:new Date(2021, 2, 21,3,0,0,0),
                endEventTime:new Date(2021, 2, 21,3,30,0,0),
                typeEvent:"8/3/2021",
                taken:{
                    available:true,
                    userTake:null,
                }

        })

  var result= await newEvent.save()


        console.log("add done ")
        res.status(200).json({
            msg:result
        })
    }catch(error){
        res.status(400).json({
            msg:error.message
        })
    }
}





export {
    t,
    updateInfo,
    getProfileInfo,
    getIdAndIdCurrentDoctor ,
    getAllDoctorToChat

}
