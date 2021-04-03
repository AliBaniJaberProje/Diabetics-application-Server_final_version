import doseHistory from "../../model/doseHistory.js"

const getHistoryDosesToDoctor=async (req,res,_)=>{

    try {
        const dataForThisUser=await doseHistory.find({"":req.params.id}).sort({endDate:-1})
        console.log(dataForThisUser)

        res.status(200).json(dataForThisUser)

        // const startDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,0,0,0,0,0)
        // const endDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,31,23,59,59,59)
        // let resultReading=await doseHistory.find({$and:[{date: { $gte: startDate, $lte: endDate }},{idPatient:req.params.id}]})
        // resultReading=[]
        // if(resultReading.length!=0){
        //     res.status(200).json(resultReading)
        // }else{
        //     let result=[]
        //     const dataForThisUser=await doseHistory.find({idPatient:req.params.id}).sort({endDate:true})
        //     res.status(200).json(dataForThisUser)
        //     // while (true){
        //     //
        //     // }
    //    }

    }catch (e) {
        console.log(e.message)
        res.status(404).json({
            msg:"error"
        })
    }

}
export{
    getHistoryDosesToDoctor
}