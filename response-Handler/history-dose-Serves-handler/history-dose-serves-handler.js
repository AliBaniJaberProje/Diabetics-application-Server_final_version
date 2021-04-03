import doseHistory from "../../model/doseHistory.js"

const getHistoryDosesToDoctor=async (req,res,_)=>{

    try {

        const startDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,0,0,0,0,0)
        const endDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,31,23,59,59,59)
        let resultReading=await doseHistory.find({$and:[{startDate: { $gte: startDate, $lte: endDate }},{"doseItem.idPatient":req.params.id}]})
        console.log(resultReading)
        if(resultReading.length!=0){
            res.status(200).json(resultReading)
        }else{

            const dataForThisUser=await doseHistory.find({"doseItem.idPatient":req.params.id}).sort({endDate:-1})
            console.log(dataForThisUser)
            res.status(200).json(dataForThisUser[0])

       }

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