import mongoose from "mongoose"
import joi from "joi"


const doctor=new mongoose.Schema({

    id:{
        type:String,
        unique:true,
        maxlength:9,
        minlength:9
    },
    username:{
        type:String,
        unique:true,
        minlength:5,
        max:40,

    },
    phoneNumber:{
        type:String,
        unique:true,
        minlength:10,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    birthDate:{
        type:Date,
        default:Date.now(),
    },
    gender:{
        type:String,
        required:true,
        minlength:3,
        maxlength:5,
    },
    locationOffice:{
        type:String,
        required:true,
        minlength:2,

    },
    registrationCode:{
        type:String,
        required:true,
        minlength:4,
        unique:true,
    },

})

export default mongoose.model('doctor',doctor)
