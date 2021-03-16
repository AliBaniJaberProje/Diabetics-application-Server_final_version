import mongoose from "mongoose";

import joi from 'joi'

// const ItemInfoSchema=new mongoose.Schema({
//     id:{
//         type:String,
//     },
//     value:{
//         type:Number,
//     },
//     timestamp:{
//         type:Number,
//         default:(new Date()).getTime()
//     }
// })


const dailyReading=new mongoose.Schema({

    date:{
         type:Date,
        default:Date.now(),
    },
    idPatient:{
        type:String,
        ref:'patient'
    },
    inputInfo:{
        type:Array,

    },



})

export default mongoose.model('dailyReading',dailyReading)