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
    
    const api_url=`https://api.nal.usda.gov/fdc/v1/food/1452852?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`

    const   result=   await fetch(api_url).then(respons=>respons.json())


    console.log(result)


    res.status(200).json(result)


}

export{
    getAllFood
}