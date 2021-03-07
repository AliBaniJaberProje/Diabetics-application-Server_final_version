import mongoose from "mongoose"

import joi from "joi"


const patient=new mongoose.Schema({

    id:{
        type:String,
        required:true,
        unique:true,
    },
    username: {
        type: String,
        unique: true,
        minlength: 5,
        max: 40,
    },
    gender:{
        type:String,
        required:true,
        minlength:3,
        maxlength:5,
    },
    location:{
        type:String,
        required:true,
        minlength:2,
    },
    birthDate:{
        type:String,
        default:"1612967081423000"
    },
    diagnosisYear:{

        type:String,
        default:"1612967081423000",
    },
    phoneNumber:{
        type:String,
        unique:true,
        minlength:10,
    },
    diabetesType:{
        type:String,
        required:true,

    },
    injectionType:{
        type:String,
        required:true,
    },
    capsuleType:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    length:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    currentDoctor:{
        type:String,
        ref :'doctor'
    },
    phoneToken:{
        type:String,

    },
    lastDoctor:{
        type:Array,
        ref :'doctor'

    },
    password:{
        type:String,

    },
    imgURL:{
        type:String,

    },
    idAppointment:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"event"
    }

})

export default mongoose.model('patient',patient)
