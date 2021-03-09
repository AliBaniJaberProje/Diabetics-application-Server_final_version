import bcrypt from 'bcryptjs';
import doctor from "../../model/users/doctor.js"
import jwt from "jsonwebtoken"
const saltRounds=10;

async  function hashPassword(password,salt)  {
    return await bcrypt.hash(password,salt)
}


const signUpDoctor=async(req,res,_)=>{

    const  salt=await bcrypt.genSalt(saltRounds);
    req.body.password = await hashPassword( req.body.password,salt)
    const newDoctor=new doctor(req.body)
    console.log(newDoctor)


    let result;
    try{
        result= await newDoctor.save();

    }catch (e){
        res.status(500).json({message:e.message})
    }

    if(result)
        res.status(200).json({message:' success'})
    else
        res.status(500).json({message:'error in singUp '})
}

const signInDoctor=async (req, res, _)=>{
    try{
        const doctorUser=await doctor.find({"id":req.body.id})

        const checkPassword =await bcrypt.compare(req.body.password,doctorUser[0].password)
        if(checkPassword){
            const token= jwt.sign({
                id:doctorUser[0].id,
                password:doctorUser[0].password
            },'privateKey')
            res.status(200).header('token',token).json({
                msg:"user Authorised",
                token:token,
            })
        }else{
            res.status(404).json({msg:' user not Authorised',token:"error pass"})
        }

    }
    catch (e){
        res.status(404).json({msg:' user not Authorised',token:"error"})
    }

}


export {
    signUpDoctor,
    signInDoctor
}