import mongoose from "mongoose"
import {dose} from "./dose.js";

const doseHistory  = new mongoose.Schema({

    endDate:{
        type:Date,
        default:Date.now
    },
    startDate:{
        type:Date,

    },
    doseItem:{
        type:dose

    }

})



export default mongoose.model('doseHistory',doseHistory)