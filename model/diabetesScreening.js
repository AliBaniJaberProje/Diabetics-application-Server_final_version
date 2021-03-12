import mongoose from "mongoose";


const r=new mongoose.Schema({

})

export default mongoose.model('d',r)



import mongoose from 'mongoose'
import joi from 'joi'

const dose=new mongoose.Schema({

    date:{
        type:Date,
        default:Date.now()
    },
    idPatient:{
        type:String,
    }

})

export default mongoose.model('dose',dose)