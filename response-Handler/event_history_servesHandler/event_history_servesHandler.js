import eventHistory from "../../model/eventHistory.js";
import jwt from "jsonwebtoken";


const getEventHistoryToDoctor=async (req,res,_)=>{

   try {
       const token=req.headers.authorization.split(" ")[1]
       const resultDecodeJWT=  jwt.decode(token);


       const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)

       const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
       const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)

        const resultEvents=await eventHistory.find({$and:[{idD:resultDecodeJWT.id},{idPatient:req.params.idPatient},{startTime:{ $gte: startDate1, $lte: endDate1 }}]}).select({startTime:true,isCome:true,note:true,idEvent:true})
        res.status(200).json(resultEvents)

   }catch (e) {
       res.status(404).json({"msg":e.message})
   }

}

const getEventHistoryToPatient=async (req,res,_)=>{

    try {


        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)

        const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        const resultEvents=await eventHistory.find({$and:[{idPatient:resultDecodeJWT.id},{startTime:{ $gte: startDate1, $lte: endDate1 }}]}).populate("idDoctor" ," imgURL username ").select({startTime:true,isCome:true,note:true,idEvent:true})
        res.status(200).json(resultEvents)

    }catch (e) {
        res.status(404).json({"msg":e.message})
    }


}

const event=async (req,res,_)=>{
    try {


        const toFindNumberOfDays=new Date(2021,4,0,0,0,0,0)

        const startDate1=new Date(2021,3,0,0,0,0,0)
        const endDate1=new Date(2021,Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)

        const resultEvents=await eventHistory.find({$and:[{idPatient:"123123123"},{startTime:{ $gte: startDate1, $lte: endDate1 }}]}).select({startTime:true,isCome:true,note:true,idEvent:true})


    }catch (e) {
        res.status(404).json({"msg":e.message})
    }
}


const eventHistoryCount=async (req,res,_)=>{
    try {
        console.log("************************")
        console.log(req.headers)
        console.log("************************")

        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);
        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)
        const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)
        const resultEvents=await eventHistory.find({$and:[{idD:resultDecodeJWT.id},{startTime:{ $gte: startDate1, $lte: endDate1 }}]})
        var data={}
        var date_serves=new Date()
        for(var i=0;i<resultEvents.length;i++){
            date_serves=new Date(resultEvents[i]["startTime"])
            if(!data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]){
                data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]=0
            }
            data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]+=1
        }
        res.status(200).json(data)
    }catch (e) {
        console.log("============================")
        console.log(e.message)
        console.log("========================")
        res.status(404).json({"msg":e.message})
    }

}


export {
    getEventHistoryToDoctor,
    event,
    getEventHistoryToPatient,
    eventHistoryCount
}