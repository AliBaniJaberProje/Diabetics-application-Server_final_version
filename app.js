
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
import jwt from "jsonwebtoken";
import event from "./model/event.js";
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
app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.get('/',async (req, res, next)=>{



    try{
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMTExMSIsInBhc3N3b3JkIjoiJDJhJDEwJGs3cEdXYUs4WlZJaEdDeXhSTi5KM08yM0ZOblNaVjh5Rm5YSGZJaUdzUHNreHh1SVhmbXplIiwiX2lkIjoiNjA3NjFlZWRlOWRmNDkwMDE1MDdmZDhmIiwiaWF0IjoxNjE4Njc4NzYyfQ.wrNFuMFQWtwPvth3xhZG2bZ6l3PmyeDOJU9BOpRKfKM"
        const resultDecodeJWT=  jwt.decode(token);

        let nowDate=new Date()


        console.log(nowDate)

        const startDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 0,0,0,0,)

        const endDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 23,59,59,59,)

        const events=await event.find({$and:[
                {idDoctor:resultDecodeJWT.id},
                  {startTime:{ $gte: startDate, $lte: endDate }}

            ]})///.select({_id:true,startEventTime:true,endEventTime:true,title:true,typeEvent:true,taken:true})

        res.status(200).json(events)
    }catch (e) {
        res.status(400).json({"msg":e.message})

    }



    // const accountSid = "ACf756b0d39f3611d01dc4871da717e97c";
    // const authToken ="d38fb8f5f22be6af88451f263177a08b";
    // const client2 = client(accountSid, authToken);
    // client2.messages
    //     .create({
    //         body: 'server side',
    //         from: '+14704358572',
    //         to: '+972598045018'
    //     })
    //     .then(message => console.log(message.sid));

    res.status(200).json({
        "token":'req.headers.authorization.split(" ")[1]'
    })






    // res.status(200).json({
    //     "message":"Ali Bani Jaber Server  ",
    // })
})


export default app
