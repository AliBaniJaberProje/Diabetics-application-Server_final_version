import mongoose from "mongoose"


const foodItem  = new mongoose.Schema({
    id:{type:String,},
    name:{type:String,},
    img:{type:String},
    FoodNutrients:{type:{}}

})



const food  = new mongoose.Schema({

})



export default mongoose.model('food',food)