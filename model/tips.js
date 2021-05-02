import mongoose from "mongoose"






const tip  = new mongoose.Schema({

    data:{
        type:String
    }

})



export default mongoose.model('tip',tip)