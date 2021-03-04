import mongoose from 'mongoose'
import joi from 'joi'

const event=new mongoose.Schema({

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
    taken:{

        available:{
            type:Boolean,

            default:true,
        },
        userTake:{

            type:String,
            ref :'patient'
        },


    },





})


export default mongoose.model('event',event)