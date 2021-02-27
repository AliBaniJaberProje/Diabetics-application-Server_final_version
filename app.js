
import express from "express"
import body_parser from "body-parser"
import connectMongoDB from "./databaseConection.js"
import {allowLevelOne ,allowLevelTwo} from "./serverSettings.js"
import helmet from "helmet"
import authApi from "./routes/auth/authIndex.js"
import doctorApi from "./routes/doctorApi.js"
const app=express()

connectMongoDB()


app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}));
app.use(allowLevelOne)
app.all(allowLevelTwo)

app.use(helmet());

app.use("/auth",authApi)

app.use("/doctor",doctorApi)


app.use('/rr',(req, res, next) =>{
    res.status(200).json(req.body)
})

app.get('/',(req, res, next)=>{
    res.status(200).json({
        "message":"Ali Bani Jaber Server  ",
    })
})


export default app
