import jwt from "jsonwebtoken"


const isAuthorisedDoctor= async (req,res,next)=>{

    console.log(req.headers.authorization)
    const token=req.headers.authorization.split(" ")[1];///------------------------------------
    if(!token)
    {
        return res.status(401).json({msg:'not authorized user rejected .....'})
    }
    try{
        const resultDecode= await jwt.verify(token,'privateKey')

        await next()
    }
    catch (error){
        return res.status(402).json({msg:'not authorized user rejected .....'})
    }

}


const isAuthorisedPatient= async (req, res, next)=>{


    const token=req.headers["x-auth-token"];

    if(!token)
    {
        return res.status(401).json({msg:'not authorized user rejected .....'})
    }
    try{
        const resultDecode= await jwt.verify(token,'privateKey')
        await next()
    }
    catch (error){
        return res.status(401).json({msg:'not authorized user rejected .....'})
    }

}




export{
    isAuthorisedPatient,
    isAuthorisedDoctor
}