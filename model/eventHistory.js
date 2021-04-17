import mongoose from "mongoose"






const EventHistory  = new mongoose.Schema({

    idPatient:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'patient'
    },
    idDoctor:{
        type:mongoose.Schema.Types.ObjectId,
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
    }

})



export default mongoose.model('eventHistory',EventHistory)