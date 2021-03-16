import dailyReadingModel from "../../model/diabetesScreening.js"
import jwt from 'jsonwebtoken'
const addNewReading =async (req,res,_)=>{

    const endDate=(new Date(Date.now()))
    const start=new Date(endDate.getFullYear(),endDate.getUTCMonth(),endDate.getDate(),0,0,0,0)
    const resultDailyReading =await dailyReadingModel.find({date:{ $gte: start, $lte: endDate }})
    if(resultDailyReading.length==0){
        const dailyReading =new  dailyReadingModel({
            date:Date.now(),
            idPatient:"123456789",
            inputInfo:[
                {
                    "id":1,
                    value:"102",
                    timestamp:Date.now(),
                    description:"قبل الأفطار"
                }
            ]

        })
        await dailyReading.save()
        res.status(200).json({
            "msg":resultDailyReading
        })
    }else{
        //await Patient.updateOne({id:req.body.id},{$push:{"lastDoctor":patient[0].currentDoctor}})

        const resultAddReading=await dailyReadingModel.findByIdAndUpdate(resultDailyReading[0]['_id'],
            {$push:{"inputInfo":{
                        "id":2,
                        value:"102",
                        timestamp:Date.now(),
                        description:"بعد الافطار بساعتين"
                    }}}
        )
        res.status(200).json({
            "msg":resultAddReading
        })
    }


}

const getInformationDailyReadingAtThisDay=async (req,res,_)=>{

    const resultJWT= await jwt.decode(req.headers.token)
    console.log(resultJWT.id)
    res.status(200).json({
        "msg":Date.now()
    })
}


export {
    addNewReading,
    getInformationDailyReadingAtThisDay
}