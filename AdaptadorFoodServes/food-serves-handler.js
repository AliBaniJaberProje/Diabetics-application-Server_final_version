import fetch from  "node-fetch"

const getAllFood=async(req,res,_)=>{
    const params={
        api_key:'A9k0eMKZ9JUOu53WRgSKvCPKOVCi8hss8PhpFF6h',
        query:'1002',
        dataType:["Survey (FNDDS)","Foundation","Branded","SR Legacy",],
        pagesize:3,
        //code:"0100",
    }///v1/foods/search
    const api_url=`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`

    const   result=   await fetch(api_url).then(respons=>respons.json())



    res.status(200).json(result)


}

export{
    getAllFood
}