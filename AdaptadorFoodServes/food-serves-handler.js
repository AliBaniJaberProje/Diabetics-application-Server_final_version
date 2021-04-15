import fetch from  "node-fetch"

import Patient from "../model/users/patient.js"
import food_history from "../model/food-history.js"
import dose from "../model/dose.js"
import food from "../model/food.js"
import jwt from "jsonwebtoken"




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
        const userInfo=await Patient.findOne({id:resultJWTDecode.id}).select({diabetesType:true,weight:true,height:true,birthDate:true,_id:false,gender:true})
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
                "id":foodHistoryThisDay[i]["idFood"],
                "amount":foodHistoryThisDay[i]["amount"]
            })
        }



        for(var i=0;i<foodHistoryThisDay.length;i++){
            foodArr.push(foodHistoryThisDay[i]["idFood"])
        }
        const allFood1=await food.find({_id: {$in:foodArr}  }).select({FoodNutrients:true,name:true,_id:true})

        for(var i=0;i<allFood1.length;i++){
            for(var t=0;t<foodHistoryThisDay.length;t++){
                if(allFood1[i]._doc["_id"]==foodHistoryThisDay[t]["idFood"]){
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
        console.log(age)
        console.log(userInfo["height"])
        console.log(userInfo["weight"])
        console.log(userInfo["diabetesType"])
        console.log(userInfo["gender"])
        let foods;
        let toFilterCh;
        if(userInfo["diabetesType"]=="أ"){

            var TDD=0
            const myDose=await dose.findOne({idPatient:resultJWTDecode.id})
            for(var t=0;t<myDose["inject"].length;t++){
                if(myDose["inject"][t]["flag"]==0 || myDose["inject"][t]["flag"]==2){
                    TDD+=Number(myDose["inject"][t]["amountOfinj"])
                }
            }


            if(TDD==0){
                TDD=1;
            }
            console.log("----------------TDD-----------------")
            console.log(TDD)
            console.log("------------------------------------")
            const rTDD=Math.round(500/TDD)
            const allCH=rTDD*TDD /// 780g CH
            //const totalCAL=allCH*4

             toFilterCh= (allCH - ch);




        }else if(userInfo["diabetesType"]=="ب")
        {

            console.log("im B")
             let BMR=0;
            if(userInfo["gender"]=="ذكر"){
                BMR=(13.75*Number(userInfo["weight"]))+(5*Number(userInfo["height"]))-(6.76*Number(age))+66
            }else if(userInfo["gender"]=="انثى"){
                BMR=(9.6*Number(userInfo["weight"]))+(1.8*Number(userInfo["height"]))-(4.7*Number(age))+655
            }
             toFilterCh=Math.round(BMR/4) * .65

             toFilterCh=toFilterCh-ch
        }
        console.log("---------------toFilterCh---------------------")
        console.log(toFilterCh)
        console.log("------------------------------------")
        foods=await food.find({$and:[{"category":req.params.foodCategory},{"FoodNutrients.Carbohydrate.value":{  $lte: (toFilterCh) }}]}).sort({name:1})

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
        res.status(404).json({
            "result":e.message
        })
    }

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