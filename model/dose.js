import mongoose from 'mongoose'
import joi from 'joi'

const dose=new mongoose.Schema({

    date:{
        type:Date,
        default:Date.now()
    },
    idPatient:{
        type:String,
        ref:'patient'
    },
    inject:{
        type:Array,

    }

})

export default mongoose.model('dose',dose)