import mongoose from "mongoose"

 const connectMongoDB=()=>{
    mongoose.connect('mongodb+srv://ali123456:ali123456@cluster0.j7qkc.mongodb.net/diabetics_application_db?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.error('database contacted')).catch((e)=> console.error(e))
}
export default connectMongoDB;