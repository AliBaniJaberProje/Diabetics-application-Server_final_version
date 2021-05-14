
import express from "express"
import body_parser from "body-parser"
import connectMongoDB from "./databaseConection.js"
import {allowLevelOne ,allowLevelTwo} from "./serverSettings.js"
import helmet from "helmet"

import authRoute from "./routes/auth/authIndex.js"
import doctorRoute from "./routes/doctorRoute.js"
import patientRoute from "./routes/patientRoute.js"
import eventRoute from "./routes/eventRoute.js"
import client from "twilio"
import foodRoute from "./routes/foodRoute.js"
import imageUploadRouter from "./routes/image-upload.js"
import dailyReadingRoute from "./routes/dailyReadingRoute.js"
import doseRoute from "./routes/doseRoute.js"
import stepsRoute from "./routes/number-of-stepRoute.js"
import doseHistoryRoute from "./routes/history-Dose-Route.js"
import doseHistory from "./model/doseHistory.js";
import FoodHistoryRoute from "./routes/food-history-route.js"
import cumulative_diabetesRouter from "./routes/cumulative_diabetesRoute.js"
import eventHistoryRoute from "./routes/eventHistoryRoute.js";
import password_router from "./routes/password_router.js";
import information_route from "./routes/information_route.js"
import jwt from "jsonwebtoken";
import event from "./model/event.js";
import doctor from  "./model/users/doctor.js"
import patient from "./model/users/patient.js";
import number_of_step from "./model/number-of-step.js";
import eventHistory from "./model/eventHistory.js";
const app=express()

connectMongoDB()


app.use(body_parser.json())

app.use(body_parser.urlencoded({extended: true}));
app.use(allowLevelOne)
app.all(allowLevelTwo)
app.use("/images",express.static('storage/images/'));
app.use(helmet());

app.use("/auth",authRoute)

app.use("/doctor",doctorRoute)
app.use("/patient",patientRoute)
app.use("/doseHistory",doseHistoryRoute)
app.use("/cumulative_diabetes",cumulative_diabetesRouter)
app.use('/event',eventRoute)
app.use("/food",foodRoute)
app.use("/dailyReading",dailyReadingRoute)
app.use("/imagesUpload",imageUploadRouter)
app.use("/dose",doseRoute)
app.use("/steps",stepsRoute)
app.use("/foodHistory",FoodHistoryRoute)
app.use("/eventHistory",eventHistoryRoute)
app.use("/password",password_router)
app.use("/information",information_route)
app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.get('/',async (req, res, next)=>{



    const accountSid = 'AC0b9475923abd11f5ba71acd3eaa14cbd';
    const authToken = '234330d1198b1b72fa226dc1634e1a44';
    const client1 =client(accountSid, authToken);

    client1.messages
        .create({
            body: "رابط تنزيل التطبيق" +
                "12325241"+   "رقم المستخدم :" +"\n"+
                "963258741"+  "  كلمة السر    :"+"\n",
            from: '+13613362834',
            to: '+970598420284',
        })
        .then(message => console.log(message.sid))
        .done();


    res.status(200).json("tm")

    // client.messages
    //     .create({
    //         "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //         "api_version": "2010-04-01",
    //         "body": "msg",
    //         "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
    //         "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
    //         "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
    //         "direction": "outbound-api",
    //         "error_code": null,
    //         "error_message": null,
    //         "from": "+15017122661",
    //         "messaging_service_sid": null,
    //         "num_media": "0",
    //         "num_segments": "1",
    //         "price": null,
    //         "price_unit": null,
    //         "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //         "status": "sent",
    //         "subresource_uris": {
    //             "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
    //         },
    //         "to": "+15558675310",
    //         "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
    //     })
    //     .then(message => console.log(message.sid));



    // try {
    //
    //     const toFindNumberOfDays=new Date(2021,5,1,0,0,0,0)
    //     const startDate1=new Date(2021,4,0,0,0,0,0)
    //     const endDate1=new Date(2021,4,toFindNumberOfDays.getDate(),23,59,59,59)
    //     const resultEvents=await eventHistory.find({$and:[{idD:"111111111"},{startTime:{ $gte: startDate1, $lte: endDate1 }}]})
    //
    //    var data={}
    //    var date_serves=new Date()
    //
    //     for(var i=0;i<resultEvents.length;i++){
    //         date_serves=new Date(resultEvents[i]["startTime"])
    //         if(!data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]){
    //             data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]=0
    //         }
    //         data[date_serves.getFullYear()+"-"+date_serves.getMonth()+"-"+date_serves.getDate()]+=1
    //     }
    //
    //     res.status(200).json(data)
    //
    // }catch (e) {
    //     res.status(404).json({"msg":e.message})
    // }



})


export default app
