import fetch from  "node-fetch"
import food from "./../model/food.js"
const getAllFood=async(req,res,_)=>{
    
    
    
    const params={
        api_key:'A9k0eMKZ9JUOu53WRgSKvCPKOVCi8hss8PhpFF6h',
        query:'1002',
        dataType:["Survey (FNDDS)","Foundation","Branded","SR Legacy",],
        pagesize:3,
        //code:"0100",
    }///v1/foods/search
    const re=await food.find({})
   // const toprint=re[0]['data']
    console.log(re["0"]._doc['data'][0]['id'])
    
    const api_url=`https://api.nal.usda.gov/fdc/v1/food/546613?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`

    const   result=   await fetch(api_url).then(respons=>respons.json())


    console.log(result)


    res.status(200).json(result)


}

const findFoodCategory=async(req,res,_)=>{
    const foods=await food.findOne({"category":"Fruits"},)
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

export{
    getAllFood,
    findFoodCategory,

}