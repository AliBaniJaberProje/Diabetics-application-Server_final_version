import food_history from "../../model/food-history.js"
import jwt from "jsonwebtoken"
import Patient from "../../model/users/patient.js"
import dose from "../../model/dose.js"
import food from "../../model/food.js"


const addFood =async (req,res,_)=>{

    try{
        const token=req.headers["x-auth-token"];
        const resultJWTDecode=await jwt.decode(token)

///----------------------------

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

        let toFilterCh;
        if(userInfo["diabetesType"]=="أ"){
            console.log("im A")
            var TDD=0
            const myDose=await dose.findOne({idPatient:resultJWTDecode.id})
            for(var t=0;t<myDose["inject"].length;t++){
                if(myDose["inject"][t]["flag"]==0 || myDose["inject"][t]["flag"]==2){
                    TDD+=Number(myDose["inject"][t]["amountOfinj"])
                }
            }
            console.log("TDD")
            console.log(TDD)
            const rTDD=Math.round(500/TDD)
            const allCH=rTDD*TDD /// 780g CH
            //const totalCAL=allCH*4

            toFilterCh= (allCH - ch);

            // console.log(toFilterCh)
            // foods=await food.find({$and:[{"category":req.params.foodCategory},{"FoodNutrients.Carbohydrate.value":{  $lte: (toFilterCh+5) }}]}).sort({name:1})
            //console.log(foods)


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
        console.log(toFilterCh)
//----------------------------
        const testFoodToAdd=await food.findOne({_id:req.body["id"]})
        toFilterCh-=Number(testFoodToAdd._doc["FoodNutrients"]["Carbohydrate"]["value"])*Number(req.body["amount"]) /100
        console.log("Aliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")

        console.log(toFilterCh)
        console.log("Aliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        if(toFilterCh<0){
            res.status(201).json({
                "result":"operation error"
            })
        }else{
            const newFoodItem=food_history({
                idFood:req.body["id"],
                amount:req.body["amount"],
                idPatient:resultJWTDecode.id,
                created_on:new Date()
            })
            const result=await newFoodItem.save()
            res.status(200).json({
                "result":"operation done"
            })
            console.log(result)
        }



/// -----------------------------


    }catch (e){
        res.status(404).json({
            "error":e.message
        })
    }

}

const getFoodHistoryInDay=async (req,res,_)=>{
    try{
        const token=req.headers["x-auth-token"];
        const resultJWTDecode=await jwt.decode(token)

        const startDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) , 0,0,0,0,)

        const endDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) ,  23,59,59,59,)

        var foodHistoryThisDay=await food_history.find({$and:[{created_on:{ $gte: startDate, $lte: endDate }},{idPatient:resultJWTDecode.id}]}).populate('idFood')
        var result=[]
        let amount=0
        let totalCh=0.0
        let totalProten=0.0
        let totalFat=0.0
        let proten=0;
        let carboh=0
        let fat=0
        for(var i=0; i<foodHistoryThisDay.length;i++){
            amount=foodHistoryThisDay[i]["amount"]
            proten=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["Protein"]["value"])*amount /100).toFixed(3)
            carboh=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["Carbohydrate"]["value"])*amount /100).toFixed(2)
            fat=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["fat"]["value"])*amount /100).toFixed(3)
            totalCh+=Number(carboh)
            totalFat+=Number(fat)
            totalProten+=Number(proten)
            result.push({
                "id":foodHistoryThisDay[i]["idFood"]["_id"],
                "category":foodHistoryThisDay[i]["idFood"]._doc["category"],
                "name":foodHistoryThisDay[i]["idFood"]._doc["name"],
                "img":foodHistoryThisDay[i]["idFood"]._doc["img"],
                "amount":amount,
                "Protein": proten,
                "fat":fat ,
                "Carbohydrate":carboh,
            })
        }



        res.status(200).json(
            {
                "allFood": result,
                 "total":{
                    "fat":Number(totalFat),
                     "Protein":Number(totalProten),
                     "Carbohydrate":Number(totalCh)
                 }

            }

        )

    }catch (e){
        console.log(e.message)
        res.status(404).json({
            "msg":e.message
        })
    }
}

const getFoodToDoctorInDay=async (req,res,_)=>{
    try{
        const startDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) , 0,0,0,0,)

        const endDate=new Date(Number(req.params.year) ,  Number(req.params.month)-1 , Number(req.params.day) ,  23,59,59,59,)
        var foodHistoryThisDay=await food_history.find({$and:[{created_on:{ $gte: startDate, $lte: endDate }},{idPatient:req.params.id}]}).populate('idFood').select({id:false,category:false}).sort({created_on:1})

        var result=[]
        let amount=0
        let proten=0;
        let carboh=0
        let fat=0
        let enarge=0
        let creat_on=new Date()
        for(var i=0; i<foodHistoryThisDay.length;i++){
            amount=foodHistoryThisDay[i]["amount"];
            creat_on=new Date(foodHistoryThisDay[i]["created_on"])
            proten=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["Protein"]["value"])*amount /100).toFixed(3)
            carboh=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["Carbohydrate"]["value"])*amount /100).toFixed(2)
            fat=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["fat"]["value"])*amount /100).toFixed(3)
            enarge=(Number(foodHistoryThisDay[i]["idFood"]._doc["FoodNutrients"]["Energy"]["value"])*amount /100).toFixed(3)
            result.push({
                "name":foodHistoryThisDay[i]["idFood"]._doc["name"],
                "img":foodHistoryThisDay[i]["idFood"]._doc["img"],
                "amount":amount,
                "Protein": proten,
                "fat":fat ,
                "Carbohydrate":carboh,
                "Energy":enarge,
                "created_on":creat_on.getHours()+":"+creat_on.getMinutes()+":"+creat_on.getSeconds()
            })
        }
        res.status(200).json(result)



    }catch (e) {
        res.status(404).json({
            "error":e.message
        })
    }
}



export {
    addFood,
    getFoodHistoryInDay,getFoodToDoctorInDay

}
