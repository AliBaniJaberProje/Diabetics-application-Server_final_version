
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

app.use('/event',eventRoute)
app.use("/food",foodRoute)
app.use("/imagesUpload",imageUploadRouter)

app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.get('/',async (req, res, next)=>{


    const accountSid = "ACf756b0d39f3611d01dc4871da717e97c";
    const authToken ="d38fb8f5f22be6af88451f263177a08b";
    const client2 = client(accountSid, authToken);


    console.log(res.headers["token"])
    res.status(200).json(
        res.headers["token"]+"zeeeb"
    );


    // tr("Hello", { from: "en", to: "ja", tld: "co.jp" })
    //     .then(function (result) {
    //         console.log(result.text); // こんにちは
    //         console.log(result.src); // en
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });


    // client2.messages
    //     .create({
    //         body: 'server side',
    //         from: '+14704358572',
    //         to: '+970595049501'
    //     })
    //     .then(message => console.log(message.sid));
    //

    res.status(200).json({
        "message":"Ali Bani Jaber Server  ",
    })
})


export default app
