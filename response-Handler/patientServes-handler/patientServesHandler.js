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



         const startDate=new Date(Number(req.body["start"].split('-')[0]),
             Number(req.body["start"].split('-')[1]),
             Number(req.body["start"].split("-")[2].split(" ")[0]),0,0,0,0)


         const endDate=new Date(Number(req.body["start"].split('-')[0]),
             Number(req.body["start"].split('-')[1]),
             Number(req.body["start"].split("-")[2].split(" ")[0]),23,59,59,0)





       //  var start = new Date(2021, 3, 7,0,0,0,0);
       // var end = new Date(2021, 3, 7,23,59,59,59);
        const  result=await event.find({startEventTime: { $gte: startDate, $lte: endDate },"taken.available":true,},"typeEvent taken startEventTime endEventTime ").sort("startEventTime")
         console.log(result.length)
         res.status(200).json({
             msg:result
         })
     }catch(error){
         res.status(400).json({
             msg:error.message
         })
     }
}



const t=async (req,res,next)=>{
    try{


            const newEvent=new event({
                startEventTime:new Date(2021, 2, 9,6,30,0,0),
                endEventTime:new Date(2021, 2, 9,7,0,0,0),
                typeEvent:"8/3/2021",
                taken:{
                    available:true,
                    userTake:null,
                }

        })

  var result= await newEvent.save()


        console.log(result)
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
    t


}
