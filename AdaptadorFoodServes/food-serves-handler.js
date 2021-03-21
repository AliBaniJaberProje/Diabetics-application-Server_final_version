import fetch from  "node-fetch"
import food from "./../model/food.js"
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
    const foods=await food.findOne({"category":req.params.foodCategory},)
    var result=[];

     for(var i=0;i<foods._doc.data.length;i++){
         result.push({
             "img":foods._doc.data[i]['img'],
             "name":foods._doc.data[i]['name'],
             "id":foods._doc.data[i]['id']
         })
     }
    res.status(200).json(result)


}
const getFoodDetails=async(req,res,_)=>{

    const foodDetails=await food.findOne({"category":req.params.foodCategory, },"data.FoodNutrients data.id data.name")
    for(var index=0;index<foodDetails._doc.data.length;index++){
        if(foodDetails._doc.data[index]['id']==req.params.fcd_id){
            res.status(200).json(foodDetails._doc.data[index])
        }
    }



}

export{
    getAllFood,
    findFoodCategory,
    getFoodDetails

}