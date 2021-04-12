import fetch from  "node-fetch"

import Patient from "../model/users/patient.js"
import food_history from "../model/food-history.js"

import food from "../model/food.js"
import jwt from "jsonwebtoken";
const getAllFood=async(req,res,_)=>{
    
    
    
    const params={
        api_key:'A9k0eMKZ9JUOu53WRgSKvCPKOVCi8hss8PhpFF6h',
        pagesize:3,
        dataType:["Survey (FNDDS)","Foundation","Branded","SR Legacy",],
    }


    const api_url=`https://api.nal.usda.gov/fdc/v1/food/1274352?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`

    const   result=   await fetch(api_url).then(respons=>respons.json())


    console.log(result)


    res.status(200).json(result)


}

const findFoodCategory=async(req,res,_)=>{

    try{
        const token=req.headers["x-auth-token"];
        const resultJWTDecode=await jwt.decode(token)
        const nowDate=new Date()
        const userInfo=await Patient.findOne({id:resultJWTDecode.id}).select({diabetesType:true,weight:true,height:true,birthDate:true,_id:false})
        const age=nowDate.getFullYear()-(new Date(userInfo["birthDate"])).getFullYear()

        const startDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 0,0,0,0,)

        const endDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 23,59,59,59,)

        var foodHistoryThisDay=await food_history.find({$and:[
                {idPatient:resultJWTDecode.id},
                {created_on:{ $gte: startDate, $lte: endDate }},
            ]},).select({created_on:false,idPatient:false,__v:false,})

        var foodArr=[]
        var foodThatImEat=[]

        for(var i=0;i<foodHistoryThisDay.length;i++)    {
            foodThatImEat.push({
                "id":foodHistoryThisDay[i]["id"],
                "amount":foodHistoryThisDay[i]["amount"]
            })
        }



        for(var i=0;i<foodHistoryThisDay.length;i++){
            foodArr.push(foodHistoryThisDay[i]["id"])
        }
        const allFood1=await food.find({_id: {$in:foodArr}  }).select({FoodNutrients:true,name:true,_id:true})

        for(var i=0;i<allFood1.length;i++){
            for(var t=0;t<foodHistoryThisDay.length;t++){
                if(allFood1[i]._doc["_id"]==foodHistoryThisDay[t]["id"]){
                    console.log("enterd")
                    foodThatImEat[t]["FoodNutrients"]=allFood1[i]._doc["FoodNutrients"]
                }

            }
        }
        var ch =0
        var pro=0
        var fat=0
        var en=0
        console.log(foodThatImEat)
        for(var i = 0  ; i<foodThatImEat.length;i++){
            ch+=Number(foodThatImEat[i]["FoodNutrients"]["Carbohydrate"]["value"])*(foodThatImEat[i]["amount"]) /100
            pro+=Number(foodThatImEat[i]["FoodNutrients"]["Protein"]["value"])*(foodThatImEat[i]["amount"]) /100
            fat+=Number(foodThatImEat[i]["FoodNutrients"]["fat"]["value"])*(foodThatImEat[i]["amount"]) /100
            en+=Number(foodThatImEat[i]["FoodNutrients"]["Energy"]["value"])*(foodThatImEat[i]["amount"]) /100
        }

        console.log(ch)
        console.log(pro)
        console.log(fat)
        console.log(en)

        const foods=await food.find({"category":req.params.foodCategory},).sort({name:1})

        var result=[];





        for(var i=0;i<foods.length;i++){
            result.push({
                "img":foods[i]._doc['img'],
                "name":foods[i]._doc['name'],
                "id":foods[i]._doc['_id']
            })
        }

        res.status(200).json(result)
    }catch (e) {
        console.log(e.message)
    }


}


const getFoodHistoryInDay=async (req,res,_)=>{


}

const getFoodDetails=async(req,res,_)=>{

    const foodDetails=await food.findOne({$and:[{"category":req.params.foodCategory, },{_id:req.params.fcd_id}]},)

    return   res.status(200).json(foodDetails)



}

export{
    getAllFood,
    findFoodCategory,
    getFoodDetails

}