import doseHistory from "../../model/doseHistory.js"

const getHistoryDosesToDoctor=async (req,res,_)=>{




        try {

            const inputDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,1,0,0,0,0)
            let resultReading=await doseHistory.aggregate({$or:[{$and:[
                            {'startDate.month': {$gte: inputDate }},
                            {'endDate.month': {$lte: inputDate }},
                            {"doseItem.idPatient":req.params.id},


                        ]},

                        // {$and:[{$mach:{
                        //             'startDate':inputDate,
                        //             'endDate':inputDate
                        //         }},{"doseItem.idPatient":req.params.id}]
                        //
                        // }


                        ]}



                    )




            console.log(resultReading)
            res.status(200).json(resultReading)
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