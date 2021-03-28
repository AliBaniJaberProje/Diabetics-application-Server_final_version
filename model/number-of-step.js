import mongoose from "mongoose"
import patient from "./users/patient.js";
const numberOfStep  = new mongoose.Schema({

    idPatient:{
        type:String,
        ref :'patient'
    },
    startDate:{
        type:Number,

    },
    endDate:{
        type:Number,

    },
    numberStep:{
        type:Number
    }

})



export default mongoose.model('number_of_step',numberOfStep)