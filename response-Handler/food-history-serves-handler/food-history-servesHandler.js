import food_history from "../../model/food-history.js"
import jwt from "jsonwebtoken"

const addFood =async (req,res,_)=>{

    try{
        const token=req.headers["x-auth-token"];
        const resultJWTDecode=await jwt.decode(token)
        const newFoodItem=food_history({
            id:req.body["id"],
            amount:req.body["amount"],
            idPatient:resultJWTDecode.id,
            created_on:Date.now()
        })
        const result=await newFoodItem.save()
        res.status(200).json({
            "result":"operation done"
        })
        console.log(result)

    }catch (e){
        res.status(404).json({
            "error":e.message
        })
    }

}
const getFoodHistoryInDay=async (req,res,_)=>{
    try{
       // const token=req.headers["x-auth-token"];
      //  const resultJWTDecode=await jwt.decode(token)

        const startDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) , 0,0,0,0,)

        const endDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) ,  23,59,59,59,)

        var foodHistoryThisDay=await food_history.find().populate('id')
        res.status(200).json(
            foodHistoryThisDay
        )

    }catch (e){
        res.status(404).json({
            "msg":e.message
        })
    }
}


export {
    addFood,
    getFoodHistoryInDay

}
