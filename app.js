
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
import foodRoute from "./routes/foodRoute.js";
import multer from "multer";
import path from "path";
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/images/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now().toString()+ file.originalname)
    }
})
const updlode = multer({
    storage: storage
})


const app=express()

connectMongoDB()


app.use(body_parser.json())
// app.use(multer({storage:fileStorage , fileFilter:fileFilter}).single('storage'))
// app.use("/image",express.static(path.join(__dirname,"storage")))
app.use(body_parser.urlencoded({extended: true}));
app.use(allowLevelOne)
app.all(allowLevelTwo)
app.use("/userImage",express.static('storage/images/'));
app.use(helmet());

app.use("/auth",authRoute)

app.use("/doctor",doctorRoute)
app.use("/patient",patientRoute)

app.use('/event',eventRoute)
app.use("/food",foodRoute)

app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.post('/',updlode.single('img'),(req, res, next)=>{

    console.log(req.file)
    const accountSid = "ACf756b0d39f3611d01dc4871da717e97c";
    const authToken ="d38fb8f5f22be6af88451f263177a08b";
    const client2 = client(accountSid, authToken);

    const imgurl=req.file.path;

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
