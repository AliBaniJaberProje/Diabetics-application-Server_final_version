import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import event from "../../model/event.js";

import * as event_mid from "../../middleware/eventMiddleware.js"
function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

const getEventWhereUserId=async (req,res,_)=>{
    const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
    try{
        var date=new Date()
        console.log(date.getFullYear())
        var start =new  Date(date.getFullYear(),date.getMonth()+1,date.getDate());
        var end =new  Date(date.getFullYear(),date.getMonth()+1,date.getDate()+2);



   //"taken.userTake":resultDecodeJWT.id,
        const  result=await event.find({startEventTime: { $gt: start, $lt: end },"taken.userTake":resultDecodeJWT.id})//.select('- _id')
        console.log(result)
        if(result.length==0){
            res.status(400).json({
                msg:"not found any event for this user"
            },)
        }else{
            res.status(200).json({
                event:result
            })
        }

    }catch(error){
        res.status(400).json({
            msg:error.message
        })
    }
}


export{
    getEventWhereUserId,

}