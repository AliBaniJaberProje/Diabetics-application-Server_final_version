import mongoose from "mongoose"


const cumulative_diabetes  = new mongoose.Schema({
    idPatient:{
        ref:'patient',
        type:String
    },
    value:{
        type:Number
    },
    date:{
        type:Date
    }


})



export default mongoose.model('cumulative_diabetes',cumulative_diabetes)