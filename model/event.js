import mongoose from 'mongoose'
import joi from 'joi'
import doctor from  "../model/users/doctor.js"
const event=new mongoose.Schema({


    idDoctor:{
        type:String,
        ref : "doctor"
    },
    startEventTime:{
        type:Date,
        required:true,
    },
    endEventTime:{
        type:Date,
        required:true,
    },
    typeEvent:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        default :"أسد"

    },
    taken:{
        available:{
            type:Boolean,

            default:true,
        },
        ApprovalFromDr:{
          type:Boolean,
          default:false
        },
        userTake:{
            type:String,
            ref :'patient'
        },


    },





})


export default mongoose.model('event',event)