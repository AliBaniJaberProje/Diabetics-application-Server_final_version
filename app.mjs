
import express from "express"
import body_parser from "body-parser"
import connectMongoDB from "./databaseConection.js"
import {allowLevelOne ,allowLevelTwo} from "./serverSettings.js"
const app=express()

connectMongoDB()


app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}));
app.use(allowLevelOne)
app.all(allowLevelTwo)


app.get('/',(req, res, next)=>{
    res.status(200).json({
        "message":"Ali Bani Jaber Server  ",
    })
})


export default app
