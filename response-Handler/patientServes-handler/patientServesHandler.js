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

const test=async (req,res,next)=>{
     try{
         const newEvent=new event({
             startEventTime:new Date(2021, 3, 5,1,30,0),
             endEventTime:new Date(2021, 3, 5,2,0,0),
             typeEvent:"p2",
             taken:{
                 available:true,
                 userTake:null,
             }

     })
    //    var result= await newEvent.save()
         var start = new Date(2021, 2, 20);
         var end = new Date(2021, 11, 30);
       //
       const  result=await event.find({startEventTime: { $gt: start, $lt: end }})
        // console.log(result)

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
    test,

}
