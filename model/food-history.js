import mongoose from "mongoose"

const food_history  = new mongoose.Schema({

    idFood:{
        type:String,
        ref:"food",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    idPatient:{
        type:String,
        ref:'patient'
    },
    created_on:{
        type:Date
    }

})



export default mongoose.model('food_history',food_history)