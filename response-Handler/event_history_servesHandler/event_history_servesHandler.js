import eventHistory from "../../model/eventHistory.js";


const getEventHistoryToDoctor=async (req,res,_)=>{

   try {
       const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)

       const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
       const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)

        const resultEvents=await eventHistory.find({$and:[{idPatient:req.params.idPatient},{startTime:{ $gte: startDate1, $lte: endDate1 }}]}).select({startTime:true,isCome:true,note:true})


   }catch (e) {
       res.status(404).json({"msg":e.message})
   }

}

export {
    getEventHistoryToDoctor
}