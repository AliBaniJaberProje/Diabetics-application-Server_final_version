import dose from "../../model/dose.js"

const getDoseForPatient=async (req,res,next)=>{

    const result=await dose.findOne({idPatient:"404969332"})
    if(result=="44")return ;
    res.status(200).json({
        result
    })



}

export {
    getDoseForPatient,

}