import jwt from "jsonwebtoken"


const isAuthorisedDoctor= async (req,res,next)=>{


    const token=req.headers['token'];
    console.log("token")
    if(!token)
    {
        return res.status(401).json({msg:'not authorized user rejected .....'})
    }
    try{
        const resultDecode= await jwt.verify(token,'privateKey')
        // req.doctor=resultDecode

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
        // req.doctor=resultDecode

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