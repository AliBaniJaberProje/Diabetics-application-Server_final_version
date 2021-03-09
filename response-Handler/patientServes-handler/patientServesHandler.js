import Patient from "../../model/users/patient.js"
import jwt from "jsonwebtoken"
import event from "../../model/event.js";


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


const t=async (req,res,next)=>{
    try{


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
    updateInfo,
    t


}
