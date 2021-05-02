
import information_model from "../../model/information_model.js"
import tip_model from "../../model/tips.js"

function getRandomA(max) {
    const minm = 0;
    const maxm = max;
    return  Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}



const getAllTitle=async (req,res,_)=>{

    const titles=await information_model.find({}).select({title:true,_id:true,documant:true})
    res.status(200).json(titles)

}

const getDocumant=async (req,res,_)=>{
    try {
        const result=await information_model.findById(req.params.id).select({documant:true})
        res.status(200).json(result)

    }catch (e) {
        res.status(404).json(e.message)
    }
}

const getTip=async (req,res,_)=>{
    try {



        const result=await tip_model.find({}).select({data:true,_id:false})
        const randomCode=getRandomA(result.length)

        res.status(200).json(
            result[randomCode]
        )

    }catch (e) {
        res.status(404).json({"msg":e.message})
    }
}



export {
    getAllTitle,
    getDocumant,
    getTip
}


