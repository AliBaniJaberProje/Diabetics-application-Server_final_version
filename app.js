
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
app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.get('/',async (req, res, next)=>{



    try {

        const inputDate=new Date(2021,4,5,0,0,0,0)
        let resultReading=await doseHistory.find({$or:[{$and:[
                    {startDate: {$gte: inputDate }},
                    {endDate: {$lte: inputDate }},
                    {"doseItem.idPatient":"123123123"},


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
