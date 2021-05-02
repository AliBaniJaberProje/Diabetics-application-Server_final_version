import mongoose from "mongoose"






const information  = new mongoose.Schema({

    title:{
        type:String
    },
    documant:{
        type:String
    }



})



export default mongoose.model('information',information)