import dailyReadingModel from "../../model/diabetesScreening.js"


import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const addNewReading =async (req,res,_)=>{
    try{
        const endDate=(new Date(Date.now()))
        const start=new Date(endDate.getFullYear(),endDate.getUTCMonth(),endDate.getDate(),0,0,0,0)
        const resultJWTDecode=await jwt.decode(req.headers['x-auth-token'])
        const resultDailyReading =await dailyReadingModel.find({$and:[{date:{ $gte: start, $lte: endDate }},{idPatient:resultJWTDecode.id}]})
        if(resultDailyReading.length==0){
            const dailyReading =new  dailyReadingModel({
                date:Date.now(),
                idPatient:resultJWTDecode.id,
                inputInfo:[
                    {
                        id:1,
                        value:0.0,
                        taken:false,
                        timestamp:Date.now(),
                        description:"قبل الأفطار",

                    },
                    {
                        id:2,
                        value:0.0,
                        taken:false,
                        timestamp:Date.now(),
                        description:"بعد الأفطار بساعتين",

                    },
                    {
                        id:3,
                        value:0.0,
                        taken:false,
                        timestamp:Date.now(),
                        description:"بعد الغداء بساعتين",
                    },
                    {
                        id:4,
                        value:0.0,
                        taken:false,
                        timestamp:Date.now(),
                        description:"بعد العشاء بساعتين",
                    },
                ]
            })
            await dailyReading.save()
            return res.status(201).json({
                "msg":"create object for this day"
            })
        }else{
            return  res.status(200).json({
                "msg":await dailyReadingModel.find({$and:[{date:{ $gte: start, $lte: endDate }},{idPatient:resultJWTDecode.id}]}).select({inputInfo:true})
            })
        }
    }catch(e){
        res.status(400).json({
            "msg":e.message
        })
    }
}

const insertAndUpdate=async (req,res,_)=>{
    try{
        let statusCode=200
        const endDate=(new Date(Date.now()))
        const start=new Date(endDate.getFullYear(),endDate.getUTCMonth(),endDate.getDate(),0,0,0,0)
        const resultJWTDecode=await jwt.decode(req.headers['x-auth-token'])
        const toCheckPreves=await dailyReadingModel.find({$and:[{'inputInfo.id':Number(req.body["idReading"])},
                {date:{ $gte: start, $lte: endDate }},
                {idPatient:resultJWTDecode.id}
            ]})
        let responseString=""


        for(var i=Number(req.body["idReading"]);i>1;i--){

            if(toCheckPreves[0]['inputInfo'][i-2]['taken']==false){

                responseString+=","+toCheckPreves[0]['inputInfo'][i-2]['description']

            }else{
                break
            }
        }
        console.log(responseString)

        const resultAddReading=await dailyReadingModel.updateOne({$and:[{'inputInfo.id':Number(req.body["idReading"])},
            {date:{ $gte: start, $lte: endDate }},
            {idPatient:resultJWTDecode.id}
            ]},{$set:{
            "inputInfo.$.value": Number(req.body['value']),
            "inputInfo.$.taken": true,
            "inputInfo.$.timestamp":Date.now(),
           // "inputInfo.$.description":'Date.now()',
        }})


       // {$and:[{'_id':{resultDailyReading[0]['_id']}}
        // {$set:{
        //     'inputInfo.$.value':18
        // }}

        res.status(200).json({
            "msg":responseString
        })
    }catch(err){
        res.status(400).json({
            "error":err.message
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

const getDailyReadingToDoctor=async (req,res,_)=>{
    try {
        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)///شرفي هان تغير

        console.log(req.params)
       const startDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,1,0,0,0,0)
        const endDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,toFindNumberOfDays.getDate(),23,59,59,59)
       const resultReading=await dailyReadingModel.find({$and:[{date: { $gte: startDate, $lte: endDate }},{idPatient:req.params.id}]}).sort({date:1})
        res.status(200).json(resultReading)
    }catch (e) {
        console.log(e.message)
        res.status(404).json({msg:"error"})
    }
}


const getDailyReadingToPatient=async (req,res,_)=>{
    try {

        const token=req.headers["x-auth-token"];
        const resultJWTDecode=await jwt.decode(token)
        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)///شرفي هان تغير


        const startDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,1,0,0,0,0)
        const endDate=new Date(Number(req.params['year']),Number(req.params['month'])-1,toFindNumberOfDays.getDate(),23,59,59,59)

        const resultReading=await dailyReadingModel.find({$and:[{date: { $gte: startDate, $lte: endDate }},{idPatient:resultJWTDecode.id}]}).select({_id:false,idPatient:false,__v:false}).sort({date:1})
       let date
        for(var i=0;i<resultReading.length;i++){
            date=new Date(resultReading[i]["date"])
            resultReading[i]._doc["date"]=(date.getMonth()+1)+"-"+date.getUTCDate();
        }

        return  res.status(200).json(resultReading)
    }catch (e) {
        console.log(e.message)
        res.status(404).json({msg:"error"})
    }
}



const getTheLastWeek=async (req,res,_)=>{
    try{
    var end =new  Date();
    const startDate=new Date()
    startDate.setDate(startDate.getDate()-7)


        const result=await dailyReadingModel.find({$and:[{date:{ $gte: startDate, $lte: end }},{idPatient:req.params.id}]}).sort({date:1})
        console.log("---------------------")
        console.log(result)
        res.status(200).json(result)

    }catch (e){
        res.status(404).json({
            "error":e.message
        })
    }

}



export {
    addNewReading,
    getInformationDailyReadingAtThisDay,
    insertAndUpdate,
    getDailyReadingToDoctor,
    getDailyReadingToPatient,
    getTheLastWeek


}