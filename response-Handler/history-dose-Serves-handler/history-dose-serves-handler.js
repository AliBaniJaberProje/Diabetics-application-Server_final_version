import doseHistory from "../../model/doseHistory.js"

const getHistoryDosesToDoctor=async (req,res,_)=>{




    try {
        const toFindNumberOfDays=new Date(Number(req.params['year']),Number(req.params['month']),0,0,0,0,0)

        const startDate1=new Date(Number(req.params['year']),Number(req.params['month'])-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params['year']),toFindNumberOfDays.getDate(),30,23,59,59,59)

        let resultReading=await doseHistory.find({$and:[{$or:[
                    {$and:[
                            {startDate: {$gte:startDate1  }},
                            {endDate: {$lte: endDate1 }},
                        ]},
                    {$and:[
                            {startDate: {$lte:startDate1  }},
                            {endDate: {$gte:startDate1  }},
                        ]},
                    {startDate: { $gte: startDate1, $lte: endDate1 }}
                    // {$and:[
                    //         {startDate: {$lte:startDate1  }},
                    //         {endDate: {$lte:endDate1  }},
                    //     ]},


                ]

            },{"doseItem.idPatient":req.params.id},]}
        )




        console.log(resultReading)
        res.status(200).json(resultReading)
    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({
            msg:"error"
        })
    }











}
export{
    getHistoryDosesToDoctor
}