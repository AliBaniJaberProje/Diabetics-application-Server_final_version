
import information_model from "../../model/information_model.js"


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


export {
    getAllTitle,
    getDocumant
}


