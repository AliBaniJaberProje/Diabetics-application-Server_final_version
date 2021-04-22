import mongoose from "mongoose"

const EventHistory  = new mongoose.Schema({

    idPatient:{
     type:String

    },
    idDoctor:{
        type:mongoose.Schema.Types.ObjectId ,
        ref :'doctor'
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date
    },
    isCome:{
        type:Boolean
    },
    note:{
        type:String
    },
    idEvent:{
      type:Number,
    },
    idD:{
        type:String
    }

})



export default mongoose.model('eventHistory',EventHistory)